import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../utility/AppError";
import { IDoctor } from "./doctor.interface";
import { Doctor } from "./doctor.model";
import httpStatus from "http-status";
import { User } from "../User/user.model";
import { sendFileToCloudinary } from "../../utility/sendFileToCloudinary";

const getAlldoctorFromDB = async () => {
  const result = await Doctor.find().populate("user", "name email role");
  return result;
};

const getOneDoctorFromDB = async (id: string) => {
  const result = await Doctor.findById(id);
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Doctor Not Found");
  return result;
};

const getDoctorByEmail = async (email: string) => {
  const result = await Doctor.findOne({ email: email });
  return result;
};

const createDoctorToDB = async (payload: IDoctor) => {
  const savedDoctor = await Doctor.create(payload);
  return savedDoctor;
};

const updateDoctorToDB = async (id: string, payload: any) => {
  const updatedDoctor = await Doctor.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedDoctor;
};

const uploadDoctorImageToDB = async (userData: JwtPayload, file: any) => {
  const doctor = await User.findOne({ _id: userData.userId });
  if (!doctor) throw new ApiError(httpStatus.NOT_FOUND, "Doctor Not Found!");
  if (file) {
    const fileName = `${doctor.name}-${Date.now()}`;
    const { secure_url } = (await sendFileToCloudinary(
      fileName,
      file.path
    )) as { secure_url: string };
    const res = await User.findOneAndUpdate(
      { _id: userData.userId },
      { image: secure_url },
      { new: true }
    );
    return res;
  } else
    throw new ApiError(
      httpStatus.BAD_GATEWAY,
      "Please provide an image first!"
    );
};

export const DoctorServices = {
  getAlldoctorFromDB,
  getOneDoctorFromDB,
  getDoctorByEmail,
  createDoctorToDB,
  updateDoctorToDB,
  uploadDoctorImageToDB,
};
