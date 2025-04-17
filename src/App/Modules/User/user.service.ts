import { IUser } from "./user.interface";
import { User } from "./user.model"

const getAllUsersFromDB = async() => {
    const result = await User.find();
    return result;
}

const createUserToDB = async(user: IUser) => {
    const savedUser =  (await User.create(user)).save();
    return savedUser;
}

export const UserServices = {
    getAllUsersFromDB,
    createUserToDB
}