import { Event } from "../models/Event";
import { getRepository, IsNull, Repository } from "typeorm";
import { AddVideoDto, CreateEventRequest, EventDto, UpdateEventRequest} from '../dto/EventDto';
import { Video } from "../models/Video";
import { Messages } from "../config/Messages";

export class EventService {

    repository: Repository<Event>;
    repoVideo: Repository<Video>;

    constructor(){
        this.repository = getRepository(Event);
        this.repoVideo = getRepository(Video);
    }

    async create(dto: CreateEventRequest): Promise<EventDto | Error>{
        let videos = [];
        if(dto.videos){
            videos = dto.videos.map(video => this.repoVideo.create(video));
        }

        const event = this.repository.create(dto);
        event.videos = videos;

        try {
            await this.repository.manager.transaction( async transactionManager =>{
                videos.map(async video => {
                    await transactionManager.save(video);
                })
                await transactionManager.save(event);
            })
        } catch (error) {
            return new Error(Messages.OPERATION_INVALID)
        }

        return this.eventToDto(event);
    }

    async getAll(){
        const events = await this.repository.createQueryBuilder("event")
        .leftJoinAndSelect("event.videos", "video")
        .where({
            deleted_at: IsNull()
        })
        .getMany();
        return events.map(event => this.eventToDto(event));
    }

    async getOne(id: number){
        const event = await this.repository.createQueryBuilder("event")
        .leftJoinAndSelect("event.videos", "video")
        .where({ 
            id,
            deleted_at: IsNull()
        })
        .getOne()
        .catch(err => null);

        if(!event){
            return new Error((Messages.EVENT_NOT_FOUND));
        }

        return this.eventToDto(event);
    }

    async findEventsByUser(id: string){
        const events = await this.repository.createQueryBuilder("event")
        .leftJoinAndSelect("event.videos", "video")
        .where({ owner_id: id })
        .getMany()
        .catch(err => null);

        return events.map(event => this.eventToDto(event));
    }

    async delete(id: number, idOwner: string){
        const event = await this.repository.findOne({
            where: {
                id,
                owner_id: idOwner
            }
        }).catch(err => console.log(err));

        if(!event){
            return new Error(Messages.getMessage(Messages.EVENT_NOT_FOUND, id.toString()));
        }

        event.deleted_at = new Date(); 

        await this.repository.save(event);
    }

    async update(ownerId: string, dto: UpdateEventRequest){
        const event = await this.repository.findOne({
            where: {
                id: dto.id,
                owner_id: ownerId
            }
        }).catch(err => { console.log(err)});

        if(!event){
            return new Error(Messages.EVENT_NOT_FOUND);
        }

        event.name = dto.name ? dto.name : event.name;
        event.description = dto.description ? dto.description : event.description;
        event.ticket_price = dto.ticket_price ? dto.ticket_price : event.ticket_price;
        event.speaker = dto.speaker ? dto.speaker : event.speaker;
        event.spots = dto.spots ? dto.spots : event.spots;
        event.start_event_date = dto.start_event_date ? dto.start_event_date : event.start_event_date;
        event.end_event_date = dto.end_event_date ? dto.end_event_date : event.end_event_date;

        await this.repository.save(event);

        return this.eventToDto(event);
    }

    async addVideo(dto: AddVideoDto){
        const { idEvent, name, description, url } = dto;

        const event = await this.repository.findOne(idEvent).catch(err => null);

        if(!event){
            return new Error(Messages.EVENT_NOT_FOUND);
        }
        const video = this.repoVideo.create({name, description, url});

        event.videos = video;
        
        try {
            await this.repository.manager.transaction( async transactionManager =>{
                await transactionManager.save(video);
                await transactionManager.save(event);
            })
        } catch (error) {
            return new Error("Não foi possível criar o evento.")
        }

        return this.eventToDto(event);
    }

    async updateVideo(dto: Video){
        const video = await this.repoVideo.findOne(dto.id).catch(err => null);
        
        if(!video){
            return new Error(Messages.VIDEO_NOT_FOUND);
        }
        const update = { ...dto, video }

        await this.repoVideo.save(update);

        return dto;
    }

    async deleteVideo(idVideo: string){
        const video = await this.repoVideo.findOne(idVideo).catch(err => null);
        
        if(!video){
            return new Error(Messages.VIDEO_NOT_FOUND);
        }
        try {
            await (await this.repoVideo.delete(idVideo));
        } catch (error) {
            console.log(error)
        }
    }

    private eventToDto(event: Event): EventDto{
        const dto: EventDto = {
            id: event.id,
            name: event.name,
            description: event?.description,
            speaker: event?.speaker,
            spots: event?.spots,
            ticket_price: event?.ticket_price,
            videos: event?.videos,
            start_event_date: event?.start_event_date,
            end_event_date: event?.end_event_date
        }
        return dto;
    }
}
