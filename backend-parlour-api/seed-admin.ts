import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from './models/user.models'

dotenv.config()

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI!)

  const existing = await User.findOne({ email: 'admin@parlour.com' })

  if (!existing) {
    const hashed = await bcrypt.hash('123456', 10)

    await User.create([
      {
        name: 'Flytech Admin',
        email: 'flytech.admin@parlour.com',
        password: await bcrypt.hash('Flytech@2025!', 10),
        role: 'superadmin',
      },
      {
        name: 'Megha Employee',
        email: 'employee.megha@parlour.com',
        password: await bcrypt.hash('Megha#321$', 10),
        role: 'admin',
      },
    ])

    console.log('✅ Superadmin and admin users created')
  } else {
    console.log('⚠️ Users already exist')
  }

  mongoose.disconnect()
}

seed();

import { Request, Response } from 'express';

export const punchInOut = async (req: Request & { user?: { id?: string } }, res: Response) => {
  // ... your punch logic ...
  const attendanceData = { userId: req.user?.id, action: 'punch_in', time: new Date() };

  // Check if io is available in req.app (assuming you attached it in your server setup)
  const io = req.app?.get('io');
  if (io) {
    io.emit('attendance_update', attendanceData); // Broadcast to all clients
  }

  res.json({ success: true });
}
