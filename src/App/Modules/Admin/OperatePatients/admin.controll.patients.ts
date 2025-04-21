//Delete Doctor
import { Request, Response } from "express";
import { adminCntrollPatinetService } from "./admin.operate.patients.service";
import { catchAsync } from "../../../utility/cathcAsync";
import { PatientServices } from "../../Patients/patients.service";
import sendResponse from "../../../utility/sendResponse";
import httpStatus from 'http-status'

export const deletePatient = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const findOnePatient = await PatientServices.getOnePatientFromDB(id);
    const findPatientAndDelete =
      await adminCntrollPatinetService.deletePatientFromDB(id);

    await adminCntrollPatinetService.deletePatientUserFromDB(
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
