import { Request } from "express";
import { User } from "./user.model"
import bycrypt from 'bcrypt'
import {IUser} from './user.interface'

//create
const createUserToDB = async(req: Request):Promise<any> => {
    const hashPassword: string = await bycrypt.hash(req.body.password, 12);
    const userData: IUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        image: req.body.image,
        role: req.body.role,
        status: 'in-progress',
        isDeleted: false,
        roleModel: req.body.role
    };

    const result = await User.create(userData); 
    return result;

}

//read
const getAllUsersFromDB = async() => {
    const result = await User.find();
    return result;
}

const getOneUserFromDB = async(id: string) => {
    const result = await User.findById(id);
    return result
}

const getUserByEmail = async(email: string) => {
    const result = await User.findOne({email : email});
    return result;
}

//update
const updateOneUserToDB = async(id: string, payload: any) => {
    const result = await User.findByIdAndUpdate(
        id,
        payload,
        {new: true, runValidators: true}
    );
    return result;
}

export const UserServices = {
    createUserToDB,
    getOneUserFromDB,
    getAllUsersFromDB,
    getUserByEmail,
    updateOneUserToDB
}