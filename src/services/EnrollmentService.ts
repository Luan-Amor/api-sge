import { Event } from "../models/Event";
import { getCustomRepository, getRepository, Repository } from "typeorm";
import { EnrollmentRepository } from "../repository/EnrollmentRepository";
import { Enrollment } from "../models/Enrollment";

export class EnrollmentService {

    private repository: EnrollmentRepository;
    private repoEvent: Repository<Event>

    constructor(){
        this.repository = getCustomRepository(EnrollmentRepository);
        this.repoEvent = getRepository(Event);
    }

    async getEventsForUserId(id: string){
        const result = await this.repository.findByUserId(id);
        return result;
    }

    async enroll(idUser: string, idEvent: number){

        const event: Event = await this.repoEvent.findOne({id: idEvent}).catch(err => null);

        if(await this.repository.findById(idUser, idEvent)){
            return new Error('User already enrolled for this event.');
        }
    
        const enroll = this.repository.create({ user_id: idUser , event_id: idEvent});

        if(event?.ticket_price == 0){
            enroll.paid = true;
        }

        await this.repository.save(enroll);

        return enroll;

    }

    async validateEnroll(idUser: string, idEvent: number){
        
        const enroll: Enrollment = await this.repository.findById(idUser, idEvent).catch(err => null);

        if(!enroll){
            return new Error('O participante não está inscrito no evento.');
        }

        if(enroll.arrived_at){
            return new Error('O participante já entrou no evento.');
        }

        if(!enroll.paid){
            return new Error('O pagamento não foi encontrado.');
        }

        enroll.arrived_at = new Date();
        try {
            await this.repository.save(enroll);
        } catch (error) {
            console.log(error)
        }

    }

    async getParticipantsByEventId(userId: string, idEvent: number){
        const number = await this.repository.getParticipantsByIdEvent(userId, idEvent);
        return number;
    }

}