import {Types} from 'mongoose'
export interface IPatients {
    user: Types.ObjectId
    age : Number
    gender: "Male" | "Female"
    contactInfo: string
    address: string
}