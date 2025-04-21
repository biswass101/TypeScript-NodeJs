import { catchAsync } from "../../utility/cathcAsync";
import sendResponse from "../../utility/sendResponse";
import { UserServices } from "../User/user.service";
import { StaffServices } from "./staff.service";
import { Request, RequestHandler, Response } from "express";
import httpStatus from 'http-status';

//create
const createStaff:RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    req.body.role = "Staff"
    //saved to master collection
    const savedUser = await UserServices.createUserToDB(req);
    //saved to staff collection
    const savedStaff = await StaffServices.createStaffToDB(req, savedUser._id);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "One Staff Created Successfully",
      data: savedStaff
    })
  }
);

//read
const getAllStaff: RequestHandler = catchAsync(
  async(req: Request, res: Response) => {
    const result = await StaffServices.getAllStaffFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Staffs retrieved Successfully",
      data: result
    })
})

const getOneStaff: RequestHandler = catchAsync(
  async(req: Request, res: Response) => {
    const {id} = req.params
    const result = await StaffServices.getOneStaffFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "One Staff retrieved Successfully",
      data: result
    })
  }
)


//Update
const updateStaff:RequestHandler = catchAsync(
  async(req: Request, res:Response): Promise<any> => {
    const {id} = req.params;
    const updatedStaff = await StaffServices.updateStaffToDB(
      id, 
      {contactInfo: req.body.contactInfo}
    )
    if(req.body.contactInfo) delete req.body.contactInfo;
    const findStaff = await StaffServices.getOneStaffFromDB(id);
    await UserServices.updateOneUserToDB(findStaff?.user._id.toString() as string, req.body)
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "One Staff Updated Successfully",
      data: updatedStaff
    })
}
)

export const StaffController = {
  createStaff,
  getAllStaff,
  getOneStaff,
  updateStaff
};
