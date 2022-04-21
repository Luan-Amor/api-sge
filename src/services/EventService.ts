import { Event } from "../models/Event";
import { getRepository, Repository } from "typeorm";
import { User } from "../models/User";
import { CreateEventRequest, EventDto, UpdateEventRequest} from '../dto/EventDto';

export class EventService {

    repository: Repository<Event>;

    constructor(){
        this.repository = getRepository(Event);
    }

    async create(dto: CreateEventRequest): Promise<EventDto | Error>{
        const repoUser = getRepository(User);

        if(await !repoUser.findOne({id: dto.owner_id})){
            return new Error('User not found.');
        }

        const event = this.repository.create(dto);

        await this.repository.save(event);

        return this.eventToDto(event);
    }

    async getAll(){
        const events = await this.repository.find();
        return events.map(event => this.eventToDto(event));
    }

    async getOne(id: string){
        const event = await this.repository.findOne(id);
        if(!event){
            return new Error('Event not found.');
        }

        return this.eventToDto(event);
    }

    async delete(id: string){
        const event = await this.repository.findOne(id);

        if(!event){
            return new Error('Event not found.');
        }

        await this.repository.delete(id);
    }

    async update(dto: UpdateEventRequest){
        const event = await this.repository.findOne(dto.id);

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
