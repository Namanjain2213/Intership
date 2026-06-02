import { z } from 'zod';
import { Priority, Status } from '@prisma/client';

/**
 * Create task DTO schema
 */
export const CreateTaskDto = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  priority: z.nativeEnum(Priority).default(Priority.MEDIUM),
  assignedToId: z.string().optional(),
});

/**
 * Update task DTO schema
 */
export const UpdateTaskDto = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters').optional(),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional().nullable(),
  priority: z.nativeEnum(Priority).optional(),
  status: z.nativeEnum(Status).optional(),
  assignedToId: z.string().optional().nullable(),
});

/**
 * Task query filters DTO schema
 */
export const TaskFiltersDto = z.object({
  status: z.nativeEnum(Status).optional(),
  priority: z.nativeEnum(Priority).optional(),
  assignedToId: z.string().optional(),
  creatorId: z.string().optional(),
  sortBy: z.enum(['dueDate', 'createdAt', 'priority']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type CreateTaskDtoType = z.infer<typeof CreateTaskDto>;
export type UpdateTaskDtoType = z.infer<typeof UpdateTaskDto>;
export type TaskFiltersDtoType = z.infer<typeof TaskFiltersDto>;