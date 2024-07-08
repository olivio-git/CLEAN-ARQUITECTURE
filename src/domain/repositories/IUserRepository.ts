import { User } from "../entities/User";

export interface IUserRepository { // 👈 interface IUserRepository
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
  edit(user:User,id:string):Promise<User>; 
}