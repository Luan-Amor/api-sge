import { Request, Response } from "express";
import { createUserRequest, UpdateUserRequest } from '../dto/UserDto';

import UserService  from "../services/UserService";


export class UserController {

    constructor(){}

    async findUsers(request: Request, response: Response){
        const service  = new UserService();
        const result = await service.getAll();
        return response.json(result);
    }

    async findUser(request: Request, response: Response){
        const service  = new UserService();
        const id = request.headers.userId;
        const result = await service.getOne(id);
        return response.json(result);
    }

    async createUser(request: Request, response: Response){
        const service  = new UserService();
        const userDto: createUserRequest = request.body;
        const result = await service.create(userDto);

        if(result instanceof Error) {
            return response.status(400).json(result.message)
        }

        return response.json(result);
    }

    async updateUser(request: Request, response: Response){
        const id = request.headers.userId;
        const dto: UpdateUserRequest = request.body;
        const service = new UserService();
        const result = await service.update(id, dto);

        if(result instanceof Error) {
            return response.status(400).json(result.message)
        }

        return response.json(result); 
    }

    async deleteUser(request: Request, response: Response){
        const id = request.headers.userId;

        const service = new UserService();
        const result = await service.delete(id);

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }
        
        return response.status(204).end();
    }
}