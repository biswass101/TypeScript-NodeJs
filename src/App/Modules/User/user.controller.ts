import { Request, Response } from "express";
import { UserServices } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    if (!result.length) {
      res.status(404).json({
        success: "false",
        message: "Users Not Found!",
      });
    } else {
      res.status(200).json({
        success: "true",
        message: "Users Found!",
        data: result
      });
    }
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Internal Server Error!",
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    //checking section
    const { email } = req.body;
    const isUserExists = await UserServices.getUserByEmail(email);
    if (isUserExists) {
      res.status(404).json({
        success: false,
        message: "User Alredy Exists!",
      });
    } else {
      //user creating 
      const data = await UserServices.createUserToDB(req.body);
      if (!data) {
        res.status(400).json({
          success: false,
          message: "User Not Created",
        });
      } else {
        res.status(201).json({
          success: true,
          mesage: "user  Created successfully!",
          data,
        });
      }
    }
    //creating secting
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const UserController = {
  getAllUsers,
  createUser,
};
