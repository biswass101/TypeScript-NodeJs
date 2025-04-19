//Delete Doctor
import { Request, Response } from "express";
import { adminCntrollDoctorService } from "./admin.operate.doctor.services";
import { User } from "../../User/user.model";

export const deleteDoctor = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const findDoctorAndDelete =
      await adminCntrollDoctorService.deleteDoctorFromDB(id);
    if (!findDoctorAndDelete) {
      return res.status(400).json({
        success: false,
        message: "Doctor Not Deleted",
      });
    }

    const findDoctorUserDelete =
      await adminCntrollDoctorService.deleteDoctorUserFromDB(
        findDoctorAndDelete.user._id.toString()
      );
    if (!findDoctorUserDelete) {
      return res.status(400).json({
        success: false,
        message: "Doctor user Not Deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      err: error,
    });
  }
};
