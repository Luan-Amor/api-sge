import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from './User'

@Entity('event')
export class Event {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column()
    ticket_price: number;

    @Column()
    owner_id: string;
    
    @ManyToOne(() => User)
    @JoinColumn({ name: 'owner_id'})
    owner: User;
    

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}