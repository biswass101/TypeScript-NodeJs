import mongoose from "mongoose"
import { IDoctor } from "./doctor.interface";

const doctorSchema = new mongoose.Schema<IDoctor>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    role: {
        type: String,
        required: true,
        enum: ['Doctor']
    }, 
    contactInfo: {
        type: String,
        required: true
    }
})

export const Doctor = mongoose.model<IDoctor>("Doctor", doctorSchema);