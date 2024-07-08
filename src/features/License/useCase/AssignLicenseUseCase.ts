import { Schema } from "mongoose";
import { License } from "../../../domain/entities/License";
import { ILicenseRepository } from "../../../domain/repositories/ILicenseRepository";

export class AssignLicenseUseCase {
  constructor(private licenseRepository: ILicenseRepository) {}
  async execute(userId: string, days: number, licenseDetails: Omit<License, 'id' | 'idUser' | 'startDate' | 'endDate'>): Promise<License> {
    const now = new Date();
    const licenseStart = now;
    const licenseEnd = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const license = new License(
      '',
      licenseDetails.name,
      licenseDetails.description,
      licenseDetails.price,
      licenseStart,
      licenseEnd,
      licenseDetails.statusLicense,
      userId
    );
    return await this.licenseRepository.save(license);
  }
};
