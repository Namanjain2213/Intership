import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { AuthService } from '../services/AuthService';

export interface AuthenticatedSocket {
  userId: string;
  join: (room: string) => void;
  leave: (room: string) => void;
  emit: (event: string, data: any) => void;
  broadcast: {
    emit: (event: string, data: any) => void;
  };
}

export class SocketHandler {
  private io: SocketIOServer;
  private authService: AuthService;

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true
      }
    });
    this.authService = new AuthService();
    this.setupSocketHandlers();
  }

  private setupSocketHandlers(): void {
    this.io.use(async (socket: any, next) => {
      try {
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
          return next(new Error('Authentication error'));
        }

        const decoded = this.authService.verifyToken(token);
        const user = await this.authService.getUserById(decoded.userId);
        
        if (!user) {
          return next(new Error('User not found'));
        }

        socket.userId = decoded.userId;
        next();
      } catch (error) {
        next(new Error('Authentication error'));
      }
    });

    this.io.on('connection', (socket: any) => {
      console.log(`User ${socket.userId} connected`);

      // Join user to their personal room
      socket.join(`user:${socket.userId}`);

      // Join general tasks room for real-time updates
      socket.join('tasks');

      socket.on('disconnect', () => {
        console.log(`User ${socket.userId} disconnected`);
      });
    });
  }

  // Emit task events
  emitTaskCreated(task: any): void {
    this.io.to('tasks').emit('task:created', task);
  }

  emitTaskUpdated(task: any): void {
    this.io.to('tasks').emit('task:updated', task);
  }

  emitTaskDeleted(taskId: string): void {
    this.io.to('tasks').emit('task:deleted', { taskId });
  }

  emitTaskAssigned(task: any, assigneeId: string): void {
    this.io.to(`user:${assigneeId}`).emit('task:assigned', task);
  }

  getIO(): SocketIOServer {
    return this.io;
  }
}