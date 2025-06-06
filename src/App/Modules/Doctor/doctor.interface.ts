import {Types} from 'mongoose'
export interface IDoctor {
    user: Types.ObjectId
    specialization?: string
    availability?: boolean
    gender?: "male" | "female"
    contactInfo?: string
}