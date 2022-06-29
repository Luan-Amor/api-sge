import { Request, Response } from "express";
import { AdminService } from "../services/AdminService";

export class AdminController {

    async getAllUsers(req: Request, res: Response){
        const service = new AdminService();
        const result = await service.getAllUsers();

        if(result instanceof Error){
            return res.status(404).json(result.message)
        }

        return res.json(result);
    }

    async activateUser(req: Request, res: Response){
        const service = new AdminService();
        const { userId } = req.params
        const result = await service.activeUser(userId.toString());

        if(result instanceof Error){
            return res.status(404).json(result.message)
        }

        return res.json({message: "Usuário ativado"});
    }

    async makeUserAdmin(req: Request, res: Response){
        const service = new AdminService();
        const { userId } = req.params
        const result = await service.makeUserAdmin(userId.toString());

        if(result instanceof Error){
            return res.status(404).json(result.message)
        }

        return res.json({message: "Usuário passou a ser administrador do sistema"});
    }

    async deleteUser(req: Request, res: Response){
        const service = new AdminService();
        const { userId } = req.params;
        const result = await service.deleteUser(userId.toString());

        if(result instanceof Error){
            return res.status(404).json(result.message)
        }

        return res.json({message: "Usuário deletado do sistema."});
    }

    async getAllEvents(req: Request, res: Response){
        const service = new AdminService();
        const result = await service.getAllEvents();

        if(result instanceof Error){
            return res.status(404).json(result.message)
        }

        return res.json(result);
    }

    async deleteEvent(req: Request, res: Response){
        const service = new AdminService();
        const { eventId } = req.params;
        const result = await service.deleteEvent(parseInt(eventId));

        if(result instanceof Error){
            return res.status(404).json(result.message)
        }

        return res.json(result);
    }
}