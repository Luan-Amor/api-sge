"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(service) {
        this.service = service;
    }
    async findUser(request, response) {
        return response.json('Buscar usuário');
    }
    async createUser(request, response) {
        const result = await this.service.create(request.body);
        return response.json(result);
    }
}
exports.UserController = UserController;
