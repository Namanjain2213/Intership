import dotenv from 'dotenv';
import { connectDatabase, disconnectDatabase } from '../config/database';
import { UserRepository } from '../repositories/UserRepository';
import { TaskRepository } from '../repositories/TaskRepository';
import { Priority, Status } from '../models/Task';
import bcrypt from 'bcrypt';

dotenv.config();

const seed = async (): Promise<void> => {
  try {
    console.log('🌱 Starting database seed...');
    
    await connectDatabase();
    
    const userRepo = new UserRepository();
    const taskRepo = new TaskRepository();

    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    const user1 = await userRepo.create({
      email: 'john@example.com',
      name: 'John Doe',
      password: hashedPassword
    });

    const user2 = await userRepo.create({
      email: 'jane@example.com',
      name: 'Jane Smith',
      password: hashedPassword
    });

    console.log('✅ Created sample users');

    // Create sample tasks
    await taskRepo.create({
      title: 'Setup project structure',
      description: 'Initialize the project with proper folder structure and dependencies',
      priority: Priority.HIGH,
      status: Status.COMPLETED,
      creatorId: user1._id,
      assignedToId: user1._id
    });

    await taskRepo.create({
      title: 'Implement user authentication',
      description: 'Add JWT-based authentication with login and registration',
      priority: Priority.HIGH,
      status: Status.IN_PROGRESS,
      creatorId: user1._id,
      assignedToId: user2._id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    });

    await taskRepo.create({
      title: 'Design task management UI',
      description: 'Create wireframes and mockups for the task management interface',
      priority: Priority.MEDIUM,
      status: Status.TODO,
      creatorId: user2._id,
      assignedToId: user2._id,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
    });

    await taskRepo.create({
      title: 'Write API documentation',
      description: 'Document all API endpoints with examples and response formats',
      priority: Priority.LOW,
      status: Status.TODO,
      creatorId: user1._id
    });

    console.log('✅ Created sample tasks');
    console.log('🎉 Database seeded successfully!');
    console.log('\nSample users:');
    console.log('- john@example.com / password123');
    console.log('- jane@example.com / password123');
    
  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    await disconnectDatabase();
  }
};

seed();