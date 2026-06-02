import mongoose, { Document, Schema } from 'mongoose';

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum Status {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  COMPLETED = 'COMPLETED'
}

export interface ITask extends Document {
  _id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: Priority;
  status: Status;
  creatorId: string;
  assignedToId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  dueDate: {
    type: Date
  },
  priority: {
    type: String,
    enum: Object.values(Priority),
    default: Priority.MEDIUM
  },
  status: {
    type: String,
    enum: Object.values(Status),
    default: Status.TODO
  },
  creatorId: {
    type: String,
    required: true,
    ref: 'User'
  },
  assignedToId: {
    type: String,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

export const Task = mongoose.model<ITask>('Task', taskSchema);