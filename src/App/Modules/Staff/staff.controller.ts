import { IUser } from "../User/user.interface";
import { UserServices } from "../User/user.service";
import { Staff } from "./staff.model";
import { StaffServices } from "./staff.service";
import { Request, Response } from "express";

//read
const getAllStaff = async (req: Request, res: Response) => {
  try {
    const result = await StaffServices.getAllStaffFromDB();
    if (!result.length) {
      res.status(404).json({
        success: "false",
        message: "Staffs Not Found!",
      });
    } else {
      res.status(200).json({
        success: "true",
        message: "Staffs Found!",
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
const createStaff = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password, image, careDate, contactInfo } = req.body;
    const isStaffExists = await StaffServices.getStaffByEmail(email);
    if (isStaffExists) {
      return res.status(400).json({
        success: false,
        message: "Staff Already Exists",
      });
    }

    const newUser: IUser = {
      name,
      email,
      password,
      image,
      role: "Staff",
      status: "in-progress",
      isDeleted: false,
      roleModel: "Staff",
    };

    const isUserExists = await UserServices.getUserByEmail(email);

    if (isUserExists) {
      return res.status(400).json({
        success: false,
        message: "Staff Already Exists",
      });
    }

    const savedUser = await UserServices.createUserToDB(newUser);

    if (!savedUser) {
      return res.status(400).json({
        success: false,
        message: "User Not saved!",
      });
    }

    const newStaff = {
      user: savedUser._id,
      careDate,
      contactInfo,
    };
    const staff = await StaffServices.addStaffToDB(newStaff);
    if (!staff) {
      res.status(400).json({
        success: false,
        message: "Staff info not saved!",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Staff info saved!",
        data: staff,
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
const updateStaff = async(req: Request, res:Response): Promise<any> => {
  try {
    const {id} = req.params;
    const isStaffAvailable = await Staff.findById(id);
    if(!isStaffAvailable) {
      return res.status(404).json({
        success: false,
        message: "Staff Not Found!",
      });
    }

    const newUpdatedStaff = await StaffServices.updateStaffToDB(id, req.body);
    if(!newUpdatedStaff) {
      return res.status(400).json({
        success: false,
        message: "Staff Not Updated!",
      });
    }

    //todo: master user update
    // const newDoctorUserUpdate = await

    res.status(200).json({
      success: true,
      message: "Staff Updated!",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export const StaffController = {
  getAllStaff,
  createStaff,
  updateStaff
};
