import express from  'express'
import { PatientController } from './patients.controller';

const router = express.Router();

router.get('/', PatientController.getAllPatients);
router.post('/create-patient', PatientController.createPatient);
router.put('/update-patient/:id', PatientController.updatePatients);

export const PatientRouter = router;