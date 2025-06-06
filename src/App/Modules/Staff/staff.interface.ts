import {Types} from 'mongoose'
export interface IStaff {
    user: Types.ObjectId
    contactInfo?: string
    department?: string
}