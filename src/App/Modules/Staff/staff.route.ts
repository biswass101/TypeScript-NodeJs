import express from  'express'
import { StaffController } from './staff.controller';

const router = express.Router();

router.get('/', StaffController.getAllStaff);
router.post('/create-staff', StaffController.createStaff);
router.put('/update-staff/:id', StaffController.updateStaff);

export const StaffRouter = router;