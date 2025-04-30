import {Types} from 'mongoose'
export interface IStaff {
    user: Types.ObjectId
    name: string
    email: string
    image: string
    contactInfo: string
    status: "approved" | "rejected"
    isDeleted: boolean
}