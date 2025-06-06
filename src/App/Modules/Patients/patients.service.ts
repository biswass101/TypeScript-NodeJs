import ApiError from "../../utility/AppError";
import { IPatients } from "./patients.interface";
import { Patients } from "./patients.model";
import httpStatus from 'http-status'

//create
const createPatientToDB = async (payload: IPatients) => {
  const savedPatient = await Patients.create(payload);
  return savedPatient;
};

const getAllPatientFromDB = async () => {
  const result = await Patients.find().populate('user', 'name email role');
  return result;
};

const getOnePatientFromDB = async(id: string) => {
    const result = await Patients.findById(id);
    if(!result) throw new ApiError(httpStatus.NOT_FOUND, "Patient Not Found!");
    return result
}

const getPatientByEmail = async (email: string) => {
  const result = await Patients.findOne({email: email})
  return result;
}

const updatePatientToDB = async (id: string, payload: any) => {
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