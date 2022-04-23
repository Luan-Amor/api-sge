import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Event } from "./Event";

@Entity('video')
export class Video {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column()
    url: string;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}