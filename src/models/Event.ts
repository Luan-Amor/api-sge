import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from './User'
import { Video } from "./Video";

@Entity('event')
export class Event {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    speaker: string;
    
    @Column()
    ticket_price: number;

    @Column()
    spots: number;

    @Column()
    owner_id: string;
    
    @ManyToOne(() => User)
    @JoinColumn({ name: 'owner_id'})
    owner: User;

    @ManyToMany(() => Video, {onDelete: "CASCADE", cascade: true})
    @JoinTable()
    videos: Video[];
    
    @CreateDateColumn()
    start_event_date: Date;

    @CreateDateColumn()
    end_event_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    deleted_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}