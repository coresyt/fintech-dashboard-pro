import { z } from 'zod'

export const EnvSchema = z.object({
  CORS_ALLOWED_ORIGINS: z.array(z.url()).min(1),
  SECRET_KEY: z.string().min(12),
  ENV: z.enum(['dev', 'prod'])
})

export type EnvType = z.infer<typeof EnvSchema>
