import { z } from 'zod';

export const searchUsersValdidator = z.object({
  gender: z.enum(['MALE', 'FEMALE']).optional(),
  lastName: z.string(),
  firstName: z.string().optional(),
  age: z.number().min(20).optional(),
});
