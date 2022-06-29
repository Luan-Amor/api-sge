import { User } from "../models/User";
import { getRepository, Repository } from "typeorm";
import bcrypt from 'bcryptjs';
import { JwtUtil } from "../config/JwtUtil";
import { blacklist } from "../redis/Blacklist";

export class AutenticationService {

    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async login(email, password) {

        const user = await this.repository.createQueryBuilder("user")
        .where({ email })
        .getOne();

        if (!user) {
            return new Error('User or password incorrect.')
        }
        if (user.deleted_at) {
            return new Error('User is inactive.')
        }
        const pass = bcrypt.compareSync(password, user.password);

        if (!pass) {
            return new Error('User or password incorrect.')
        }

        const tokenJWT = JwtUtil.generateToken(user.id);

        const tokenDto =  
            {
                id: user.id,
                login: user.email,
                name: user.name,
                profile: user.profile,
                token: tokenJWT
            }
        
        return tokenDto;
    }

    async logout(token){
        const result = await blacklist.addToken(token);
        return result;
    }
}