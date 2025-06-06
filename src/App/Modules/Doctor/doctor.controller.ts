import { Request, RequestHandler, Response } from "express";
import { DoctorServices } from "./doctor.service";
import { UserServices } from "../User/user.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utility/cathcAsync";
import sendResponse from "../../utility/sendResponse";

//create
const createDoctor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const savedDoctor = await DoctorServices.createDoctorToDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "One Doctor Created Successfully",
      data: savedDoctor,
    });
  }
);

//read
const getAllDoctor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DoctorServices.getAlldoctorFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Doctors retrieved Successfully",
      data: result,
    });
  }
);

const getOneDoctor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DoctorServices.getOneDoctorFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "One Doctor retrieved Successfully",
      data: result,
    });
  }
);

//Update
const updateDoctor:RequestHandler =  catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const updatedDoctor = await DoctorServices.updateDoctorToDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "One Doctor Updated Successfully",
      data: updatedDoctor,
    });
  }
);


const uploadDoctorImage:RequestHandler =  catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const result = await DoctorServices.uploadDoctorImageToDB(req.user, req.file);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "File Uploaded",
      data: result,
    });
  }
);

export const DoctorController = {
  getAllDoctor,
  getOneDoctor,
  createDoctor,
  updateDoctor,
  uploadDoctorImage
};
