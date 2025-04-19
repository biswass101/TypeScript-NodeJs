import { Staff } from "../../Staff/staff.model";  
import { User } from "../../User/user.model";

const deleteStaffFromDB = async (id: string) => {
    const result = await Staff.findByIdAndDelete(id);
    return result;
}

const deleteStaffUserFromDB = async(id: string) => {
    const result = await User.findByIdAndUpdate(
        id,
        {
            isDeleted: true,
            status: 'blocked'
        },
        { new: true, runValidators: true } 
    )

    return result
}

export const adminCntrollStaffService = {
    deleteStaffFromDB,
    deleteStaffUserFromDB
}