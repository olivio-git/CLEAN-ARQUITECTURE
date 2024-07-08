import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export class JsonWebTokenService{
    async tokenSign(payload: any): Promise<string>{
        console.log(process.env)
        return await jwt.sign(payload, process.env.SECRET as string, {expiresIn: '1d'});
    }
}