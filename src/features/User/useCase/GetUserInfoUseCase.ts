import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserDTO } from "../dtos/UserDTO";
export class GetUserInfoUseCase {
    constructor(private userRepository: IUserRepository) {}
    
    async execute(id:string): Promise<UserDTO | null> {
      const user = await this.userRepository.findById(id);
      if(!user) return null;
      return UserDTO.fromDomain(user);
    }
  }