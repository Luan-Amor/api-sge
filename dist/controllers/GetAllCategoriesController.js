"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCategoryController = void 0;
const GetAllCategoryService_1 = require("../services/GetAllCategoryService");
class GetAllCategoryController {
    async handle(request, response) {
        const service = new GetAllCategoryService_1.GetAllCategoryService();
        const categories = await service.execute();
        return response.json(categories);
    }
}
exports.GetAllCategoryController = GetAllCategoryController;
