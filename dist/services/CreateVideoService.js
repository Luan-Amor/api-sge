"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVideoService = void 0;
const Videos_1 = require("../models/Videos");
const typeorm_1 = require("typeorm");
const Categories_1 = require("../models/Categories");
class CreateVideoService {
    async execute({ name, description, duration, category_id }) {
        const repo = (0, typeorm_1.getRepository)(Videos_1.Video);
        const repoCategory = (0, typeorm_1.getRepository)(Categories_1.Category);
        console.log(category_id);
        if (!await repoCategory.findOne(category_id)) {
            return new Error('Category does not exists.');
        }
        const video = repo.create({ name, description, duration, category_id });
        await repo.save(video);
        return video;
    }
}
exports.CreateVideoService = CreateVideoService;
