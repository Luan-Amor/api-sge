import client from './Client';
import jwt from 'jsonwebtoken';
import { createHash } from 'crypto';

const generateHashToken = (token) => {
    return createHash('sha256').update(token).digest('hex');
}


export const blacklist = {

    addToken: async token => {
        const timeExpiration = jwt.decode(token).exp;
        const tokenHash = generateHashToken(token);
        await client.connect();
        await client.set(tokenHash, '');
        await client.expireAt(tokenHash, timeExpiration)
        await client.disconnect();
    },
    findToken: async token => {
        const tokenHash = generateHashToken(token);
        await client.connect();
        const result = await client.exists(tokenHash);
        await client.disconnect();
        return result === 1;
    }
}