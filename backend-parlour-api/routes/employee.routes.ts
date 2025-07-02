'use client'
import express from 'express'
import {
  getEmployees,
  addEmployee,
  deleteEmployee,
} from '../controllers/employee.controller'
import { verifyToken, checkRole, AuthRequest } from '../middleware/auth.middleware'
import { io } from '../server'

const router = express.Router()

// All roles can view
router.get('/',verifyToken, getEmployees)

// Only superadmin can add/delete
router.post('/', verifyToken, checkRole('superadmin'), addEmployee)
router.delete('/:id', verifyToken, checkRole('superadmin'), deleteEmployee)

// Punch in/out route with WebSocket event
router.post('/punch', verifyToken, (req: AuthRequest, res) => {
  const { action } = req.body // 'in' or 'out'
  const user = req.user
  const punchData = {
    userId: user?.id,
    name: user?.name,
    action,
    time: new Date().toISOString(),
  }
  io.emit('attendance_update', punchData)
  res.json({ message: 'Punch recorded', punch: punchData })
})

export default router
