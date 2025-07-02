import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db'
import authRoutes from './routes/auth.routes'
import employeeRoutes from './routes/employee.routes'
import taskRoutes from './routes/task.routes'
import http from 'http'
import { Server } from 'socket.io'

dotenv.config()

const app = express()
const server = http.createServer(app)
export const io = new Server(server, { cors: { origin: '*' } })
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/tasks', taskRoutes)

io.on('connection', (socket) => {
  console.log('A user connected')
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

const PORT = process.env.PORT || 5000
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  })
})
