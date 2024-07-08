import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";
import { UserModel } from "../models/UserModel";

export class UserRepository implements IUserRepository { // 👈 implements IUserRepository
  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    return user
      ? new User(user.id, user.name, user.email, user.password)
      : null;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email })
    return user ? new User(user.id, user.name, user.email, user.password) : null;
  }
  
  async save(user: User): Promise<User> {
    const userSave = new UserModel({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    const saved = await userSave.save();
    return new User(saved.id, saved.name, saved.email, saved.password);
  }

  async edit(user: User,id:string): Promise<User> {
    const updated = await UserModel.findByIdAndUpdate(id,user,{new:true});
    if(!updated) throw new Error('User not found');
    return new User(updated?.id, updated?.name, updated?.email, updated?.password);
  }
 
}
