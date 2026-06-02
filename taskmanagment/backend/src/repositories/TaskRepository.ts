import { Task, ITask, Priority, Status } from '../models/Task';

export interface TaskFilters {
  status?: Status;
  priority?: Priority;
  assignedToId?: string;
  creatorId?: string;
  search?: string;
}

export interface TaskSortOptions {
  sortBy?: 'createdAt' | 'updatedAt' | 'dueDate' | 'priority';
  sortOrder?: 'asc' | 'desc';
}

export class TaskRepository {
  async create(taskData: Partial<ITask>): Promise<ITask> {
    const task = new Task(taskData);
    return await task.save();
  }

  async findById(id: string): Promise<ITask | null> {
    return await Task.findById(id);
  }

  async findAll(filters: TaskFilters = {}, sortOptions: TaskSortOptions = {}): Promise<ITask[]> {
    const query: any = {};

    // Apply filters
    if (filters.status) query.status = filters.status;
    if (filters.priority) query.priority = filters.priority;
    if (filters.assignedToId) query.assignedToId = filters.assignedToId;
    if (filters.creatorId) query.creatorId = filters.creatorId;
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort: any = {};
    const { sortBy = 'createdAt', sortOrder = 'desc' } = sortOptions;
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    return await Task.find(query).sort(sort);
  }

  async update(id: string, taskData: Partial<ITask>): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(id, taskData, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await Task.findByIdAndDelete(id);
    return !!result;
  }

  async findByUserId(userId: string): Promise<ITask[]> {
    return await Task.find({
      $or: [
        { creatorId: userId },
        { assignedToId: userId }
      ]
    }).sort({ createdAt: -1 });
  }
}