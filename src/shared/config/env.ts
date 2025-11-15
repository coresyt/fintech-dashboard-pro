import { config } from 'dotenv'
import { EnvSchema } from '../types/env.js'
import { EnvError } from '../errors/env.error.js'

export const Env = (() => {
  config()
  const parsedEnv = EnvSchema.safeParse({
    ...process.env,
    CORS_ALLOWED_ORIGINS: 
      process.env.CORS_ALLOWED_ORIGINS?.split(',')
  })
  
  if (!parsedEnv.success) {
    const formattedErrors = 
      parsedEnv.error.issues.map(issue => 
        `[${issue.path.join('.') || 'Global'}]: ${issue.message}`
      ).join('; ');

    throw new EnvError(
      'Invalid environment variables',
      formattedErrors
    )
  }

  return parsedEnv.data
})()
