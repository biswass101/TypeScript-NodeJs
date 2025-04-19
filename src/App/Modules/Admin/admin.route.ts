import express from  'express'
import { AdminController } from './admin.controller';

const router = express.Router();

router.get('/', AdminController.getAllAdmin);
router.post('/create-admin', AdminController.createAdmin);
router.put('/update-admin/:id', AdminController.updateAdmin);

export const AdminRouter = router;