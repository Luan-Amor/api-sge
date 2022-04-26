import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('profile')
export class Profile {

    @PrimaryColumn()
    id: number;

    @Column()
    profile: string;

    constructor(id: number, profile: string){
        this.id = id;
        this.profile = profile;
    }
}