import { EntityRepository, Repository } from "typeorm";
import { Enrollment } from "../models/Enrollment";

@EntityRepository(Enrollment)
export class EnrollmentRepository extends Repository<Enrollment> {

    async findById(user_id, event_id){
        return await this.findOne({ user_id, event_id });
    }

    async findByUserId(id: string){
        return await this.createQueryBuilder('enrollment')
        .leftJoinAndSelect('enrollment.user', 'user')
        .leftJoinAndSelect('enrollment.event', 'event')
        .where('user.id = :userId', {userId: id})
        .select(['enrollment', 'user.name', 'event.name'])
        .getMany();
    }

    findByEventId(id: string){
    
    }
}