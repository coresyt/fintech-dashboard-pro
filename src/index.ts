import express from 'express'
import morgan from 'morgan'
import { Env } from './shared/config/env.js'
import { corsMiddleware } from './shared/middleware/cors.middleware.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
if (Env.ENV === 'dev')
  app.use(morgan('dev'))
else
  app.use(morgan('common'))
app.use(corsMiddleware)
app.disable('x-powered-by')

export default app
