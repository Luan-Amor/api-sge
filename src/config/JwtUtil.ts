import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Messages } from './Messages';

export const JwtUtil = {

    async checkToken(req, res, next) {
        const authToken = req.headers["authorization"];

        if (!authToken) {
            res.status(401).json({ message: Messages.TOKEN_INVALID });
            return;
        }

        const token = authToken.split(' ')[1];

        req.token = token;

        jwt.verify(req.token, process.env.SECRET_KEY, (err, decodeToken) => {
            if (err && err.name === 'TokenExpiredError') {
                res.status(400).json(Messages.TOKEN_EXPIRED_ERROR)
                return
            }
            if (err) {
                res.status(401).json(err)
                return
            }
            req.headers.userId = decodeToken.id
            next();
        })

    },

    generateToken(id, name, perfil) {
        return jwt.sign({ id, name, perfil }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRE })
    },

    getExpiration(token) {
        const decode = jwt.decode(token)
        return decode.exp;
    }

}