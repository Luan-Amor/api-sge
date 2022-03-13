import { Enrollment } from "../models/Enrollment";
import { getCustomRepository, getRepository, Repository } from "typeorm";
import { EnrollmentRepository } from "../repository/EnrollmentRepository";

type EnrollmentId = {
    user: string;
    event: string;
}
export class EnrollmentService {

    private repository: EnrollmentRepository;

    constructor(){
        this.repository = getCustomRepository(EnrollmentRepository);
    }

    async getEnrollment(){
        const enrollment = await this.repository.find({
            relations: ['user', 'event']
        });
        return enrollment;
    }

    async getEventsForUserId(id: string){
        const result = await this.repository.findByUserId(id);
        return result;
    }

    async enroll(id: EnrollmentId){

        if(await this.repository.findById(id.user, id.event)){
            return new Error('User already enrolled for this event.');
        }

        const enroll = this.repository.create(id);

        await this.repository.save(enroll);

        return enroll;

    }


}