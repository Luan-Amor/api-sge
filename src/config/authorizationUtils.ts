import { User } from "../models/User";
import { getRepository, Repository } from "typeorm";

const COMUM = 1;
const ENTERPRISE = 2;
const ADMIN = 3;

const Authorization = {
    
    async isComun(req, res, next){
        const id = req.headers.userId;

        if(await isPerfil(id, COMUM)){
            next(); 
        }else{
            res.status(403).json({ message: 'This profile does not have permission for this functionality.' });
        }
    },
    async isEnterprise(req, res, next){
        const id = req.headers.userId;

        if(await isPerfil(id, ENTERPRISE)){
            next(); 
        }else{
            res.status(403).json({ message: 'This profile does not have permission for this functionality.' });
        }
    },
    async isAdmin(req, res, next){
        const id = req.headers.userId;

        if(await isPerfil(id, ADMIN)){
            next(); 
        }else{
            res.status(403).json({ message: 'This profile does not have permission for this functionality.' });
        }
    }

}

async function isPerfil(id: string, idPerfil: number) {
    const repository: Repository<User> = getRepository(User);
    const user = await repository.createQueryBuilder("user")
    .leftJoinAndSelect("user.perfil", "perfil")
    .where({ id })
    .getOne();
    
    return user.perfil.some(p => p.id == idPerfil);
}

export default Authorization;