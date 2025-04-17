import { Request, Response } from "express";
import { UserServices } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    console.log(result);
    if (!result.length) {
      res.status(404).json({
        success: "false",
        message: "Users Not Found!",
      });
    } else {
      res.status(200).json({
        success: "false",
        message: "Users Found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Internal Server Error!",
    });
  }
};


const createUser = async(req: Request, res: Response) => {
    try {
        const data = await UserServices.createUserToDB(req.body);
        if(!data) {
            res.json({
                success: false,
                message: "User Created",
                data
            })
        } else {
            res.json({
                success: true,
                mesage: "user Not Created!",
                data
            })
        }
    } catch (error) {
        
    }
}

export const UserController = {
  getAllUsers,
  createUser
};
