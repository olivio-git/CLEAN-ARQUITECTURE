import { Request, Response } from "express"; 
import { AssignLicenseUseCase } from "../../features/License/useCase/AssignLicenseUseCase";
import { CheckLicenseUseCase } from "../../features/License/useCase/CheckLicenseUseCase";

export class LicenseController {
  constructor(
    private assignLicenseUseCase: AssignLicenseUseCase,
    private checkLicenseUseCase: CheckLicenseUseCase
) {}

  async assignLicense(req: Request, res: Response): Promise<Response> {
    const { userId,days, name, description, price, statusLicense } =
      req.body;
    try {
        const license = await this.assignLicenseUseCase.execute(userId, days, { name, description, price, statusLicense });
      return res.status(201).send(license);
    } catch (error: any) {
      return res.status(400).send({ error: error?.message });
    }
  }

  async checkLicense(req:Request,res:Response):Promise<Response>{
    const {userId}= req.params;
    try {
        const isLicensed = await this.checkLicenseUseCase.execute(userId);
        return res.status(200).send({licensed:isLicensed});
    } catch (error:any) {
        return res.status(400).send({ error: error?.message });
    }
  }
}
