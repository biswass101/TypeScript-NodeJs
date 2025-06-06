import { catchAsync } from "../../utility/cathcAsync";
import sendResponse from "../../utility/sendResponse";
import httpStatus from "http-status";
import { UserServices } from "../User/user.service";
import { Request, RequestHandler, Response } from "express";
import { DoctorServices } from "../Doctor/doctor.service";
import { PatientServices } from "../Patients/patients.service";
import { StaffServices } from "../Staff/staff.service";
import { AdminServices } from "./admin.service";

//create
const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const savedAdmin = await AdminServices.createAdminToDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "One Admin Created Successfully",
      data: savedAdmin,
    });
  }
);

//read
const getAllAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdminServices.getAllAdminFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admins retrieved Successfully",
      data: result,
    });
  }
);

const getOneAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminServices.getOneAdminFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "One Admin retrieved Successfully",
      data: result,
    });
  }
);

//Update
const updateAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const updatedAdmin = await AdminServices.updateAdminToDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "One Admin Updated Successfully",
      data: updatedAdmin,
    });
  }
);

//Delete Doctor
export const deleteDoctor: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const findOneDoctor = await DoctorServices.getOneDoctorFromDB(id);
    const findDoctorAndDelete = await AdminServices.deleteDoctorFromDB(id);

    await AdminServices.deleteDoctorUserFromDB(
      findOneDoctor?.user._id.toString() as string
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "One Doctor Deleted Successfully",
      data: findDoctorAndDelete,
    });
  }
);

//Delete Patients
export const deletePatient = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const findOnePatient = await PatientServices.getOnePatientFromDB(id);
    const findPatientAndDelete = await AdminServices.deletePatientFromDB(id);

    await AdminServices.deletePatientUserFromDB(
      findOnePatient?.user._id.toString() as string
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "One Patient Deleted Successfully",
      data: findPatientAndDelete,
    });
  }
);

//Delete staff
export const deleteStaff = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const findOneStaff = await StaffServices.getOneStaffFromDB(id);
    const findStaffAndDelete = await AdminServices.deleteStaffFromDB(id);

    await AdminServices.deleteStaffUserFromDB(
      findOneStaff?.user._id.toString() as string
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "One Stuff Deleted Successfully",
      data: findStaffAndDelete,
    });
  }
);

export const AdminController = {
  getAllAdmin,
  getOneAdmin,
  createAdmin,
  updateAdmin,
  deleteDoctor,
  deletePatient,
  deleteStaff,
};
