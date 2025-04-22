import mongoose, { Mongoose, Types } from "mongoose";
import { IAppoinment } from "./appoinment.interface";

const appoinmnetSchema = new mongoose.Schema<IAppoinment>({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    patientID: {
        type: mongoose.Schema.ObjectId,
        ref: "Patients",
        required: true
    },
    doctorID: {
        type: mongoose.Schema.ObjectId,
        ref: "Doctor",
        required:  true
    },
    receiptionistId: {
        type: mongoose.Schema.ObjectId,
        ref: "Receiptionist",
        required: true
    }
})

export const Appoinment = mongoose.model<IAppoinment>("appoinment", appoinmnetSchema); 