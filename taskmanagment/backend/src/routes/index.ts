import { Router } from 'express';
import { authRoutes } from './auth';
import { taskRoutes } from './tasks';
import { userRoutes } from './users';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);

export { router as apiRoutes };