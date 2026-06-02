import { z } from 'zod';
import { Priority, Status } from '../models/Task';

export const CreateTaskDto = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  priority: z.nativeEnum(Priority).optional(),
  assignedToId: z.string().optional()
});

export const UpdateTaskDto = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters').optional(),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional().nullable(),
  priority: z.nativeEnum(Priority).optional(),
  status: z.nativeEnum(Status).optional(),
  assignedToId: z.string().optional().nullable()
});

export const TaskQueryDto = z.object({
  status: z.nativeEnum(Status).optional(),
  priority: z.nativeEnum(Priority).optional(),
  assignedToId: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'dueDate', 'priority']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
});

export type CreateTaskDtoType = z.infer<typeof CreateTaskDto>;
export type UpdateTaskDtoType = z.infer<typeof UpdateTaskDto>;
export type TaskQueryDtoType = z.infer<typeof TaskQueryDto>;