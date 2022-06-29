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

    async getParticipantsByIdEvent(userId: string, eventId: number){
        return await this.createQueryBuilder('enrollment')
        .leftJoinAndSelect('enrollment.user', 'user')
        .leftJoinAndSelect('enrollment.event', 'event')
        .where('event.id = :eventId', { eventId })
        .andWhere('event.owner_id = :userId', { userId })
        .select(['enrollment', 'user.name', 'user.gender', 'user.state', 'user.city'])
        .getMany();
    }
}