import { z } from 'zod';

export const CookieValidation = z.object({
  name: z.string().optional(),
  value: z.string()
});
