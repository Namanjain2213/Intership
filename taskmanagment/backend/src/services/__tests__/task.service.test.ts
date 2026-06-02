import { TaskService } from '../task.service';
import { Priority, Status } from '@prisma/client';
import { mockPrisma } from '../../test/setup';

describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(() => {
    taskService = new TaskService();
  });

  describe('validateTaskCreation', () => {
    it('should validate a valid task', () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test description',
        priority: Priority.MEDIUM,
      };

      const result = taskService.validateTaskCreation(taskData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject task with empty title', () => {
      const taskData = {
        title: '',
        description: 'Test description',
        priority: Priority.MEDIUM,
      };

      const result = taskService.validateTaskCreation(taskData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title is required');
    });

    it('should reject task with title too long', () => {
      const taskData = {
        title: 'a'.repeat(101), // 101 characters
        description: 'Test description',
        priority: Priority.MEDIUM,
      };

      const result = taskService.validateTaskCreation(taskData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title must be less than 100 characters');
    });

    it('should reject task with past due date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);

      const taskData = {
        title: 'Test Task',
        description: 'Test description',
        priority: Priority.MEDIUM,
        dueDate: pastDate.toISOString(),
      };

      const result = taskService.validateTaskCreation(taskData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Due date cannot be in the past');
    });

    it('should accept task with future due date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      const taskData = {
        title: 'Test Task',
        description: 'Test description',
        priority: Priority.MEDIUM,
        dueDate: futureDate.toISOString(),
      };

      const result = taskService.validateTaskCreation(taskData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('createTask', () => {
    it('should create a task successfully', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test description',
        priority: Priority.HIGH,
      };

      const mockTask = {
        id: 'task-1',
        title: 'Test Task',
        description: 'Test description',
        priority: Priority.HIGH,
        status: Status.TODO,
        creatorId: 'user-1',
        assignedToId: null,
        dueDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        creator: {
          id: 'user-1',
          name: 'Test User',
          email: 'test@example.com',
        },
        assignedTo: null,
      };

      mockPrisma.user.findUnique.mockResolvedValue({ id: 'user-1' });
      mockPrisma.task.create.mockResolvedValue(mockTask);

      const result = await taskService.createTask(taskData, 'user-1');

      expect(result).toEqual(mockTask);
      expect(mockPrisma.task.create).toHaveBeenCalledWith({
        data: {
          title: 'Test Task',
          description: 'Test description',
          priority: Priority.HIGH,
          creator: {
            connect: { id: 'user-1' },
          },
        },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    });

    it('should throw error when assigned user does not exist', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test description',
        priority: Priority.HIGH,
        assignedToId: 'non-existent-user',
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(taskService.createTask(taskData, 'user-1')).rejects.toThrow('Assigned user not found');
    });
  });
});