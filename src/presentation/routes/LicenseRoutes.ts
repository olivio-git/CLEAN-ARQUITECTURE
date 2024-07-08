import { Router } from "express";
import { LicenseRepository } from "../../infrastructure/database/repositories/LicenseRepository";
import { LicenseController } from "../controllers/LicenseController";
import { AssignLicenseUseCase } from "../../features/License/useCase/AssignLicenseUseCase";
import { CheckLicenseUseCase } from "../../features/License/useCase/CheckLicenseUseCase";

const router = Router();

const licenseRepository = new LicenseRepository(); 
const assignLicenseUseCase = new AssignLicenseUseCase(licenseRepository);
const checkLicenseUseCase = new CheckLicenseUseCase(licenseRepository);
const licenseController = new LicenseController(assignLicenseUseCase,checkLicenseUseCase);

router.post('/create',(req,res)=>licenseController.assignLicense(req,res));
router.get('/check/:userId',(req,res)=>licenseController.checkLicense(req,res));


export { router as licenseRoutes};