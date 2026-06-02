import { TaskRepository, TaskFilters, TaskSortOptions } from '../repositories/TaskRepository';
import { UserRepository } from '../repositories/UserRepository';
import { CreateTaskDtoType, UpdateTaskDtoType, TaskQueryDtoType } from '../dto/task.dto';
import { ITask } from '../models/Task';

export class TaskService {
  private taskRepository: TaskRepository;
  private userRepository: UserRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
    this.userRepository = new UserRepository();
  }

  async createTask(taskData: CreateTaskDtoType, creatorId: string): Promise<ITask> {
    // Validate assignee if provided
    if (taskData.assignedToId) {
      const assignee = await this.userRepository.findById(taskData.assignedToId);
      if (!assignee) {
        throw new Error('Assigned user not found');
      }
    }

    const task = await this.taskRepository.create({
      ...taskData,
      creatorId,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined
    });

    return task;
  }

  async getTasks(query: TaskQueryDtoType): Promise<ITask[]> {
    const filters: TaskFilters = {
      status: query.status,
      priority: query.priority,
      assignedToId: query.assignedToId,
      search: query.search
    };

    const sortOptions: TaskSortOptions = {
      sortBy: query.sortBy,
      sortOrder: query.sortOrder
    };

    return await this.taskRepository.findAll(filters, sortOptions);
  }

  async getTaskById(taskId: string): Promise<ITask | null> {
    return await this.taskRepository.findById(taskId);
  }

  async updateTask(taskId: string, taskData: UpdateTaskDtoType, userId: string): Promise<ITask> {
    const existingTask = await this.taskRepository.findById(taskId);
    if (!existingTask) {
      throw new Error('Task not found');
    }

    // Check if user has permission to update (creator or assignee)
    if (existingTask.creatorId !== userId && existingTask.assignedToId !== userId) {
      throw new Error('You do not have permission to update this task');
    }

    // Validate assignee if provided
    if (taskData.assignedToId) {
      const assignee = await this.userRepository.findById(taskData.assignedToId);
      if (!assignee) {
        throw new Error('Assigned user not found');
      }
    }

    const updatedTask = await this.taskRepository.update(taskId, {
      ...taskData,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : taskData.dueDate
    });

    if (!updatedTask) {
      throw new Error('Failed to update task');
    }

    return updatedTask;
  }

  async deleteTask(taskId: string, userId: string): Promise<void> {
    const existingTask = await this.taskRepository.findById(taskId);
    if (!existingTask) {
      throw new Error('Task not found');
    }

    // Only creator can delete task
    if (existingTask.creatorId !== userId) {
      throw new Error('You do not have permission to delete this task');
    }

    const deleted = await this.taskRepository.delete(taskId);
    if (!deleted) {
      throw new Error('Failed to delete task');
    }
  }

  async getUserTasks(userId: string): Promise<ITask[]> {
    return await this.taskRepository.findByUserId(userId);
  }
}