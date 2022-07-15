import { z } from 'zod';

export const searchUsersValdidator = z.object({
  gender: z.enum(['MALE', 'FEMALE']).optional(),
  name: z.string(),
  age: z.number().min(20).optional(),
});
