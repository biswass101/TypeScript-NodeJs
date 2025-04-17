export interface IUser {
    email: string
    password: string
    name: string
    image?: string
    role: "Admin" | "Doctor" | "Patients" | "Staff"
    status: 'in-progress' | 'blocked'
    isDeleted: boolean
}