import { Request, Response } from "express";
import { EnrollmentService } from "../services/EnrollmentService";

export class EnrollmentController {

    async getEnrollment(request: Request, response: Response) {
        const service = new EnrollmentService();
        const result = await service.getEnrollment();

        return response.json(result);
    }

    async getUserEnrolls(request: Request, response: Response) {
        const service = new EnrollmentService();
        const { id } = request.params;
        const result = await service.getEventsForUserId(id);

        return response.json(result);
    }

    async enroll(request: Request, response: Response) {
        const service = new EnrollmentService();
        const { user, event } = request.body;
        const result = await service.enroll({ user, event });
        
        if(result instanceof Error){
            return response.status(404).json(result.message)
        }

        return response.json(result);
    }
}