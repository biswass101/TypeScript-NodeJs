//Delete Doctor
import { Request, RequestHandler, Response } from "express";
import { adminCntrollDoctorService } from "./admin.operate.doctor.services";
import { DoctorServices } from "../../Doctor/doctor.service";
import sendResponse from "../../../utility/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../../utility/cathcAsync";

export const deleteDoctor: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const findOneDoctor = await DoctorServices.getOneDoctorFromDB(id);
    const findDoctorAndDelete =
      await adminCntrollDoctorService.deleteDoctorFromDB(id);

    await adminCntrollDoctorService.deleteDoctorUserFromDB(
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
