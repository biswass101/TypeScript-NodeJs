import ApiError from "../../utility/AppError";
import { Doctor } from "../Doctor/doctor.model";
import { Patients } from "../Patients/patients.model";
import { Staff } from "../Staff/staff.model";
import { User } from "../User/user.model";
import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import { Request, Response } from "express";
import httpStatus from 'http-status' 

const getAllAdminFromDB = async () => {
  const result = await Admin.find();
  return result;
};

const getOneAdminFromDB = async(id: string) => {
    const result = await Admin.findById(id);
    if(!result) throw new ApiError(httpStatus.NOT_FOUND, "Admin Not Found!")
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

//delete doctor service
const deleteDoctorFromDB = async (id: string) => {
  const result = await Doctor.findByIdAndDelete(id);
  return result;
}

const deleteDoctorUserFromDB = async(id: string) => {
  const result = await User.findByIdAndUpdate(
      id,
      {
          isDeleted: true,
          status: 'blocked'
      },
      { new: true, runValidators: true } 
  )

  return result
}

//delete patient serviece
const deletePatientFromDB = async (id: string) => {
  const result = await Patients.findByIdAndDelete(id);
  return result;
}

const deletePatientUserFromDB = async(id: string) => {
  const result = await User.findByIdAndUpdate(
      id,
      {
          isDeleted: true,
          status: 'blocked'
      },
      { new: true, runValidators: true } 
  )

  return result
}

//delete staff service
const deleteStaffFromDB = async (id: string) => {
  const result = await Staff.findByIdAndDelete(id);
  return result;
}

const deleteStaffUserFromDB = async(id: string) => {
  const result = await User.findByIdAndUpdate(
      id,
      {
          isDeleted: true,
          status: 'blocked'
      },
      { new: true, runValidators: true } 
  )

  return result
}

export const AdminServices = {
    getAllAdminFromDB,
    getOneAdminFromDB,
    getAdminByEmail,
    createAdminToDB,
    updateAdminToDB,
    deleteDoctorFromDB,
    deleteDoctorUserFromDB,
    deletePatientFromDB,
    deletePatientUserFromDB,
    deleteStaffFromDB,
    deleteStaffUserFromDB
}
