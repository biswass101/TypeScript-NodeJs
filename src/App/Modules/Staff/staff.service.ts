import { IStaff } from "./staff.interface";
import { Staff } from "./staff.model";
import httpStatus from 'http-status'
import ApiError from "../../utility/AppError";

//create
const createStaffToDB = async (payload: IStaff) => {
  const savedStaff = await Staff.create(payload);
  return savedStaff;
};

//read
const getAllStaffFromDB = async () => {
  const result = await Staff.find().populate('user', 'name role email')
  return result;
};

const getOneStaffFromDB = async(id: string) => {
    const result = await Staff.findById(id, { isDeleted: false })
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
