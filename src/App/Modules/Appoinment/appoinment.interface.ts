import { Date, Types } from "mongoose";

export interface IAppoinment {
    date: Date,
    time: string,
    patientID: Types.ObjectId
    doctorID: Types.ObjectId
    receiptionistId: Types.ObjectId
}