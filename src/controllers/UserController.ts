import { Request, Response } from "express";

import UserService  from "../services/UserService";


export class UserController {

    constructor(){}

    async findUsers(request: Request, response: Response){
        const service  = new UserService();
        const result = await service.getAll();
        return response.json(result);
    }

    async findUser(request: Request, response: Response){
        const {id} = request.params;
        const service  = new UserService();
        const result = await service.getOne(id);
        return response.json(result);
    }

    async createUser(request: Request, response: Response){
        const service  = new UserService();
        const {name, email, password} = request.body;
        const result = await service.create({name, email, password});

        if(result instanceof Error) {
            return response.status(400).json(result.message)
        }

        return response.json(result);
    }

    async updateUser(request: Request, response: Response){
        const { id } = request.params;
        const {name, password} = request.params;
        const service = new UserService();
        const result = await service.update({id, name, password});

        if(result instanceof Error) {
            return response.status(400).json(result.message)
        }

        return response.json(result); 
    }

    async deleteUser(request: Request, response: Response){
        const { id } = request.params;

        const service = new UserService();
        const result = await service.delete(id);

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }
        
        return response.status(204).end();
    }
}