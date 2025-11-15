import cors from 'cors'
import { Env } from '../config/env.js'

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    const allowedOrigins = Env.CORS_ALLOWED_ORIGINS

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
})
