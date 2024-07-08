import { License } from "../../../domain/entities/License";
import { ILicenseRepository } from "../../../domain/repositories/ILicenseRepository";
import { LicenseModel } from "../models/LicenseModel";

export class LicenseRepository implements ILicenseRepository{
    
    async save(license: License): Promise<License> {
        const saveLicense = new LicenseModel({
            name: license.name,
            description: license.description,
            price: license.price ,
            startDate: license.startDate,
            endDate: license.endDate,
            statusLicense: license.statusLicense,
            idUser: license.idUser
        });
        const saved = await saveLicense.save();
        return this.mapToDomain(saved);
    }

    private mapToDomain(licenseModel: any): License {
        return new License(
            licenseModel.id,
            licenseModel.name,
            licenseModel.description,
            licenseModel.price,
            licenseModel.startDate,
            licenseModel.endDate,
            licenseModel.statusLicense,
            licenseModel.idUser.toString()
        )
    }

    async findByUserId(userId: string): Promise<License[]> {
        const licenses = await LicenseModel.find({idUser: userId});
        return licenses.map((license: any) => this.mapToDomain(license));
    }
}