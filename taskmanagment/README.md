# Collaborative Task Manager

A full-stack Task Management application built with React, Node.js, and Socket.io for real-time collaboration.

## Tech Stack

### Frontend
- **React** with TypeScript (via Vite)
- **Tailwind CSS** for styling
- **SWR** for data fetching and caching
- **React Hook Form** with Zod validation
- **Socket.io Client** for real-time updates

### Backend
- **Node.js + Express** with TypeScript
- **MongoDB** with Mongoose ODM
- **Socket.io** for real-time communication
- **JWT** for authentication
- **bcrypt** for password hashing

### Database Choice: MongoDB
MongoDB was chosen for its:
- Flexible document-based data model
- Excellent performance for read-heavy workloads
- Native JSON support for modern applications
- Easy horizontal scaling capabilities

## Architecture Overview

### Backend Architecture
- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic layer
- **Repositories**: Data access layer with Prisma
- **DTOs**: Input validation with Zod
- **Middleware**: Authentication, error handling, logging

### Real-time Features
Socket.io integration provides:
- Live task updates across all connected clients
- Instant assignment notifications
- Real-time status and priority changes

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB 6+
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your MongoDB URI in .env
npm run db:seed  # Optional: seed with sample data
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Docker Setup (Bonus)
```bash
docker-compose up -d
```

## API Contract

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks with filtering/sorting
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Users
- `GET /api/users` - Get all users (for assignment)
- `PUT /api/users/profile` - Update user profile

## Design Decisions

### Authentication
- JWT tokens stored in HttpOnly cookies for security
- Refresh token rotation for enhanced security
- Password hashing with bcrypt (12 rounds)

### Real-time Communication
- Socket.io rooms based on user sessions
- Event-driven architecture for task updates
- Optimistic UI updates with rollback on failure

### Data Validation
- Zod schemas for consistent validation
- DTOs for type safety across layers
- Client-side and server-side validation

## Trade-offs and Assumptions

1. **Session Management**: Using JWT in HttpOnly cookies vs localStorage for better security
2. **Real-time Scope**: All authenticated users see all tasks (could be scoped by teams/projects)
3. **Caching Strategy**: SWR handles client-side caching, Redis could be added for server-side caching
4. **File Uploads**: Not implemented in this version (could be added for task attachments)

## Deployment

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Railway
- **Database**: MongoDB Atlas

## Testing

Unit tests cover:
- Task creation and validation logic
- Authentication middleware
- Socket.io event handling

Run tests:
```bash
cd backend
npm test
```