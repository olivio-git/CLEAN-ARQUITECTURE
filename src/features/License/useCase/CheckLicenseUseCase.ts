import { ILicenseRepository } from "../../../domain/repositories/ILicenseRepository";

export class CheckLicenseUseCase {
    constructor(private licenseRepository: ILicenseRepository) {}

    async execute(userId:string): Promise<boolean> {
        const license = await this.licenseRepository.findByUserId(userId);
        const now = new Date();
        return license?.some(license=>license.endDate >= now);
    }
}