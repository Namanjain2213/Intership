import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { validateBody, validateQuery } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';
import { CreateTaskDto, UpdateTaskDto, TaskQueryDto } from '../dto/task.dto';

const router = Router();
const taskController = new TaskController();

// All task routes require authentication
router.use(authenticateToken);

router.get('/', validateQuery(TaskQueryDto), taskController.getTasks);
router.post('/', validateBody(CreateTaskDto), taskController.createTask);
router.get('/my-tasks', taskController.getUserTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', validateBody(UpdateTaskDto), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export { router as taskRoutes };