import { Request, Response } from "express";
import { EnrollmentService } from "../services/EnrollmentService";

export class EnrollmentController {

    async getUserEnrolls(request: Request, response: Response) {
        const service = new EnrollmentService();
        const id = request.headers.userId;
        const result = await service.getEventsForUserId(id.toString());

        if(result instanceof Error){
            return response.status(404).json(result.message)
        }

        return response.json(result);
    }

    async enroll(request: Request, response: Response) {
        const service = new EnrollmentService();
        const idUser = request.headers.userId;
        const { idEvent } = request.params;
        const result = await service.enroll(idUser.toString(), parseInt(idEvent));
        
        if(result instanceof Error){
            return response.status(404).json(result.message)
        }

        return response.json(result);
    }

    async validate(request: Request, response: Response){
        const service = new EnrollmentService();
        const { idUser, idEvent } =  request.params;
        const result = await service.validateEnroll(idUser,  parseInt(idEvent));

        if(result instanceof Error){
            return response.status(404).json(result.message)
        }

        return response.json(result);
    }

    async getParticipantsByIdEvent(request: Request, response: Response){
        const service = new EnrollmentService();
        const id = request.headers.userId;
        const { eventId } = request.params;
        const result = await service.getParticipantsByEventId(id.toString(), parseInt(eventId));

        if(result instanceof Error){
            return response.status(404).json(result.message)
        }

        return response.json(result);
    }
    
}