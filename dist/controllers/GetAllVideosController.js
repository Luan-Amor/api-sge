"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllVideosController = void 0;
const GetAllVideosService_1 = require("../services/GetAllVideosService");
class GetAllVideosController {
    async handle(request, response) {
        const { name, description, duration, category_id } = request.body;
        const service = new GetAllVideosService_1.GetAllVideosService();
        const videos = await service.execute();
        return response.json(videos);
    }
}
exports.GetAllVideosController = GetAllVideosController;
