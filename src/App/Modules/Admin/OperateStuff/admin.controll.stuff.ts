//Delete Doctor
import { Request, Response } from "express"
import { adminCntrollStaffService } from "./admin.operate.stuff.services"; 

export const deleteStaff = async (req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;
        const findStaffAndDelete = await adminCntrollStaffService.deleteStaffFromDB(id);
        if(!findStaffAndDelete) {
            return res.status(400).json({
                success: false,
                message: "Staff Not Deleted"
            })
        }

        const findStaffUserDelete = await adminCntrollStaffService.deleteStaffUserFromDB(findStaffAndDelete.user._id.toString());
        if(!findStaffUserDelete) {
            return res.status(400).json({
                success: false,
                message: "Staff user Not Deleted"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Staff Deleted"
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            err: error
        })
    }
} 