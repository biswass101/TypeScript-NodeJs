import { IStaff } from "./staff.interface";
import { Staff } from "./staff.model";

const getAllStaffFromDB = async () => {
  const result = await Staff.find();
  return result;
};

const getStaffByEmail = async (email: string) => {
  const result = await Staff.findOne({email: email})
  return result;
}

const addStaffToDB = async (staff: IStaff) => {
  const savedStaff = (await Staff.create(staff)).save();
  return savedStaff;
};

const updateStaffToDB = async (id: string, newStaff: IStaff) => {
  const updatedStaff = await Staff.findByIdAndUpdate(
    id,
    newStaff,
    {new: true, runValidators: true}
  )

  return updatedStaff;
}

export const StaffServices = {
    getAllStaffFromDB,
    getStaffByEmail,
    addStaffToDB,
    updateStaffToDB
}
