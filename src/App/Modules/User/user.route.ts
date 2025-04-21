import express from  'express'
import { UserController } from './user.controller';
const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getOneUser);
router.post('/create-user', UserController.createUser);
router.patch('/update-user/:id', UserController.updatOneUser);

export const UserRouter = router;