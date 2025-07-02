'use client'

import { useEffect, useState } from 'react'
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa'
import { motion } from 'framer-motion'
import axios from 'axios'
import TaskModal from './TaskModal'

const getUserRole = () =>
  (typeof window !== 'undefined' && localStorage.getItem('role')) || 'admin'

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editTask, setEditTask] = useState<any>(null)
  const userRole = getUserRole()

  // Fetch tasks and employees
  useEffect(() => {
    const fetchData = async () => {
      const [tasksRes, empRes] = await Promise.all([
        axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }),
        axios.get('http://localhost:5000/api/employees', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }),
      ])
      setTasks(tasksRes.data)
      setEmployees(empRes.data)
    }
    fetchData()
  }, [])

  const handleAdd = () => {
    setEditTask(null)
    setShowModal(true)
  }

  const handleEdit = (task: any) => {
    setEditTask(task)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    setTasks((prev) => prev.filter((t) => t._id !== id))
  }

  const handleSave = async (task: any) => {
    if (editTask) {
      // Edit
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${editTask._id}`,
        task,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      setTasks((prev) =>
        prev.map((t) => (t._id === editTask._id ? res.data : t))
      )
    } else {
      // Add
      const res = await axios.post('http://localhost:5000/api/tasks', task, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      setTasks((prev) => [res.data, ...prev])
    }
  }

  return (
    <div className="text-white p-6">
      <h1 className="text-4xl font-bold text-[#8b5cf6] mb-10 drop-shadow-[0_0_10px_#8b5cf6] text-center">
        Task Management
      </h1>
      {userRole === 'superadmin' && (
        <div className="flex justify-end max-w-6xl mx-auto mb-6">
          <button
            onClick={handleAdd}
            className="bg-[#8b5cf6] text-black px-5 py-2 rounded-full font-semibold shadow-[0_0_15px_#8b5cf6] hover:bg-[#6d28d9] hover:shadow-[0_0_30px_#8b5cf6] transition-all duration-200 flex items-center gap-2"
          >
            <FaPlus /> Add New Task
          </button>
        </div>
      )}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {tasks.map((task) => (
          <motion.div
            key={task._id}
            whileHover={{ scale: 1.04 }}
            className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 shadow-[0_0_20px_#8b5cf6] hover:shadow-[0_0_40px_#8b5cf6] transition-all duration-300 flex flex-col gap-2"
          >
            <h2 className="text-2xl font-semibold text-white mb-2 drop-shadow-[0_0_8px_#8b5cf6]">
              {task.title}
            </h2>
            <p className="text-zinc-400 mb-2">{task.description}</p>
            <p className="text-sm text-[#8b5cf6] mb-2">
              Assigned To:{' '}
              {task.assignedTo?.name || 'Unassigned'}
            </p>
            <p className="text-xs mb-4">
              Status:{' '}
              <span
                className={
                  task.status === 'completed'
                    ? 'text-green-400'
                    : task.status === 'in_progress'
                    ? 'text-yellow-400'
                    : 'text-red-400'
                }
              >
                {task.status.replace('_', ' ').toUpperCase()}
              </span>
            </p>
            {userRole === 'superadmin' ? (
              <div className="flex justify-between items-center gap-4">
                <button
                  className="text-yellow-400 hover:text-yellow-300 hover:scale-110 transition-all"
                  onClick={() => handleEdit(task)}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-400 hover:text-red-300 hover:scale-110 transition-all"
                  onClick={() => handleDelete(task._id)}
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
      <TaskModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        initial={editTask}
        employees={employees}
      />
    </div>
  )
}
