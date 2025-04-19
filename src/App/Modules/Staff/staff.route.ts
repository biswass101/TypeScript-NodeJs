import express from  'express'
import { StaffController } from './staff.controller';

const router = express.Router();

router.get('/', StaffController.getAllStaff);
router.post('/create-doctor', StaffController.createStaff);
router.put('/update-doctor/:id', StaffController.updateStaff);

export const StaffRouter = router;