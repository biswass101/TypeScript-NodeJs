import { IDoctor } from "./doctor.interface";
import { Doctor } from "./doctor.model";
import { Request, Response } from "express";

const getAlldoctorFromDB = async () => {
  const result = await Doctor.find();
  return result;
};

const getOneDoctorFromDB = async(id: string) => {
    const result = await Doctor.findById(id);
    return result
}

const getDoctorByEmail = async (email: string) => {
  const result = await Doctor.findOne({email: email})
  return result;
}


const createDoctorToDB = async (req: Request, refId: any) => {
  const newDoctor: IDoctor = {
    user: refId,
    role: req.body.role,
    gender: req.body.gender,
    specialization: req.body.specialization,
    availability: req.body.availability,
    contactInfo: req.body.contactInfo,
  }
  const savedDoctor = await Doctor.create(newDoctor);
  return savedDoctor;
};

const updateDoctorToDB = async (id: string, payload: Object) => {
  const updatedDoctor = await Doctor.findByIdAndUpdate(
    id,
    payload,
    {new: true, runValidators: true}
  )

  return updatedDoctor;
}

export const DoctorServices = {
  getAlldoctorFromDB,
  getOneDoctorFromDB,
  getDoctorByEmail,
  createDoctorToDB,
  updateDoctorToDB
};
