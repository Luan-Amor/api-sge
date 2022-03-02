import { Request, Response } from "express";
import { GetAllVideosService } from "../services/GetAllVideosService";


export class GetAllVideosController {
    async handle(request: Request, response: Response){
        const {name, description, duration, category_id} = request.body;

        const service = new GetAllVideosService();

        const videos = await service.execute();


        return response.json(videos);
    }
}