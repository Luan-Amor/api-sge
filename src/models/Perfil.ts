import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('perfil')
export class Perfil {

    @PrimaryColumn()
    id: number;

    @Column()
    perfil: string;

    constructor(id: number, perfil: string){
        this.id = id;
        this.perfil = perfil;
    }
}