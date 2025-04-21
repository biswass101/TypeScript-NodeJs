import express from  'express'
import { PatientController } from './patients.controller';

const router = express.Router();

router.get('/', PatientController.getAllPatients);
router.get('/:id', PatientController.getOnePatient);
router.post('/create-patient', PatientController.createPatient);
router.put('/update-patient/:id', PatientController.updatePatient);

export const PatientRouter = router;