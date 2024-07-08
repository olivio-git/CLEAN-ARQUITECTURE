import bycryptjs from 'bcryptjs';

export class PasswordService {
    async hashPassword(password:string):Promise<string>{
        return await bycryptjs.hashSync(password, 8);
    };

    async comparePassword(password:string, hash:string):Promise<boolean>{
        return await bycryptjs.compareSync(password, hash);
    }
}