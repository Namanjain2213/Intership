import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/TaskService';
import { CreateTaskDtoType, UpdateTaskDtoType, TaskQueryDtoType } from '../dto/task.dto';
import { AuthenticatedRequest } from '../middleware/auth';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  createTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskData: CreateTaskDtoType = req.body;
      const task = await this.taskService.createTask(taskData, req.userId!);

      res.status(201).json({
        message: 'Task created successfully',
        task
      });
    } catch (error) {
      next(error);
    }
  };

  getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: TaskQueryDtoType = req.query as any;
      const tasks = await this.taskService.getTasks(query);

      res.json({ tasks });
    } catch (error) {
      next(error);
    }
  };

  getTaskById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const task = await this.taskService.getTaskById(id);

      if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }

      res.json({ task });
    } catch (error) {
      next(error);
    }
  };

  updateTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const taskData: UpdateTaskDtoType = req.body;
      const task = await this.taskService.updateTask(id, taskData, req.userId!);

      res.json({
        message: 'Task updated successfully',
        task
      });
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.taskService.deleteTask(id, req.userId!);

      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  getUserTasks = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tasks = await this.taskService.getUserTasks(req.userId!);
      res.json({ tasks });
    } catch (error) {
      next(error);
    }
  };
}