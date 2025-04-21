import { IPatients } from "./patients.interface";
import { Patients } from "./patients.model";
import { Request, Response } from "express";

//create
const createPatientToDB = async (req: Request, refId: any) => {
  const newPatient:IPatients = {
    user: refId,
    role: req.body.role,
    gender: req.body.gender,
    age: req.body.age,
    contactInfo: req.body.contactInfo,
    address: req.body.contactInfo
  }
  const savedPatient = await Patients.create(newPatient);
  return savedPatient;
};

const getAllPatientFromDB = async () => {
  const result = await Patients.find();
  return result;
};

const getOnePatientFromDB = async(id: string) => {
    const result = await Patients.findById(id);
    return result
}

const getPatientByEmail = async (email: string) => {
  const result = await Patients.findOne({email: email})
  return result;
}



const updatePatientToDB = async (id: string, payload: Object) => {
  const updatedPatient = await Patients.findByIdAndUpdate(
    id,
    payload,
    {new: true, runValidators: true}
  )

  return updatedPatient;
}

export const PatientServices = {
    getAllPatientFromDB,
    getOnePatientFromDB,
    getPatientByEmail,
    createPatientToDB,
    updatePatientToDB
}