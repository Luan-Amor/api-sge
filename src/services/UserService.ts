import { User } from "../models/User";
import { getRepository, Repository } from "typeorm";


type userRequest = {
    name: string;
    email: string;
    password: string;
}
type upadateUserRequest = {
    id: string;
    name: string;
    password: string;
}

export default class UserService {

    private repository: Repository<User>;

    constructor(){
        this.repository = getRepository(User);
    }

    async getAll(){
        const result = await this.repository.find();
        return result;
    }

    async create(body: userRequest){
        const {email} = body;
        
        if(await this.repository.findOne({email})){
            return new Error('Usuário já existe.')
        }
        const user = this.repository.create(body);

        await this.repository.save(user);

        return user;
    }

    async getOne(id: string){
        const user = await this.repository.findOne(id);

        if(!user){
            return new Error('User not found.');
        }

        return user;
    }

    async update(userRequest: upadateUserRequest){
        const { id, name, password } = userRequest;
        const user = await this.repository.findOne(id);

        if(!user){
            return new Error('User does not exists');
        }

        user.name = name ? name : user.name;
        user.password = password ? password : user.password;

        await this.repository.save(user);

        return user;
    }

    async delete(id: string){
        const user = await this.repository.findOne(id);

        if(!user){
            return new Error('User does not exists');
        }

        await this.repository.delete(id);

    }

}