import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Employee from './models/employee.model'

dotenv.config()

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI!)

  await Employee.deleteMany({}) // Optional: clear existing employees

  await Employee.create([
    { name: 'Navya', role: 'Stylist' },
    { name: 'Aditi', role: 'Receptionist' },
    { name: 'Ravi', role: 'Hair Expert' },
    { name: 'Simran', role: 'Beautician' },
  ])

  console.log('✅ Sample employees created')
  mongoose.disconnect()
}

seed() 