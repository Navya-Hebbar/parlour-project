import { Request, Response } from 'express'
import Employee from '../models/employee.model'

// GET /api/employees
export const getEmployees = async (req: Request, res: Response): Promise<void> => {
  const employees = await Employee.find()
  res.json(employees)
}

// POST /api/employees
export const addEmployee = async (req: Request, res: Response): Promise<void> => {
  const { name, role } = req.body
  const newEmp = await Employee.create({ name, role })
  res.status(201).json(newEmp)
}

// DELETE /api/employees/:id
export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  await Employee.findByIdAndDelete(id)
  res.json({ message: 'Employee deleted' })
}
