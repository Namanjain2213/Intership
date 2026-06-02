import { Request } from 'express';
import { User } from '@prisma/client';

/**
 * Extended Express Request interface with authenticated user
 */
export interface AuthenticatedRequest extends Request {
  user?: User;
}

/**
 * JWT Payload interface
 */
export interface JWTPayload {
  userId: string;
  email: string;
}

/**
 * Socket.io user interface
 */
export interface SocketUser {
  userId: string;
  email: string;
  name: string;
}

/**
 * Task filter and sort options
 */
export interface TaskFilters {
  status?: string;
  priority?: string;
  assignedToId?: string;
  creatorId?: string;
  sortBy?: 'dueDate' | 'createdAt' | 'priority';
  sortOrder?: 'asc' | 'desc';
}