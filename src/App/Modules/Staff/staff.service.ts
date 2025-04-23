import { Request } from "express";
import { IStaff } from "./staff.interface";
import { Staff } from "./staff.model";
import httpStatus from 'http-status'
import ApiError from "../../utility/AppError";

//create
const createStaffToDB = async (req: Request, refId: any) => {
  const newStaff: IStaff = {
    user: refId,
    role: req.body.role,
    contactInfo: req.body.contactInfo
  }
  const savedStaff = await Staff.create(newStaff);
  return savedStaff;
};

//read
const getAllStaffFromDB = async () => {
  const result = await Staff.find()
  return result;
};

const getOneStaffFromDB = async(id: string) => {
    const result = await Staff.findById(id)
    if(!result) throw new ApiError(httpStatus.NOT_FOUND, "Staff Not Found")
    return result
}

const getStaffByEmail = async (email: string) => {
  const result = await Staff.findOne({email: email})
  return result;
}

//Update
const updateStaffToDB = async (id: string, payload: Object) => {
  const updatedStaff = await Staff.findByIdAndUpdate(
    id,
    payload,
    {new: true, runValidators: true}
  )

  return updatedStaff;
}

export const StaffServices = {
    getAllStaffFromDB,
    getStaffByEmail,
    getOneStaffFromDB,
    createStaffToDB,
    updateStaffToDB
}
