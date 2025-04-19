import { IDoctor } from "./doctor.interface";
import { Doctor } from "./doctor.model";

const getAlldoctorFromDB = async () => {
  const result = await Doctor.find();
  return result;
};

const getDoctorByEmail = async (email: string) => {
  // console.log("here");
  const result = await Doctor.findOne({email: email})
  return result;
}


const addDoctorToDB = async (doctor: IDoctor) => {
  const savedDoctor = (await Doctor.create(doctor)).save();
  return savedDoctor;
};

const updateDoctorToDB = async (id: string, newDoctor: IDoctor) => {
  const updatedDoctor = await Doctor.findByIdAndUpdate(
    id,
    newDoctor,
    {new: true, runValidators: true}
  )

  return updatedDoctor;
}

export const DoctorServices = {
  getAlldoctorFromDB,
  getDoctorByEmail,
  addDoctorToDB,
  updateDoctorToDB
};
