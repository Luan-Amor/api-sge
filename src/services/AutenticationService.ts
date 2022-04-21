import { User } from "../models/User";
import { getRepository, Repository } from "typeorm";
import bcrypt from 'bcryptjs';
import { JwtUtil } from "../config/JwtUtil";

export class AutenticationService {

    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async login(email, password) {

        const user = await this.repository.findOne({ email });
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
            success: true,
            user: {
                id: user.id,
                login: user.email,
                nome: user.name,
                token: tokenJWT
            }
        }
        
        return tokenDto;
    }
}