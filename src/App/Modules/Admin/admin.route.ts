import express from  'express'
import { AdminController } from './admin.controller';

const router = express.Router();

router.get('/', AdminController.getAllAdmin);
router.get('/:id', AdminController.getOneAdmin);
router.post('/create-admin', AdminController.createAdmin);
router.put('/update-admin/:id', AdminController.updateAdmin);
router.delete('/delete-doctor/:id', AdminController.deleteDoctor);
router.delete('/delete-patient/:id', AdminController.deletePatient);
router.delete('/delete-staff/:id', AdminController.deleteStaff);

export const AdminRouter = router;