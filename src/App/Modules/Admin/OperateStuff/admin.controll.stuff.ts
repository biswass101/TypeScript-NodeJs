//Delete Doctor
import { Request, Response } from "express"
import { adminCntrollStaffService } from "./admin.operate.stuff.services"; 
import { catchAsync } from "../../../utility/cathcAsync";
import httpStatus from 'http-status'
import { StaffServices } from "../../Staff/staff.service";
import sendResponse from "../../../utility/sendResponse";

export const deleteStaff = catchAsync(
    async (req: Request, res: Response): Promise<any> => {
      const { id } = req.params;
      const findOneStaff = await StaffServices.getOneStaffFromDB(id);
      const findStaffAndDelete =
        await adminCntrollStaffService.deleteStaffFromDB(id);
  
      await adminCntrollStaffService.deleteStaffUserFromDB(
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