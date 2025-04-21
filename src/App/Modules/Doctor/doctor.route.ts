import express from  'express'
import { DoctorController } from './doctor.controller';
const router = express.Router();

router.get('/', DoctorController.getAllDoctor);
router.get('/:id', DoctorController.getOneDoctor);
router.post('/create-doctor', DoctorController.createDoctor);
router.put('/update-doctor/:id', DoctorController.updateDoctor);

export const DoctorRouter = router;