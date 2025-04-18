import {Request , Response } from "express";

const createDoctor = async (req: Request, res: Response) => {
  try {

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};


export const DoctorController = {
    createDoctor
}
