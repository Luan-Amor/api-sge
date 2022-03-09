"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllVideosService = void 0;
const Videos_1 = require("../models/Videos");
const typeorm_1 = require("typeorm");
class GetAllVideosService {
    async execute() {
        const repo = (0, typeorm_1.getRepository)(Videos_1.Video);
        const videos = await repo.find({
            relations: ['category'],
            select: ['name', 'description', 'duration']
        });
        return videos;
    }
}
exports.GetAllVideosService = GetAllVideosService;
