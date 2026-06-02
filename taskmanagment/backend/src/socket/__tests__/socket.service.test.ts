import { Server as HTTPServer } from 'http';
import { SocketService } from '../socket.service';
import { mockPrisma } from '../../test/setup';

// Mock Socket.io
const mockSocket = {
  id: 'socket-1',
  data: {},
  handshake: {
    auth: { token: 'valid-token' },
    query: {},
  },
  join: jest.fn(),
  to: jest.fn().mockReturnThis(),
  emit: jest.fn(),
  on: jest.fn(),
};

const mockIo = {
  use: jest.fn(),
  on: jest.fn(),
  to: jest.fn().mockReturnThis(),
  emit: jest.fn(),
};

jest.mock('socket.io', () => ({
  Server: jest.fn().mockImplementation(() => mockIo),
}));

// Mock JWT utils
jest.mock('../../utils/jwt', () => ({
  verifyAccessToken: jest.fn().mockReturnValue({
    userId: 'user-1',
    email: 'test@example.com',
  }),
}));

describe('SocketService', () => {
  let socketService: SocketService;
  let mockServer: HTTPServer;

  beforeEach(() => {
    jest.clearAllMocks();
    mockServer = {} as HTTPServer;
    socketService = new SocketService(mockServer);
  });

  describe('initialization', () => {
    it('should initialize Socket.io server with correct configuration', () => {
      expect(mockIo.use).toHaveBeenCalled();
      expect(mockIo.on).toHaveBeenCalledWith('connection', expect.any(Function));
    });
  });

  describe('emitTaskCreated', () => {
    it('should emit task created event to tasks room', () => {
      const mockTask = {
        id: 'task-1',
        title: 'Test Task',
        status: 'TODO',
      };

      socketService.emitTaskCreated(mockTask);

      expect(mockIo.to).toHaveBeenCalledWith('tasks');
      expect(mockIo.emit).toHaveBeenCalledWith('task:created', mockTask);
    });
  });

  describe('emitTaskUpdated', () => {
    it('should emit task updated event to tasks room', () => {
      const mockTask = {
        id: 'task-1',
        title: 'Updated Task',
        assignedToId: 'user-2',
      };

      const previousTask = {
        id: 'task-1',
        title: 'Original Task',
        assignedToId: 'user-1',
      };

      socketService.emitTaskUpdated(mockTask, previousTask);

      expect(mockIo.to).toHaveBeenCalledWith('tasks');
      expect(mockIo.emit).toHaveBeenCalledWith('task:updated', {
        task: mockTask,
        previousTask,
      });
    });

    it('should send assignment notification when assignee changes', () => {
      const mockTask = {
        id: 'task-1',
        title: 'Test Task',
        assignedToId: 'user-2',
      };

      const previousTask = {
        id: 'task-1',
        title: 'Test Task',
        assignedToId: 'user-1',
      };

      const sendNotificationSpy = jest.spyOn(socketService, 'sendAssignmentNotification');
      sendNotificationSpy.mockImplementation(() => {});

      socketService.emitTaskUpdated(mockTask, previousTask);

      expect(sendNotificationSpy).toHaveBeenCalledWith('user-2', mockTask);
    });
  });

  describe('emitTaskDeleted', () => {
    it('should emit task deleted event to tasks room', () => {
      const taskId = 'task-1';

      socketService.emitTaskDeleted(taskId);

      expect(mockIo.to).toHaveBeenCalledWith('tasks');
      expect(mockIo.emit).toHaveBeenCalledWith('task:deleted', { taskId });
    });
  });

  describe('sendAssignmentNotification', () => {
    it('should send assignment notification to specific user', () => {
      const userId = 'user-1';
      const mockTask = {
        id: 'task-1',
        title: 'Test Task',
      };

      socketService.sendAssignmentNotification(userId, mockTask);

      expect(mockIo.to).toHaveBeenCalledWith(`user:${userId}`);
      expect(mockIo.emit).toHaveBeenCalledWith('notification:assignment', {
        type: 'task_assigned',
        message: `You have been assigned to task: ${mockTask.title}`,
        task: mockTask,
        timestamp: expect.any(String),
      });
    });
  });

  describe('getConnectedUsersCount', () => {
    it('should return 0 when no users are connected', () => {
      const count = socketService.getConnectedUsersCount();
      expect(count).toBe(0);
    });
  });
});