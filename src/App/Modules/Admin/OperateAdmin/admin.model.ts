import mongoose from "mongoose"
import { IAdmin } from "./admin.interface"; 

const adminSchema = new mongoose.Schema<IAdmin>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin']
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

export const Admin = mongoose.model<IAdmin>("Admin", adminSchema);