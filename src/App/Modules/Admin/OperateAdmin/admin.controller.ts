import { IUser } from "../../User/user.interface";
import { UserServices } from "../../User/user.service";
import { deleteDoctor } from "../OperateDoctor/admin.controll.doctor";
import { deletePatient } from "../OperatePatients/admin.controll.patients";
import { deleteStaff } from "../OperateStuff/admin.controll.stuff";
import { Admin } from "./admin.model";
import { AdminServices } from "./admin.service";
import { Request, Response } from "express";

//read
const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const result = await AdminServices.getAllAdminFromDB();
    if (!result.length) {
      res.status(404).json({
        success: "false",
        message: "Admins Not Found!",
      });
    } else {
      res.status(200).json({
        success: "true",
        message: "Admins Found!",
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
const createAdmin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password, image, contactInfo, address } = req.body;
    const isAdminExists = await AdminServices.getAdminByEmail(email);
    if (isAdminExists) {
      return res.status(400).json({
        success: false,
        message: "Admin Already Exists",
      });
    }

    const newUser: IUser = {
      name,
      email,
      password,
      image,
      role: "Admin",
      status: "in-progress",
      isDeleted: false,
      roleModel: "Admin",
    };

    const isUserExists = await UserServices.getUserByEmail(email);

    if (isUserExists) {
      return res.status(400).json({
        success: false,
        message: "Admin Already Exists",
      });
    }

    const savedUser = await UserServices.createUserToDB(newUser);

    if (!savedUser) {
      return res.status(400).json({
        success: false,
        message: "User Not saved!",
      });
    }

    const newAdmin = {
      user: savedUser._id,
      contactInfo,
      address,
    };
    const admin = await AdminServices.addAdminToDB(newAdmin);
    if (!admin) {
      res.status(400).json({
        success: false,
        message: "Admin info not saved!",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Admin info saved!",
        data: admin,
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
const updateAdmin = async(req: Request, res:Response): Promise<any> => {
  try {
    const {id} = req.params;
    const isAdminAvailable = await Admin.findById(id);
    if(!isAdminAvailable) {
      return res.status(404).json({
        success: false,
        message: "Admin Not Found!",
      });
    }

    const newUpdatedAdmin = await AdminServices.updateAdminToDB(id, req.body);
    if(!newUpdatedAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin Not Updated!",
      });
    }

    //todo: master user update
    // const newDoctorUserUpdate = await

    res.status(200).json({
      success: true,
      message: "Admin Updated!",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export const AdminController = {
    getAllAdmin,
    createAdmin,
    updateAdmin,
    deleteDoctor,
    deletePatient,
    deleteStaff
};
  