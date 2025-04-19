//Delete Doctor
import { Request, Response } from "express"
import { adminCntrollPatinetService } from "./admin.operate.patients.service";

export const deletePatient = async (req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;
        const findPatientAndDelete = await adminCntrollPatinetService.deletePatientFromDB(id);
        if(!findPatientAndDelete) {
            return res.status(400).json({
                success: false,
                message: "Patient Not Deleted"
            })
        }

        // console.log(findPatientAndDelete.user._id.toString());
        const findPatientUserDelete = await adminCntrollPatinetService.deletePatientUserFromDB(findPatientAndDelete.user._id.toString());
        if(!findPatientUserDelete) {
            return res.status(400).json({
                success: false,
                message: "Patient user Not Deleted"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Patient Deleted"
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            err: error
        })
    }
} 