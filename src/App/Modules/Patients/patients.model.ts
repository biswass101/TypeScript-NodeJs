import mongoose from "mongoose"
import { IPatients } from "./patients.interface";
const patientsSchema = new mongoose.Schema<IPatients>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    contactInfo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

export const Patients = mongoose.model<IPatients>("Patients", patientsSchema);