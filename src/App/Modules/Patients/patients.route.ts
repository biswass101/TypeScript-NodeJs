import express from  'express'
import { PatientController } from './patients.controller';
import { validateRequest } from '../../utility/validateRequest';
import { PatientValidations } from './patient.validation';

const router = express.Router();

router.get('/', PatientController.getAllPatients);
router.get('/:id', PatientController.getOnePatient);
router.post('/create-patient', 
    validateRequest(PatientValidations.createPatientValidationSchema),
    PatientController.createPatient);
router.patch('/update-patient/:id', 
    validateRequest(PatientValidations.createPatientValidationSchema),
    PatientController.updatePatient);

export const PatientRouter = router;