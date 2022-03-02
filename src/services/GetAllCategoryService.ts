import { Category } from "../models/Categories";
import { getRepository } from "typeorm";


export class GetAllCategoryService {
    async execute(){
        const repo = getRepository(Category);

        const categories = await repo.find();

        return categories;
    }
}