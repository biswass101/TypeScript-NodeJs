import { Patients } from "../../Patients/patients.model"; 
import { User } from "../../User/user.model";

const deletePatientFromDB = async (id: string) => {
    const result = await Patients.findByIdAndDelete(id);
    return result;
}

const deletePatientUserFromDB = async(id: string) => {
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

export const adminCntrollPatinetService = {
    deletePatientFromDB,
    deletePatientUserFromDB
}