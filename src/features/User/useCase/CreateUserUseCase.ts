import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User"; 
import { PasswordService } from "../../../infrastructure/services/Password.service"; 

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: PasswordService
  ) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if(existingUser) throw new Error('El usuario ya existe!');
    const hashedPassword = await this.passwordService.hashPassword(password);
    const user = new User('', name, email, hashedPassword);
    const savedUser:any = await this.userRepository.save(user);
    return savedUser;
  }
};
