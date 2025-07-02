'use client'

import { useState } from 'react'
import { FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa'
import { motion } from 'framer-motion'

// Get user role from localStorage
const getUserRole = () =>
  (typeof window !== 'undefined' && localStorage.getItem('role')) || 'admin'

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
  const [editId, setEditId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [editRole, setEditRole] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit'>('add')
  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState('')
  const userRole = getUserRole()

  const deleteEmployee = (id: number) => {
    if (userRole !== 'superadmin') return
    setEmployees((prev) => prev.filter((emp) => emp.id !== id))
  }

  const openEditModal = (emp: Employee) => {
    setEditId(emp.id)
    setEditName(emp.name)
    setEditRole(emp.role)
    setModalType('edit')
    setShowModal(true)
  }

  const openAddModal = () => {
    setNewName('')
    setNewRole('')
    setModalType('add')
    setShowModal(true)
  }

  const handleEditSave = () => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === editId ? { ...emp, name: editName, role: editRole } : emp
      )
    )
    setShowModal(false)
  }

  const handleAddSave = () => {
    const newEmp: Employee = {
      id: Date.now(),
      name: newName,
      role: newRole,
    }
    setEmployees((prev) => [...prev, newEmp])
    setShowModal(false)
  }

  return (
    <div className="text-white p-6">
      <h1 className="text-4xl font-bold text-[#00ff99] mb-10 drop-shadow-[0_0_10px_#00ff99] text-center">
        Employee Management
      </h1>

      {/* Add Button */}
      {userRole === 'superadmin' && (
        <div className="flex justify-end max-w-6xl mx-auto mb-6">
          <button
            onClick={openAddModal}
            className="bg-[#00ff99] text-black px-5 py-2 rounded-full font-semibold shadow-[0_0_15px_#00ff99] hover:bg-[#00cc88] hover:shadow-[0_0_30px_#00ff99] transition-all duration-200"
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
            whileHover={{ scale: 1.04 }}
            className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 shadow-[0_0_20px_#00ff99] hover:shadow-[0_0_40px_#00ff99] transition-all duration-300 flex flex-col gap-2"
          >
            <h2 className="text-2xl font-semibold text-white mb-2 drop-shadow-[0_0_8px_#00ff99]">{emp.name}</h2>
            <p className="text-zinc-400 mb-4">Role: {emp.role}</p>

            {userRole === 'superadmin' ? (
              <div className="flex justify-between items-center gap-4">
                <button
                  className="text-yellow-400 hover:text-yellow-300 hover:scale-110 transition-all"
                  onClick={() => openEditModal(emp)}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-400 hover:text-red-300 hover:scale-110 transition-all"
                  onClick={() => deleteEmployee(emp.id)}
                  title="Delete"
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

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-xl p-8 shadow-[0_0_40px_#00ff99] w-full max-w-md border border-[#00ff99] animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-[#00ff99] drop-shadow-[0_0_8px_#00ff99]">
              {modalType === 'add' ? 'Add Employee' : 'Edit Employee'}
            </h2>
            <label className="block mb-2 text-sm font-semibold">Name</label>
            <input
              className="w-full px-4 py-2 mb-4 rounded bg-zinc-800 text-white border border-[#00ff99] focus:outline-none focus:ring-2 focus:ring-[#00ff99]"
              value={modalType === 'add' ? newName : editName}
              onChange={(e) =>
                modalType === 'add'
                  ? setNewName(e.target.value)
                  : setEditName(e.target.value)
              }
              placeholder="Employee Name"
            />
            <label className="block mb-2 text-sm font-semibold">Role</label>
            <input
              className="w-full px-4 py-2 mb-6 rounded bg-zinc-800 text-white border border-[#00ff99] focus:outline-none focus:ring-2 focus:ring-[#00ff99]"
              value={modalType === 'add' ? newRole : editRole}
              onChange={(e) =>
                modalType === 'add'
                  ? setNewRole(e.target.value)
                  : setEditRole(e.target.value)
              }
              placeholder="Employee Role"
            />
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded-full bg-[#00ff99] text-black font-bold shadow-[0_0_10px_#00ff99] hover:bg-[#00cc88] hover:shadow-[0_0_20px_#00ff99] transition-all flex items-center gap-2"
                onClick={modalType === 'add' ? handleAddSave : handleEditSave}
              >
                <FaSave /> Save
              </button>
              <button
                className="px-4 py-2 rounded-full bg-zinc-800 text-[#00ff99] font-bold shadow-[0_0_10px_#00ff99] hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                onClick={() => setShowModal(false)}
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
