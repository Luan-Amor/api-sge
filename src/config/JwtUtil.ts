import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { blacklist } from "../redis/Blacklist";

export const JwtUtil = {

    async checkToken(req, res, next) {
        const authToken = req.headers["authorization"];

        if (!authToken) {
            res.status(401).json({ message: 'Token invalid.' })
        }

        const token = authToken.split(' ')[1];
        
        if(await blacklist.findToken(token)){
            res.status(401).json({ message: 'Token invalid.' })
        }else{
            req.token = token;
    
            jwt.verify(req.token, process.env.SECRET_KEY, (err, decodeToken) => {
                if (err && err.name === 'TokenExpiredError') {
                    res.status(400).json(err.message)
                    return
                }
                if (err) {
                    res.status(401).json(err)
                    return
                }
                req.headers.userId = decodeToken.id
                next();
            })
        }

    },

    generateToken(id) {
        return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRE })
    }

}