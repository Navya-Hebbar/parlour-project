import { Request, Response } from 'express'
import Task from '../models/task.model'

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find().populate('assignedTo', 'name email')
  res.json(tasks)
}

export const addTask = async (req: Request, res: Response) => {
  const { title, description, assignedTo } = req.body
  const task = await Task.create({ title, description, assignedTo })
  res.status(201).json(task)
}

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, description, assignedTo, status } = req.body
  const task = await Task.findByIdAndUpdate(id, { title, description, assignedTo, status }, { new: true })
  res.json(task)
}

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params
  await Task.findByIdAndDelete(id)
  res.json({ message: 'Task deleted' })
} 