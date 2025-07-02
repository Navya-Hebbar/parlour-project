'use client'
import express from 'express'
import {
  getEmployees,
  addEmployee,
  deleteEmployee,
} from '../controllers/employee.controller'
import { verifyToken, checkRole } from '../middleware/auth.middleware'

const router = express.Router()

// All roles can view
router.get('/',verifyToken, getEmployees)

// Only superadmin can add/delete
router.post('/', verifyToken, checkRole('superadmin'), addEmployee)
router.delete('/:id', verifyToken, checkRole('superadmin'), deleteEmployee)

export default router
