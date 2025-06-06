import mongoose from "mongoose"
import { IDoctor } from "./doctor.interface";

const doctorSchema = new mongoose.Schema<IDoctor>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialization: String,     
    availability: Boolean,
    gender: {
        type: String,
        enum: {
            values: ["male", "female"],
            message: "Gender must be either 'male' or 'female'",
        }
    }, 
    contactInfo: String
})

export const Doctor = mongoose.model<IDoctor>("Doctor", doctorSchema);