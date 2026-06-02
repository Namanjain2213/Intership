import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { taskApi, userApi } from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';
import { useSocket } from '../contexts/SocketContext';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';
  creatorId: string;
  assignedToId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { socket } = useSocket();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    assignedToId: '',
    search: ''
  });

  useEffect(() => {
    loadTasks();
    loadUsers();
  }, [filters]);

  useEffect(() => {
    if (socket) {
      socket.on('task:created', (task: Task) => {
        setTasks(prev => [task, ...prev]);
      });

      socket.on('task:updated', (task: Task) => {
        setTasks(prev => prev.map(t => t.id === task.id ? task : t));
      });

      socket.on('task:deleted', ({ taskId }: { taskId: string }) => {
        setTasks(prev => prev.filter(t => t.id !== taskId));
      });

      return () => {
        socket.off('task:created');
        socket.off('task:updated');
        socket.off('task:deleted');
      };
    }
  }, [socket]);

  const loadTasks = async () => {
    try {
      const response = await taskApi.getTasks(filters);
      setTasks(response.tasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await userApi.getUsers();
      setUsers(response.users);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const handleCreateTask = async (taskData: any) => {
    try {
      await taskApi.createTask(taskData);
      setShowTaskForm(false);
      // Task will be added via socket event
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (taskData: any) => {
    if (!editingTask) return;
    
    try {
      await taskApi.updateTask(editingTask.id, taskData);
      setEditingTask(null);
      // Task will be updated via socket event
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await taskApi.deleteTask(taskId);
      // Task will be removed via socket event
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowTaskForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                New Task
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Filters */}
          <TaskFilters
            filters={filters}
            onFiltersChange={setFilters}
            users={users}
          />

          {/* Task List */}
          <TaskList
            tasks={tasks}
            users={users}
            onEditTask={setEditingTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </main>

      {/* Task Form Modal */}
      {(showTaskForm || editingTask) && (
        <TaskForm
          task={editingTask}
          users={users}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default DashboardPage;