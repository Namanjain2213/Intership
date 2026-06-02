import { Task } from '@prisma/client';
import { TaskRepository } from '../repositories/task.repository';
import { UserRepository } from '../repositories/user.repository';
import { CreateTaskDtoType, UpdateTaskDtoType, TaskFiltersDtoType } from '../dtos/task.dto';

/**
 * Task service handling business logic for task operations
 */
export class TaskService {
  private taskRepository: TaskRepository;
  private userRepository: UserRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
    this.userRepository = new UserRepository();
  }

  /**
   * Create a new task
   * @param taskData - Task creation data
   * @param creatorId - ID of the user creating the task
   * @returns Created task
   */
  async createTask(taskData: CreateTaskDtoType, creatorId: string): Promise<Task> {
    const { title, description, dueDate, priority, assignedToId } = taskData;

    // Validate assignee exists if provided
    if (assignedToId) {
      const assigneeExists = await this.userRepository.exists(assignedToId);
      if (!assigneeExists) {
        throw new Error('Assigned user not found');
      }
    }

    // Create task
    const task = await this.taskRepository.create({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority,
      creator: {
        connect: { id: creatorId },
      },
      ...(assignedToId && {
        assignedTo: {
          connect: { id: assignedToId },
        },
      }),
    });

    return task;
  }

  /**
   * Get all tasks with filters
   * @param filters - Task filters and sorting options
   * @returns Filtered and sorted tasks
   */
  async getTasks(filters: TaskFiltersDtoType): Promise<Task[]> {
    return this.taskRepository.findMany(filters);
  }

  /**
   * Get task by ID
   * @param taskId - Task ID
   * @returns Task or null if not found
   */
  async getTaskById(taskId: string): Promise<Task | null> {
    return this.taskRepository.findById(taskId);
  }

  /**
   * Update task
   * @param taskId - Task ID
   * @param updateData - Task update data
   * @param userId - ID of the user updating the task
   * @returns Updated task
   */
  async updateTask(
    taskId: string,
    updateData: UpdateTaskDtoType,
    userId: string
  ): Promise<Task> {
    // Check if task exists
    const existingTask = await this.taskRepository.findById(taskId);
    if (!existingTask) {
      throw new Error('Task not found');
    }

    // Validate assignee exists if being updated
    if (updateData.assignedToId !== undefined && updateData.assignedToId !== null) {
      const assigneeExists = await this.userRepository.exists(updateData.assignedToId);
      if (!assigneeExists) {
        throw new Error('Assigned user not found');
      }
    }

    // Prepare update data
    const updatePayload: any = {
      ...updateData,
    };

    // Handle dueDate conversion
    if (updateData.dueDate !== undefined) {
      updatePayload.dueDate = updateData.dueDate ? new Date(updateData.dueDate) : null;
    }

    // Handle assignee update
    if (updateData.assignedToId !== undefined) {
      if (updateData.assignedToId === null) {
        updatePayload.assignedTo = { disconnect: true };
      } else {
        updatePayload.assignedTo = { connect: { id: updateData.assignedToId } };
      }
      delete updatePayload.assignedToId;
    }

    return this.taskRepository.update(taskId, updatePayload);
  }

  /**
   * Delete task
   * @param taskId - Task ID
   * @param userId - ID of the user deleting the task
   * @returns Deleted task
   */
  async deleteTask(taskId: string, userId: string): Promise<Task> {
    // Check if task exists
    const existingTask = await this.taskRepository.findById(taskId);
    if (!existingTask) {
      throw new Error('Task not found');
    }

    // Only creator can delete the task
    if (existingTask.creatorId !== userId) {
      throw new Error('Only the task creator can delete this task');
    }

    return this.taskRepository.delete(taskId);
  }

  /**
   * Get user dashboard data
   * @param userId - User ID
   * @returns Dashboard data with assigned, created, and overdue tasks
   */
  async getUserDashboard(userId: string): Promise<{
    assignedTasks: Task[];
    createdTasks: Task[];
    overdueTasks: Task[];
  }> {
    const [assignedTasks, createdTasks, allOverdueTasks] = await Promise.all([
      this.taskRepository.findByAssignee(userId),
      this.taskRepository.findByCreator(userId),
      this.taskRepository.findOverdue(),
    ]);

    // Filter overdue tasks to only include those assigned to or created by the user
    const overdueTasks = allOverdueTasks.filter(
      task => task.assignedToId === userId || task.creatorId === userId
    );

    return {
      assignedTasks,
      createdTasks,
      overdueTasks,
    };
  }

  /**
   * Validate task creation data
   * @param taskData - Task data to validate
   * @returns Validation result
   */
  validateTaskCreation(taskData: CreateTaskDtoType): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Title validation
    if (!taskData.title || taskData.title.trim().length === 0) {
      errors.push('Title is required');
    } else if (taskData.title.length > 100) {
      errors.push('Title must be less than 100 characters');
    }

    // Due date validation
    if (taskData.dueDate) {
      const dueDate = new Date(taskData.dueDate);
      if (isNaN(dueDate.getTime())) {
        errors.push('Invalid due date format');
      } else if (dueDate < new Date()) {
        errors.push('Due date cannot be in the past');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}