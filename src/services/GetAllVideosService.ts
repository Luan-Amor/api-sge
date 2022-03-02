import { Video } from "../models/Videos";
import { getRepository } from "typeorm";


export class GetAllVideosService {
    async execute(){
        const repo = getRepository(Video);

        const videos = await repo.find({
            relations: ['category'],
            select: ['name', 'description', 'duration']
        });

        return videos;
    }
}