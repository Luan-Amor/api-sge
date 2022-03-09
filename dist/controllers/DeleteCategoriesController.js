"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoryController = void 0;
const DeteleCategoryService_1 = require("../services/DeteleCategoryService");
class DeleteCategoryController {
    async handle(request, response) {
        const service = new DeteleCategoryService_1.DeleteCategoryService();
        const { id } = request.params;
        const result = await service.execute(id);
        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }
        return response.status(204).end();
    }
}
exports.DeleteCategoryController = DeleteCategoryController;
