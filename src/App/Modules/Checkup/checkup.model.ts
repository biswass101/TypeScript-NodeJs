import mongoose from "mongoose";
import { ICheckup, TPatient } from "./checkup.interface";

export const patientSchema = new mongoose.Schema<TPatient>({
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
        enum: ["male", "female"],
    },
    contanct : {
        
    }
})

const checkupSchema = new mongoose.Schema<ICheckup>({
    date: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true,
    },
    patinents: {
        type: patientSchema,
        required: true
    },
    doctor: {
        
    }

})