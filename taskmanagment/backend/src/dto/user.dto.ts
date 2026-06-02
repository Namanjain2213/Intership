import { z } from 'zod';

export const UpdateProfileDto = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email format').optional()
});

export type UpdateProfileDtoType = z.infer<typeof UpdateProfileDto>;