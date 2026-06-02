import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { TaskService } from '../services/task.service';
import { CreateTaskDtoType, UpdateTaskDtoType, TaskFiltersDtoType } from '../dtos/task.dto';

/**
 * Task controller handling HTTP requests for task operations
 */
export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  /**
   * Create a new task
   */
  createTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const taskData: CreateTaskDtoType = req.body;
      
      // Validate task data
      const validation = this.taskService.validateTaskCreation(taskData);
      if (!validation.isValid) {
        res.status(400).json({
          error: 'Task validation failed',
          details: validation.errors,
        });
        return;
      }

      const task = await this.taskService.createTask(taskData, req.user.id);

      res.status(201).json({
        message: 'Task created successfully',
        task,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get all tasks with filters
   */
  getTasks = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters: TaskFiltersDtoType = req.query as any;
      const tasks = await this.taskService.getTasks(filters);

      res.json({ tasks });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get task by ID
   */
  getTaskById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
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

  /**
   * Update task
   */
  updateTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const { id } = req.params;
      const updateData: UpdateTaskDtoType = req.body;

      const task = await this.taskService.updateTask(id, updateData, req.user.id);

      res.json({
        message: 'Task updated successfully',
        task,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete task
   */
  deleteTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const { id } = req.params;
      await this.taskService.deleteTask(id, req.user.id);

      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get user dashboard data
   */
  getDashboard = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const dashboardData = await this.taskService.getUserDashboard(req.user.id);

      res.json(dashboardData);
    } catch (error) {
      next(error);
    }
  };
}