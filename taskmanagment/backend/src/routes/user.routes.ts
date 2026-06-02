import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
const authController = new AuthController();

// All user routes require authentication
router.use(authenticateToken);

/**
 * @route GET /api/users
 * @desc Get all users (for task assignment)
 * @access Private
 */
router.get('/', authController.getAllUsers);

export default router;