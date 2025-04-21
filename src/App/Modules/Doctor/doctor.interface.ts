import {Types} from 'mongoose'
export interface IDoctor {
    user: Types.ObjectId
    specialization: string
    availability: boolean
    gender: "Male" | "Female"
    role: "Doctor"
    contactInfo: string
}