"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCategoryService = void 0;
const Categories_1 = require("../models/Categories");
const typeorm_1 = require("typeorm");
class GetAllCategoryService {
    async execute() {
        const repo = (0, typeorm_1.getRepository)(Categories_1.Category);
        const categories = await repo.find();
        return categories;
    }
}
exports.GetAllCategoryService = GetAllCategoryService;
