import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Perfil } from './Perfil';

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

    @ManyToMany(() => Perfil)
    @JoinTable()
    perfil: Perfil[];
    
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