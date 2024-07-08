import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { JsonWebTokenService } from "../../../infrastructure/services/JsonWebToken.service";
import { PasswordService } from "../../../infrastructure/services/Password.service";
import { LoginDTO } from "../dtos/LoginDTO";

export class LoginUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordService: PasswordService,
        private jsonWebTokenService: JsonWebTokenService
    ){}

    async execute(loginDTO:LoginDTO){
        const user = await this.userRepository.findByEmail(loginDTO.email);
        if(!user) throw new Error('Usuario no encontrado');
        const isValidPassword = await this.passwordService.comparePassword(loginDTO.password, user.password);
        if(!isValidPassword) throw new Error('Contraseña incorrecta');
        const token = this.jsonWebTokenService.tokenSign({email:loginDTO.email});
        return token;
    }
}