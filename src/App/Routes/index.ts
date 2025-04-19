import { Router } from "express";
import { UserRouter } from "../Modules/User/user.route";
import { DoctorRouter } from "../Modules/Doctor/doctor.route";
import { PatientRouter } from "../Modules/Patients/patients.route";
import { StaffRouter } from "../Modules/Staff/staff.route";

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
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;