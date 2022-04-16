import { Event } from "../models/Event";
import { getRepository, Repository } from "typeorm";
import { User } from "../models/User";

type CreateEventRequest  = {
    name: string;
    description: string;
    ticket_price: number;
    owner_id: any;
}
type UpdateEventRequest  = {
    id: string;
    name: string;
    description: string;
    ticket_price: number;
}

export class EventService {

    repository: Repository<Event>;

    constructor(){
        this.repository = getRepository(Event);
    }

    async create(body: CreateEventRequest): Promise<Event | Error>{
        const { name, description, ticket_price, owner_id } = body;
        const repoUser = getRepository(User);

        if(!repoUser.findOne({id: owner_id})){
            return new Error('User not found.');
        }

        const event = this.repository.create({ name, description, ticket_price, owner_id });

        await this.repository.save(event);

        return event;
    }

    async getAll(){
        const events = await this.repository.find();
        return events;
    }
    async getOne(id: string){
        const event = await this.repository.findOne(id);
        if(!event){
            return new Error('Event not found.');
        }

        return event;

    }

    async delete(id: string){
        const event = await this.repository.findOne(id);

        if(!event){
            return new Error('Event not found.');
        }

        await this.repository.delete(id);
    }

    async update(body: UpdateEventRequest){
        const { id, name, description, ticket_price } = body;
        const event = await this.repository.findOne(id);

        if(!event){
            return new Error('event does not exists');
        }

        event.name = name ? name : event.name;
        event.description = description ? description : event.description;
        event.ticket_price = ticket_price ? ticket_price : event.ticket_price;

        await this.repository.save(event);

        return event;
    }
}
