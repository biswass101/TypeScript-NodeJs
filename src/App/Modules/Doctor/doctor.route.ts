import express from  'express'
import { DoctorController } from './doctor.controller';
import { validateRequest } from '../../utility/validateRequest';
import { DoctorValidations } from './doctor.validation';
import USER_ROLE from '../../constants/userRole';
import auth from '../../Middlewares/auth';
import { upload } from '../../utility/sendFileToCloudinary';
const router = express.Router();

router.get('/', DoctorController.getAllDoctor);
router.get('/:id', DoctorController.getOneDoctor);
router.post('/create-doctor',
        validateRequest(DoctorValidations.createDoctorValidationSchema),
     DoctorController.createDoctor);
router.patch('/update-doctor/:id', 
    validateRequest(DoctorValidations.createDoctorValidationSchema),
    DoctorController.updateDoctor);

router.post(
    '/upload-image',
    auth(USER_ROLE.doctor),
    upload.single('file'),
    DoctorController.uploadDoctorImage
)

export const DoctorRouter = router;