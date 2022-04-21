import { User } from "../models/User";
import { getRepository, Repository, IsNull } from "typeorm";
import bcrypt from 'bcryptjs';
import { createUserRequest, UserDto, UpdateUserRequest } from '../dto/UserDto';
import { PerfilUser } from "../config/PerfilUser";


export default class UserService {

    private repository: Repository<User>;

    constructor(){
        this.repository = getRepository(User);
    }

    async getAll(){
        const users = await this.repository.find({
            where: {
                deleted_at: IsNull()
            }
        })
        const result = users.map(usr => this.userToDto(usr));
        return result;
    }

    async create(dto: createUserRequest){
        const { email, password, cpfCnpj } = dto;
        
        const usr = await this.repository.findOne({email});
        if(usr){
            if(usr.deleted_at){
                return new Error('User already exists, but the account is inactive.')
            }
            return new Error('User already exist.')
        }

        dto.password = this.generatePassword(password);

        const user = this.repository.create(dto);

        if(cpfCnpj){
            if(cpfCnpj.length <= 14){
                user.perfil = [PerfilUser.COMUM];
            }else{
                user.perfil = [PerfilUser.COMUM, PerfilUser.ENTERPRISE];
            }
        }

        await this.repository.save(user);

        return this.userToDto(user);
    }

    async getOne(id){
        const user = await this.repository.findOne({
            where: {
                id,
                deleted_at: IsNull()
            }    
        });

        if(!user){
            return new Error('User not found.');
        }
        return this.userToDto(user);
    }

    async update(id, dto: UpdateUserRequest){
        const user = await this.repository.findOne(id);

        if(!user){
            return new Error('User does not exists');
        }

        user.name = dto.name ? dto.name : user.name;
        user.password = dto.password ? this.generatePassword(dto.password) : user.password;
        user.gender = dto.gender ? dto.gender : user.gender;
        user.state = dto.state ? dto.state : user.state;
        user.city = dto.city ? dto.city : user.city;

        await this.repository.save(user);

        return this.userToDto(user);
    }

    async delete(id){
        const user = await this.repository.findOne(id);

        if(!user){
            return new Error('User does not exists');
        }

        user.deleted_at = new Date();

        await this.repository.save(user);
    }

    private userToDto(user: User): UserDto{
        const dto: UserDto = {
            name : user?.name,
            email : user?.email,
            cpfCnpj: user?.cpfCnpj,
            gender : user?.gender,
            state : user?.state,
            city : user?.city
        };
        return dto;
    }

    private generatePassword(pass: string): string {
        return  bcrypt.hashSync(pass, 8);
    }

}