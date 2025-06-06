import {Types} from 'mongoose'
export interface IPatients {
    user: Types.ObjectId
    age?: Number
    gender?: "male" | "female"
    contactInfo?: string
    address?: string
}