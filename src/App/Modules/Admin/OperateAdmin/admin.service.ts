import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import { Request, Response } from "express";

const getAllAdminFromDB = async () => {
  const result = await Admin.find();
  return result;
};

const getOneAdminFromDB = async(id: string) => {
    const result = await Admin.findById(id);
    return result
}

const getAdminByEmail = async (email: string) => {
  const result = await Admin.findOne({email: email})
  return result;
}

const createAdminToDB = async (req: Request, refId: any) => {
  const newAdmin: IAdmin = {
    user: refId,
    role: req.body.role,
    address: req.body.address,
    contactInfo: req.body.contactInfo
  }
  const savedAdmin = await Admin.create(newAdmin);
  return savedAdmin;
}

const updateAdminToDB = async (id: string, payload: object) => {
  const updatedAdmin = await Admin.findByIdAndUpdate(
    id,
    payload,
    {new: true, runValidators: true}
  )

  return updatedAdmin;
}

export const AdminServices = {
    getAllAdminFromDB,
    getOneAdminFromDB,
    getAdminByEmail,
    createAdminToDB,
    updateAdminToDB
}
