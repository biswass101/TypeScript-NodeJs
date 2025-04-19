import { Doctor } from "../../Doctor/doctor.model"
import { User } from "../../User/user.model";

const deleteDoctorFromDB = async (id: string) => {
    const result = await Doctor.findByIdAndDelete(id);
    return result;
}

const deleteDoctorUserFromDB = async(id: string) => {
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

export const adminCntrollDoctorService = {
    deleteDoctorFromDB,
    deleteDoctorUserFromDB
}