import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import swaggerUi from 'swagger-ui-express'

import router from './router'
import { connectDB } from './config/db'
import { corsConfig } from './config/cors'
import { swaggerSpec } from './doc/swagger'

connectDB()

const app = express ()

app.use(cors (corsConfig))
app.use(express.json())

app.use( router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default app