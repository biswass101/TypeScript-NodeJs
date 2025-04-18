import mongoose from "mongoose"
import { IDoctor } from "./doctor.interface";

const doctorSchema = new mongoose.Schema<IDoctor>({
    name: {
        type: String,
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

export const User = mongoose.model<IDoctor>("Doctor", doctorSchema);