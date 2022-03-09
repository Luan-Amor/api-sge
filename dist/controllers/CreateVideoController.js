"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVideoController = void 0;
const CreateVideoService_1 = require("../services/CreateVideoService");
class CreateVideoController {
    async handle(request, response) {
        const { name, description, duration, category_id } = request.body;
        const service = new CreateVideoService_1.CreateVideoService();
        const result = await service.execute({ name, description, duration, category_id });
        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }
        return response.json(result);
    }
}
exports.CreateVideoController = CreateVideoController;
