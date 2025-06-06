import mongoose from "mongoose";
import { IPatients } from "./patients.interface";
const patientsSchema = new mongoose.Schema<IPatients>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  age: Number,
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  contactInfo: String,
  address: String,
});

export const Patients = mongoose.model<IPatients>("Patients", patientsSchema);
