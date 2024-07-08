import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { PasswordService } from "../../../infrastructure/services/Password.service";
import { UserDTO } from "../dtos/UserDTO";

export class EditUserInfoUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordServcie: PasswordService
  ) {}
  async execute(id: string, name: string, email: string, password: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");
    const hashedPassword = await this.passwordServcie.hashPassword(password);
    const updated = await this.userRepository.edit({ id, name, email, password:hashedPassword },id );
    return UserDTO.fromDomain(updated);
  }
}
