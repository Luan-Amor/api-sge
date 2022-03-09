"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoryService = void 0;
const Categories_1 = require("../models/Categories");
const typeorm_1 = require("typeorm");
class DeleteCategoryService {
    async execute(id) {
        const repo = (0, typeorm_1.getRepository)(Categories_1.Category);
        if (!await repo.findOne(id)) {
            return new Error('Category does not exists');
        }
        await repo.delete(id);
    }
}
exports.DeleteCategoryService = DeleteCategoryService;
