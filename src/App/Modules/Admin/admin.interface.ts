import { Types } from "mongoose";

export interface IAdmin {
    user: Types.ObjectId
    contactInfo: string
    address: string
}