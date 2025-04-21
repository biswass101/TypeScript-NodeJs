import { catchAsync } from "../../../utility/cathcAsync";
import sendResponse from "../../../utility/sendResponse";
import httpStatus from 'http-status'
import { UserServices } from "../../User/user.service";
import { deleteDoctor } from "../OperateDoctor/admin.controll.doctor";
import { deletePatient } from "../OperatePatients/admin.controll.patients";
import { deleteStaff } from "../OperateStuff/admin.controll.stuff";
import { Admin } from "./admin.model";
import { AdminServices } from "./admin.service";
import { Request, RequestHandler, Response } from "express";

//create
const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    req.body.role = "Admin";
    //saved to master collection
    const savedUser = await UserServices.createUserToDB(req);
    //saved to Patient collection
    const savedAdmin = await AdminServices.createAdminToDB(
      req,
      savedUser._id
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "One Admin Created Successfully",
      data: savedAdmin,
    });
  }
);

//read
const getAllAdmin:RequestHandler = catchAsync(
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

const getOneAdmin:RequestHandler = catchAsync(
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
const updateAdmin:RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const updatedAdmin = await AdminServices.updateAdminToDB(id, {
      address: req.body.address,
      contactInfo: req.body.contactInfo,
    });

    delete req.body.address;
    delete req.body.contactInfo;

    const findAdmin = await AdminServices.getOneAdminFromDB(id);
    await UserServices.updateOneUserToDB(
      findAdmin?.user._id.toString() as string,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "One Admin Updated Successfully",
      data: updatedAdmin,
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
    deleteStaff
};
  