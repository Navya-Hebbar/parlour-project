import express from 'express'
import { getTasks, addTask, updateTask, deleteTask } from '../controllers/task.controller'
import { verifyToken, checkRole } from '../middleware/auth.middleware'

const router = express.Router()

// All roles can view
router.get('/', verifyToken, getTasks)

// Only superadmin can add, update, delete
router.post('/', verifyToken, checkRole('superadmin'), addTask)
router.put('/:id', verifyToken, checkRole('superadmin'), updateTask)
router.delete('/:id', verifyToken, checkRole('superadmin'), deleteTask)

export default router 