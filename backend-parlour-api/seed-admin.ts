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
        email: 'admin@parlour.com',
        password: hashed,
        role: 'superadmin',
      },
      {
        email: 'staff@parlour.com',
        password: hashed,
        role: 'admin',
      },
    ])

    console.log('✅ Superadmin and admin users created')
  } else {
    console.log('⚠️ Users already exist')
  }

  mongoose.disconnect()
}

seed()
