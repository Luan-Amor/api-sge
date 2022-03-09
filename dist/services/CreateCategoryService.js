"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryService = void 0;
const Categories_1 = require("../models/Categories");
const typeorm_1 = require("typeorm");
class CreateCategoryService {
    async execute({ name, description }) {
        const repo = (0, typeorm_1.getRepository)(Categories_1.Category);
        if (await repo.findOne({ name })) {
            return new Error("Category already exists");
        }
        const category = repo.create({
            name,
            description
        });
        await repo.save(category);
        return category;
    }
}
exports.CreateCategoryService = CreateCategoryService;
