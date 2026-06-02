import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateBody } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';
import { RegisterDto, LoginDto } from '../dto/auth.dto';

const router = Router();
const authController = new AuthController();

router.post('/register', validateBody(RegisterDto), authController.register);
router.post('/login', validateBody(LoginDto), authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticateToken, authController.me);

export { router as authRoutes };