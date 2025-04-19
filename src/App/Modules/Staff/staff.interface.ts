import {Date, Types} from 'mongoose'
export interface IStaff {
    user: Types.ObjectId
    contactInfo: string
}