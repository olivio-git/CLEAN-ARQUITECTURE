import { License } from "../entities/License";

export interface ILicenseRepository {
    save(license: License): Promise<License>;
    findByUserId(userId: string): Promise<License[]>;
} 
