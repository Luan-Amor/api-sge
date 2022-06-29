import { Messages } from "../config/Messages";
import { ProfileUser } from "../config/ProfileUser";
import { Event } from "../models/Event";
import { User } from "../models/User";
import { getRepository, Repository } from "typeorm";

export class AdminService { 

    private userRepository: Repository<User>;
    private eventRepository: Repository<Event>;

    constructor(){
        this.userRepository = getRepository(User);
        this.eventRepository = getRepository(Event);
    }

    async getAllUsers(){
        const users = await this.userRepository.find();
        return users;
    }

    async makeUserAdmin(id: string){
        const user = await this.userRepository.findOne(id);

        if(!user){
            return new Error(Messages.USER_NOT_FOUND);
        }

        user.profile = ProfileUser.ADMIN;

        await this.userRepository.save(user)
    }

    async deleteUser(id: string){
        const user = await this.userRepository.findOne(id);

        if(!user){
            return new Error(Messages.USER_NOT_FOUND);
        }

        await this.userRepository.delete(user);
    }

    async activeUser(id: string){
        const user = await this.userRepository.findOne(id);

        if(!user){
            return new Error(Messages.USER_NOT_FOUND);
        }

        user.deleted_at = null

        await this.userRepository.save(user);
    }

    async getAllEvents(){
        const events = await this.eventRepository.find();
        return events;
    }

    async deleteEvent(id: number){
        const event = await this.eventRepository.findOne(id);
        if(!event){
            return new Error(Messages.EVENT_NOT_FOUND)
        }

        await this.eventRepository.delete(event.id);
    }


}