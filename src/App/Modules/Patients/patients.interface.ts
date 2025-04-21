import {Types} from 'mongoose'
export interface IPatients {
    user: Types.ObjectId
    age : Number
    gender: "Male" | "Female"
    role: "Patient"
    contactInfo: string
    address: string
}