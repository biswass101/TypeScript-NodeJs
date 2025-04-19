import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const getAllAdminFromDB = async () => {
  const result = await Admin.find();
  return result;
};

const getAdminByEmail = async (email: string) => {
  const result = await Admin.findOne({email: email})
  return result;
}

const addAdminToDB = async (admin: IAdmin) => {
  const savedAdmin = (await Admin.create(admin)).save();
  return savedAdmin;
};

const updateAdminToDB = async (id: string, newAdmin: IAdmin) => {
  const updatedAdmin = await Admin.findByIdAndUpdate(
    id,
    newAdmin,
    {new: true, runValidators: true}
  )

  return updatedAdmin;
}

export const AdminServices = {
    getAllAdminFromDB,
    getAdminByEmail,
    addAdminToDB,
    updateAdminToDB
}
