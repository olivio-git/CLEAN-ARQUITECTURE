import { Request, Response } from "express";
import { CreateUserUseCase } from "../../features/User/useCase/CreateUserUseCase";
import { GetUserInfoUseCase } from "../../features/User/useCase/GetUserInfoUseCase";
import { EditUserInfoUseCase } from "../../features/User/useCase/EditUserInfoUseCase";
import { LoginUserUseCase } from "../../features/User/useCase/LoginUserUseCase";

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private GetUserInfoUseCase: GetUserInfoUseCase,
    private editUserInfoUseCase: EditUserInfoUseCase,
    private loginUserUseCase: LoginUserUseCase
  ) {}

  async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email,password } = req.body;
    try {
      const user = await this.createUserUseCase.execute(name, email,password);
      return res.status(201).send(user);
    } catch (error:any) {
        error.message = 'Error al crear el usuario';
      return res.status(400).send({ error: error?.message });
    }
  }
  async getUserInfo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const userDTO = await this.GetUserInfoUseCase.execute(id);
      if(!userDTO) return res.status(404).send({ error: 'Usuario no encontrado' });
      return res.status(200).send(userDTO);
    } catch (error) {
      return res.status(400).send({ error: error });
    }
  }

  async editUserInfo(req:Request,res:Response) : Promise<Response>{
    const { id } = req.params;
    const { name, email,password } = req.body;
    try {
        const user = await this.editUserInfoUseCase.execute(id,name,email,password);
        return res.status(201).send(user);
    } catch (error) {
        return res.status(400).send({ error: error });
    }
  }

  async loginUser(req:Request,res:Response) : Promise<Response>{
    const { email,password } = req.body;
    try {
        const token = await this.loginUserUseCase.execute({email,password});
        res.cookie('token',token,{httpOnly:true});
        return res.status(201).send({MessageChannel:'Login exitoso'});
    } catch (error:any) {
        console.log(error)
        return res.status(400).send({ error: error?.message });
    }
  }
}
