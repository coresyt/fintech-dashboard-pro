import { z } from 'zod'

export const JwtSchema = z.object({
  id: z.uuidv4("Invalid user id format"),
  password: z.string().min(1, "Password is required")
})

export type JwtPayload = z.infer<typeof JwtSchema>
