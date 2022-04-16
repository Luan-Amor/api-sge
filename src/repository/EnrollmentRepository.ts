import { EntityRepository, Repository } from "typeorm";
import { Enrollment } from "../models/Enrollment";

@EntityRepository(Enrollment)
export class EnrollmentRepository extends Repository<Enrollment> {

    findById(user_id, event_id){
        return this.findOne({ user_id, event_id });
    }

    findByUserId(id: string){
        return this.createQueryBuilder('enrollment')
        .leftJoinAndSelect('enrollment.user', 'user')
        .leftJoinAndSelect('enrollment.event', 'event')
        .where('user.id = :userId', {userId: id})
        .select(['enrollment', 'user.name', 'event.name'])
        .getMany();
    }

    findByEventId(id: string){
    
    }
}