import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('user')
export class User {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    cpfCnpj: string;
    
    @Column()
    password: string;

    @Column()
    gender: string;

    @Column()
    state: string;
    
    @Column()
    city: string;

    @Column()
    profile: string;
    
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