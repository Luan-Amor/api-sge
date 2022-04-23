import { Request, Response } from "express";
import { EventService } from "../services/EventService";
import { CreateEventRequest, EventDto, UpdateEventRequest} from '../dto/EventDto';
import { Video } from "../models/Video";

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
        const dto: CreateEventRequest  = request.body;
        dto.owner_id = owner_id.toString();

        const event = await service.create(dto);

        if(event instanceof Error){
            return response.status(404).json(event.message)
        }

        return response.json(event);
    };

    async update(request: Request, response: Response){
        const service = new EventService();
        const dto: UpdateEventRequest = request.body;

        const result = await service.update(dto);

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

    async addVideo(request: Request, response: Response){
        const video: Video = request.body;
        const service = new EventService();
        await service.addVideo('',video);
    }
    async updateVideo(request: Request, response: Response){
        const video: Video = request.body;
        const service = new EventService();
        await service.updateVideo(video);
    }
    async deleteVideo(request: Request, response: Response){
        const {idVideo} = request.params;
        const service = new EventService();
        const result = await service.deleteVideo(idVideo);

        if(result instanceof Error){
            return response.status(404).json(result.message);
        }

        response.status(204).end();
    }
}