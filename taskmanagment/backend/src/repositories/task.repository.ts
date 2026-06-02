import { Task, Prisma, Priority, Status } from '@prisma/client';
import { prisma } from '../config/database';
import { TaskFilters } from '../types';

/**
 * Task repository for database operations
 */
export class TaskRepository {
  /**
   * Create a new task
   */
  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return prisma.task.create({
      data,
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
  }

  /**
   * Find all tasks with filters and sorting
   */
  async findMany(filters: TaskFilters = {}): Promise<Task[]> {
    const {
      status,
      priority,
      assignedToId,
      creatorId,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filters;

    const where: Prisma.TaskWhereInput = {};

    if (status) where.status = status as Status;
    if (priority) where.priority = priority as Priority;
    if (assignedToId) where.assignedToId = assignedToId;
    if (creatorId) where.creatorId = creatorId;

    return prisma.task.findMany({
      where,
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
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
  }

  /**
   * Find task by ID
   */
  async findById(id: string): Promise<Task | null> {
    return prisma.task.findUnique({
      where: { id },
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
  }

  /**
   * Update task
   */
  async update(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data,
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
  }

  /**
   * Delete task
   */
  async delete(id: string): Promise<Task> {
    return prisma.task.delete({
      where: { id },
    });
  }

  /**
   * Get tasks assigned to user
   */
  async findByAssignee(userId: string): Promise<Task[]> {
    return prisma.task.findMany({
      where: { assignedToId: userId },
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
      orderBy: {
        dueDate: 'asc',
      },
    });
  }

  /**
   * Get tasks created by user
   */
  async findByCreator(userId: string): Promise<Task[]> {
    return prisma.task.findMany({
      where: { creatorId: userId },
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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Get overdue tasks
   */
  async findOverdue(): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
        dueDate: {
          lt: new Date(),
        },
        status: {
          not: Status.COMPLETED,
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
      orderBy: {
        dueDate: 'asc',
      },
    });
  }

  /**
   * Check if task exists
   */
  async exists(id: string): Promise<boolean> {
    const task = await prisma.task.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!task;
  }
}