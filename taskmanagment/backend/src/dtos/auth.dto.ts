import { z } from 'zod';

/**
 * User registration DTO schema
 */
export const RegisterUserDto = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password must be less than 100 characters'),
});

/**
 * User login DTO schema
 */
export const LoginUserDto = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * Update user profile DTO schema
 */
export const UpdateProfileDto = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
});

export type RegisterUserDtoType = z.infer<typeof RegisterUserDto>;
export type LoginUserDtoType = z.infer<typeof LoginUserDto>;
export type UpdateProfileDtoType = z.infer<typeof UpdateProfileDto>;