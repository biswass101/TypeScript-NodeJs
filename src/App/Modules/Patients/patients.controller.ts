import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { PatientServices } from "./patients.service";
import sendResponse from "../../utility/sendResponse";
import { catchAsync } from "../../utility/cathcAsync";

//create
const createPatient: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const savedPatient = await PatientServices.createPatientToDB(
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "One Patient Created Successfully",
      data: savedPatient,
    });
  }
);

//read
const getAllPatients: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PatientServices.getAllPatientFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Patients retrieved Successfully",
      data: result,
    });
  }
);

const getOnePatient: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PatientServices.getOnePatientFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "One patient retrieved Successfully",
      data: result,
    });
  }
);

//update
const updatePatient: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const updatedPatient = await PatientServices.updatePatientToDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "One Patient Updated Successfully",
      data: updatedPatient,
    });
  }
);

export const PatientController = {
  createPatient,
  getAllPatients,
  getOnePatient,
  updatePatient,
};
