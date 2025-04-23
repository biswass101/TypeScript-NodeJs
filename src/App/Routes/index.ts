import { Router } from "express";
import { UserRouter } from "../Modules/User/user.route";
import { DoctorRouter } from "../Modules/Doctor/doctor.route";
import { PatientRouter } from "../Modules/Patients/patients.route";
import { StaffRouter } from "../Modules/Staff/staff.route";
import { AdminRouter } from "../Modules/Admin/admin.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRouter
    },
    {
        path: '/doctors',
        route: DoctorRouter
    },
    {
        path: '/patients',
        route: PatientRouter
    },
    {
        path: '/staffs',
        route: StaffRouter
    },
    {
        path: '/admin',
        route: AdminRouter
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;