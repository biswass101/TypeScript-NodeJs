import { IPatients } from "./patients.interface";
import { Patients } from "./patients.model";

const getAllPatientFromDB = async () => {
  const result = await Patients.find();
  return result;
};

const getPatientByEmail = async (email: string) => {
  const result = await Patients.findOne({email: email})
  return result;
}

const addPatientToDB = async (patient: IPatients) => {
  const savedPatients = (await Patients.create(patient)).save();
  return savedPatients;
};

const updatePatientToDB = async (id: string, newPatient: IPatients) => {
  const updatedPatient = await Patients.findByIdAndUpdate(
    id,
    newPatient,
    {new: true, runValidators: true}
  )

  return updatedPatient;
}

export const PatientServices = {
    getAllPatientFromDB,
    getPatientByEmail,
    addPatientToDB,
    updatePatientToDB
}