import { User } from "../models/User";
import { getRepository, Repository } from "typeorm";

const COMUM = 1;
const ENTERPRISE = 2;
const ADMIN = 3;

const Authorization = {
    
    async isComun(req, res, next){
        const id = req.headers.userId;

        if(await isProfile(id, COMUM)){
            next(); 
        }else{
            res.status(403).json({ message: 'This profile does not have permission for this functionality.' });
        }
    },
    async isEnterprise(req, res, next){
        const id = req.headers.userId;

        if(await isProfile(id, ENTERPRISE)){
            next(); 
        }else{
            res.status(403).json({ message: 'This profile does not have permission for this functionality.' });
        }
    },
    async isAdmin(req, res, next){
        const id = req.headers.userId;

        if(await isProfile(id, ADMIN)){
            next(); 
        }else{
            res.status(403).json({ message: 'This profile does not have permission for this functionality.' });
        }
    }

}

async function isProfile(id: string, idProfile: number) {
    const repository: Repository<User> = getRepository(User);
    const user = await repository.createQueryBuilder("user")
    .leftJoinAndSelect("user.profile", "profile")
    .where({ id })
    .getOne();
    
    return user.profile.some(p => p.id == idProfile);
}

export default Authorization;