import { Event } from "../models/Event";
import { getRepository, Repository } from "typeorm";
import { CreateEventRequest, EventDto, UpdateEventRequest} from '../dto/EventDto';
import { Video } from "../models/Video";

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
            return new Error("Não foi possível criar o evento.")
        }

        return this.eventToDto(event);
    }

    async getAll(){
        const events = await this.repository.createQueryBuilder("event")
        .leftJoinAndSelect("event.videos", "video")
        .getMany();
        return events.map(event => this.eventToDto(event));
    }

    async getOne(id: string){
        const event = await this.repository.createQueryBuilder("event")
        .leftJoinAndSelect("event.videos", "video")
        .where({ id })
        .getOne()
        .catch(err => null);

        if(!event){
            return new Error('Event not found.');
        }

        return this.eventToDto(event);
    }

    async delete(id: string){
        const event = await this.repository.findOne(id).catch(err => console.log(err));

        if(!event){
            return new Error('Event not found.');
        }

        await this.repository.delete(id);
    }

    async update(dto: UpdateEventRequest){
        const event = await this.repository.findOne(dto.id).catch(err => null);

        if(!event){
            return new Error('event does not exists');
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

    async addVideo(idEvent: string, video: Video){

    }

    async updateVideo(dto: Video){
        const video = await this.repoVideo.findOne(dto.id).catch(err => null);
        
        if(!video){
            return new Error('Video not found.');
        }

        await this.repoVideo.save(dto);

        return dto;
    }

    async deleteVideo(idVideo: string){
        const video = await this.repoVideo.findOne(idVideo).catch(err => null);
        
        if(!video){
            return new Error('Video not found.');
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
