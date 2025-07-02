import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db'
import authRoutes from './routes/auth.routes'
import employeeRoutes from './routes/employee.routes'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/employees', employeeRoutes)

const PORT = process.env.PORT || 5000
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  })
})
