import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepository"; 
import { CreateUserUseCase } from "../../features/User/useCase/CreateUserUseCase"; 
import { GetUserInfoUseCase } from "../../features/User/useCase/GetUserInfoUseCase";
import { PasswordService } from "../../infrastructure/services/Password.service";
import { EditUserInfoUseCase } from "../../features/User/useCase/EditUserInfoUseCase";
import { LoginUserUseCase } from "../../features/User/useCase/LoginUserUseCase";
import { JsonWebTokenService } from "../../infrastructure/services/JsonWebToken.service";

const router = Router();

const userRepository = new UserRepository();
const passwordService = new PasswordService();
const jsonWebTokenService = new JsonWebTokenService();
const createUserUseCase = new CreateUserUseCase(userRepository,passwordService);
const getUserInfoUseCase = new GetUserInfoUseCase(userRepository);
const editUserInfoUseCase = new EditUserInfoUseCase(userRepository,passwordService);
const loginUserUseCase = new LoginUserUseCase(userRepository,passwordService,jsonWebTokenService);
const userController = new UserController(createUserUseCase,getUserInfoUseCase,editUserInfoUseCase,loginUserUseCase); 


router.post("/register", (req, res) => userController.createUser(req, res));
router.get("/info/:id", (req, res) => userController.getUserInfo(req, res)); 
router.put("/edit/:id", (req, res) => userController.editUserInfo(req, res)); 
router.post("/login", (req, res) => userController.loginUser(req, res));


export { router as userRoutes };
