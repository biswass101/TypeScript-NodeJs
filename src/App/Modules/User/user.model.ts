import mongoose from "mongoose"
import { IUser } from "./user.interface";

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: 0
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        enum: ["Admin", "Doctor", "Patients", "Staff"]
    },
    status: {
        type: String,
        require: true,
        enum: ['in-progress', 'blocked']
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    roleRef: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'roleModel'
    },
    roleModel: {
        type: String,
        required: true,
        enum: ['Admin', 'Doctor', 'Patient', 'Staff']
    }
})

export const User = mongoose.model<IUser>("User", userSchema);