import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validateBody } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';
import { UpdateProfileDto } from '../dto/user.dto';

const router = Router();
const userController = new UserController();

// All user routes require authentication
router.use(authenticateToken);

router.get('/', userController.getAllUsers);
router.put('/profile', validateBody(UpdateProfileDto), userController.updateProfile);

export { router as userRoutes };