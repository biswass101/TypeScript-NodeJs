import { Request, Response } from "express";
import { Patients } from "./patients.model";
import { IUser } from "../User/user.interface";
import { PatientServices } from "./patients.service";
import { UserServices } from "../User/user.service";


//read
const getAllPatients = async (req: Request, res: Response) => {
  try {
    const result = await PatientServices.getAllPatientFromDB();
    if (!result.length) {
      res.status(404).json({
        success: "false",
        message: "Patients Not Found!",
      });
    } else {
      res.status(200).json({
        success: "true",
        message: "Patients Found!",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Internal Server Error!",
    });
  }
};

//create
const createPatient = async (req: Request, res: Response): Promise<any> => {
  try {
    const {name, email, password,
      image,
      age,
      gender,
      contactInfo,
      address} = req.body;
    const isPatientExists = await PatientServices.getPatientByEmail(email);
    if(isPatientExists) {
      return res.status(400).json({
        success: false,
        message: "Patient Already Exists",
      })
    }
    
    const newUser: IUser = {
      name, email, password, image, role: "Patients", status: "in-progress", isDeleted: false, roleModel: "Patient"
    }

    const isUserExists = await UserServices.getUserByEmail(email);

    if(isUserExists) {
      return res.status(400).json({
        success: false,
        message: "Patient Already Exists",
      })
    }

    const savedUser = await UserServices.createUserToDB(newUser);
   
    if(!savedUser) {
      return res.status(400).json({
        success: false,
        message: "User Not saved!",
      })
    }

    const newPatient = {
      user: savedUser._id,
      age,
      gender,
      contactInfo,
      address
    }
    const patient = await PatientServices.addPatientToDB(newPatient);
    if (!patient) {
      res.status(400).json({
        success: false,
        message: "Patient info not saved!",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Patient info saved!",
        data: patient,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//Update
const updatePatients = async(req: Request, res:Response): Promise<any> => {
  try {
    const {id} = req.params;
    const isPatientAvailable = await Patients.findById(id);
    if(!isPatientAvailable) {
      return res.status(404).json({
        success: false,
        message: "Patient Not Found!",
      });
    }

    const newUpdatedPatient = await PatientServices.updatePatientToDB(id, req.body);
    if(!newUpdatedPatient) {
      return res.status(400).json({
        success: false,
        message: "Patient Not Updated!",
      });
    }

    //todo: master user update
    // const newPatientUserUpdate = await

    res.status(200).json({
      success: true,
      message: "Patient Updated!",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export const PatientController = {
  getAllPatients,
  createPatient,
  updatePatients
};
