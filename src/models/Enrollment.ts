import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Event } from "./Event";
import { User } from './User'

@Entity('enrollment')
export class Enrollment {

    @PrimaryColumn()
    user_id: string;

    @PrimaryColumn()
    event_id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id'})
    user: string;

    @ManyToOne(() => Event, event => event.id, {primary: true})
    @JoinColumn({ name: 'event_id'})
    event: string;

    @Column()
    paid: boolean;

    @Column()
    arrived_at: Date;

    @CreateDateColumn()
    created_at: Date;

}