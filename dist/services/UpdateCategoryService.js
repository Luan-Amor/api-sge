"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryService = void 0;
const Categories_1 = require("../models/Categories");
const typeorm_1 = require("typeorm");
class UpdateCategoryService {
    async execute({ id, name, description }) {
        const repo = (0, typeorm_1.getRepository)(Categories_1.Category);
        const category = await repo.findOne(id);
        if (!category) {
            return new Error('Category does not exists');
        }
        category.name = name ? name : category.name;
        category.description = description ? description : category.description;
        repo.save(category);
        return category;
    }
}
exports.UpdateCategoryService = UpdateCategoryService;
