import { model, Schema } from "mongoose";

const licenseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  statusLicense : { type: Boolean, required: true },
  idUser: { type: Schema.Types.ObjectId, ref: "User", required: true}
});

export const LicenseModel = model("License", licenseSchema);