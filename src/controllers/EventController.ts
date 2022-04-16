import { Request, Response } from "express";
import { EventService } from "../services/EventService";


export class EventController {

    async findAll(request: Request, response: Response){
        const service = new EventService();
        const events = await service.getAll();
        return response.send(events);
    };

    async findOne(request: Request, response: Response){
        const service = new EventService();
        const { id } = request.params;

        const result = await service.getOne(id);

        if(result instanceof Error){
            return response.status(404).json(result.message);
        }

        return response.json(result);
    };

    async create(request: Request, response: Response){
        const service = new EventService();
        const owner_id = request.headers.userId;
        const {name, description, ticket_price } = request.body;

        const event = await service.create({name, description, ticket_price, owner_id});

        if(event instanceof Error){
            return response.status(404).json(event.message)
        }

        return response.json(event);
    };

    async update(request: Request, response: Response){
        const service = new EventService();
        const {id, name, description, ticket_price} = request.body;

        const result = await service.update({id, name, description, ticket_price});

        if(result instanceof Error){
            return response.status(404).json(result.message);
        }

        return response.json(result);
    };

    async delete(request: Request, response: Response){
        const service = new EventService();
        const { id } = request.params;

        const result = await service.delete(id);

        if(result instanceof Error){
            return response.status(404).json(result.message);
        }

        return response.status(204).end();
    };
}