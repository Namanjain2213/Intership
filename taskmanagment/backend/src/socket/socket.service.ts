import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { verifyAccessToken } from '../utils/jwt';
import { SocketUser } from '../types';
import { prisma } from '../config/database';

/**
 * Socket.io service for real-time communication
 */
export class SocketService {
  private io: SocketIOServer;
  private connectedUsers: Map<string, SocketUser> = new Map();

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    this.setupSocketHandlers();
  }

  /**
   * Setup Socket.io event handlers
   */
  private setupSocketHandlers(): void {
    this.io.use(async (socket, next) => {
      try {
        // Get token from handshake auth or query
        const token = socket.handshake.auth.token || socket.handshake.query.token;
        
        if (!token) {
          return next(new Error('Authentication token required'));
        }

        // Verify token
        const payload = verifyAccessToken(token as string);
        
        // Get user from database
        const user = await prisma.user.findUnique({
          where: { id: payload.userId },
          select: {
            id: true,
            email: true,
            name: true,
          },
        });

        if (!user) {
          return next(new Error('User not found'));
        }

        // Attach user to socket
        socket.data.user = user;
        next();
      } catch (error) {
        next(new Error('Invalid token'));
      }
    });

    this.io.on('connection', (socket) => {
      const user: SocketUser = socket.data.user;
      console.log(`User ${user.name} connected (${socket.id})`);

      // Store connected user
      this.connectedUsers.set(socket.id, user);

      // Join user to their personal room
      socket.join(`user:${user.userId}`);

      // Join general tasks room for real-time updates
      socket.join('tasks');

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`User ${user.name} disconnected (${socket.id})`);
        this.connectedUsers.delete(socket.id);
      });

      // Handle task updates
      socket.on('task:update', (data) => {
        // Broadcast task update to all users in tasks room
        socket.to('tasks').emit('task:updated', data);
      });

      // Handle task creation
      socket.on('task:create', (data) => {
        // Broadcast new task to all users in tasks room
        socket.to('tasks').emit('task:created', data);
      });

      // Handle task deletion
      socket.on('task:delete', (data) => {
        // Broadcast task deletion to all users in tasks room
        socket.to('tasks').emit('task:deleted', data);
      });
    });
  }

  /**
   * Emit task created event
   */
  emitTaskCreated(task: any): void {
    this.io.to('tasks').emit('task:created', task);
  }

  /**
   * Emit task updated event
   */
  emitTaskUpdated(task: any, previousTask?: any): void {
    this.io.to('tasks').emit('task:updated', { task, previousTask });

    // Send notification to newly assigned user
    if (task.assignedToId && task.assignedToId !== previousTask?.assignedToId) {
      this.sendAssignmentNotification(task.assignedToId, task);
    }
  }

  /**
   * Emit task deleted event
   */
  emitTaskDeleted(taskId: string): void {
    this.io.to('tasks').emit('task:deleted', { taskId });
  }

  /**
   * Send assignment notification to user
   */
  sendAssignmentNotification(userId: string, task: any): void {
    this.io.to(`user:${userId}`).emit('notification:assignment', {
      type: 'task_assigned',
      message: `You have been assigned to task: ${task.title}`,
      task,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Send notification to specific user
   */
  sendNotificationToUser(userId: string, notification: any): void {
    this.io.to(`user:${userId}`).emit('notification', notification);
  }

  /**
   * Get connected users count
   */
  getConnectedUsersCount(): number {
    return this.connectedUsers.size;
  }

  /**
   * Get connected users
   */
  getConnectedUsers(): SocketUser[] {
    return Array.from(this.connectedUsers.values());
  }

  /**
   * Check if user is connected
   */
  isUserConnected(userId: string): boolean {
    return Array.from(this.connectedUsers.values()).some(user => user.userId === userId);
  }
}