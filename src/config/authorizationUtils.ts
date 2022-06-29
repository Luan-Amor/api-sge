import { User } from "../models/User";
import { getRepository, Repository } from "typeorm";
import { ProfileUser } from "./ProfileUser";
import { Messages } from "./Messages";


const Authorization = {
    
    async isComun(req, res, next){
        const id = req.headers.userId;

        if(await isProfile(id, ProfileUser.COMUM)){
            next(); 
        }else{
            res.status(403).json({ message: Messages.PERMISSION_DENY });
        }
    },
    async isEnterprise(req, res, next){
        const id = req.headers.userId;

        if(await isProfile(id, ProfileUser.ENTERPRISE)){
            next(); 
        }else{
            res.status(403).json({ message:  Messages.PERMISSION_DENY });
        }
    },
    async isAdmin(req, res, next){
        const id = req.headers.userId;

        if(await isProfile(id, ProfileUser.ADMIN)){
            next(); 
        }else{
            res.status(403).json({ message:  Messages.PERMISSION_DENY });
        }
    }

}

async function isProfile(id: string, profile: string) {
    const repository: Repository<User> = getRepository(User);
    const user = await repository.createQueryBuilder("user")
    .where({ id }).getOne();

    return user.profile === profile;
}

export default Authorization;