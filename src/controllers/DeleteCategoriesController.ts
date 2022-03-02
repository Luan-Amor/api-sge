import { Request, Response } from "express";
import { DeleteCategoryService } from "../services/DeteleCategoryService";


export class DeleteCategoryController {
    async handle(request: Request, response: Response) {
        const service = new DeleteCategoryService();

        const { id } = request.params;

        const result = await service.execute(id);

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }
        
        return response.status(204).end();
    }
}