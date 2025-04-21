import { Request, RequestHandler, Response } from "express";
import { DoctorServices } from "./doctor.service";
import { UserServices } from "../User/user.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utility/cathcAsync";
import sendResponse from "../../utility/sendResponse";

//create
const createDoctor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    req.body.role = "Doctor";
    //saved to master collection
    const savedUser = await UserServices.createUserToDB(req);
    //saved to Patient collection
    const savedDoctor = await DoctorServices.createDoctorToDB(
      req,
      savedUser._id
    );
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
    const updatedDoctor = await DoctorServices.updateDoctorToDB(id, {
      specialization: req.body.specialization,
      availability: req.body.availability,
      gender: req.body.gender,
      contactInfo: req.body.contactInfo,
      
    });

    delete req.body.specialization;
    delete req.body.gender;
    delete req.body.contactInfo;
    delete req.body.availability;

    const findPatinet = await DoctorServices.getOneDoctorFromDB(id);
    await UserServices.updateOneUserToDB(
      findPatinet?.user._id.toString() as string,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "One Doctor Updated Successfully",
      data: updatedDoctor,
    });
  }
);

export const DoctorController = {
  getAllDoctor,
  getOneDoctor,
  createDoctor,
  updateDoctor,
};
