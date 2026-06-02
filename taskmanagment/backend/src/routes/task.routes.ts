import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { validateBody, validateQuery } from '../middleware/validation.middleware';
import { CreateTaskDto, UpdateTaskDto, TaskFiltersDto } from '../dtos/task.dto';

const router = Router();
const taskController = new TaskController();

// All task routes require authentication
router.use(authenticateToken);

/**
 * @route GET /api/tasks
 * @desc Get all tasks with filters
 * @access Private
 */
router.get('/', validateQuery(TaskFiltersDto), taskController.getTasks);

/**
 * @route POST /api/tasks
 * @desc Create a new task
 * @access Private
 */
router.post('/', validateBody(CreateTaskDto), taskController.createTask);

/**
 * @route GET /api/tasks/dashboard
 * @desc Get user dashboard data
 * @access Private
 */
router.get('/dashboard', taskController.getDashboard);

/**
 * @route GET /api/tasks/:id
 * @desc Get task by ID
 * @access Private
 */
router.get('/:id', taskController.getTaskById);

/**
 * @route PUT /api/tasks/:id
 * @desc Update task
 * @access Private
 */
router.put('/:id', validateBody(UpdateTaskDto), taskController.updateTask);

/**
 * @route DELETE /api/tasks/:id
 * @desc Delete task
 * @access Private
 */
router.delete('/:id', taskController.deleteTask);

export default router;