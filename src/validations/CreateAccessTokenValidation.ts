import { z } from 'zod';

export const CreateAccessTokenValidation = z.object({
  code: z.string(),
  verifier: z.string()
});

export type SpotifyTokenRequest = z.infer<typeof CreateAccessTokenValidation>;
