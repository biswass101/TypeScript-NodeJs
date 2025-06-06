import express from  'express'
import { StaffController } from './staff.controller';
import { validateRequest } from '../../utility/validateRequest';
import { StaffValidations } from './staff.validation';

const router = express.Router();

router.get('/', StaffController.getAllStaff);
router.get('/:id', StaffController.getOneStaff);
router.post('/create-staff', 
        validateRequest(StaffValidations    .createStaffValidationSchema),
    StaffController.createStaff);
router.patch('/update-staff/:id',
     validateRequest(StaffValidations.createStaffValidationSchema), 
    StaffController.updateStaff);

export const StaffRouter = router;