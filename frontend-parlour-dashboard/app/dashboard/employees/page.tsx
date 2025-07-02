'use client'

import { useState } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { motion } from 'framer-motion'

// Simulated login role
const userRole: 'admin' | 'superadmin' = 'superadmin' // change to 'admin' to test

type Employee = {
  id: number
  name: string
  role: string
}

const initialEmployees: Employee[] = [
  { id: 1, name: 'Navya', role: 'Stylist' },
  { id: 2, name: 'Aditi', role: 'Receptionist' },
  { id: 3, name: 'Ravi', role: 'Hair Expert' },
]

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees)

  const deleteEmployee = (id: number) => {
    if (userRole !== 'superadmin') return
    setEmployees((prev) => prev.filter((emp) => emp.id !== id))
  }

  const addEmployee = () => {
    const newEmp: Employee = {
      id: Date.now(),
      name: 'New Employee',
      role: 'New Role',
    }
    setEmployees((prev) => [...prev, newEmp])
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <h1 className="text-4xl font-bold text-[#00ff99] mb-10 drop-shadow-[0_0_10px_#00ff99] text-center">
        Employee Management
      </h1>

      {/* Add Button */}
      {userRole === 'superadmin' && (
        <div className="flex justify-end max-w-6xl mx-auto mb-6">
          <button
            onClick={addEmployee}
            className="bg-[#00ff99] text-black px-5 py-2 rounded-full font-semibold shadow-[0_0_15px_#00ff99] hover:bg-[#00cc88] transition-all"
          >
            ➕ Add New Employee
          </button>
        </div>
      )}

      {/* Employee Cards */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {employees.map((emp) => (
          <motion.div
            key={emp.id}
            whileHover={{ scale: 1.02 }}
            className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 shadow-[0_0_15px_#00ff99] transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">{emp.name}</h2>
            <p className="text-zinc-400 mb-4">Role: {emp.role}</p>

            {userRole === 'superadmin' ? (
              <div className="flex justify-between items-center">
                <button className="text-yellow-400 hover:text-yellow-300">
                  <FaEdit />
                </button>
                <button
                  className="text-red-400 hover:text-red-300"
                  onClick={() => deleteEmployee(emp.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ) : (
              <p className="text-xs text-zinc-500">View only</p>
            )}
          </motion.div>
        ))}
      </div>

      {employees.length === 0 && (
        <p className="text-center text-zinc-500 mt-10">No employees available</p>
      )}
    </div>
  )
}
