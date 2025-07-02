'use client'

import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { motion } from 'framer-motion'

// Simulate login role: 'admin' or 'superadmin'
const userRole: 'admin' | 'superadmin' = 'superadmin' // change to 'admin' to test

const initialTasks = [
  { id: 1, title: 'Clean chairs', assigned: 'Navya', done: false },
  { id: 2, title: 'Refill products', assigned: 'Aditi', done: true },
  { id: 3, title: 'Wipe mirrors', assigned: 'Ravi', done: false },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)

  const toggleTask = (id: number) => {
    if (userRole !== 'superadmin') return
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  const deleteTask = (id: number) => {
    if (userRole !== 'superadmin') return
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <h1 className="text-4xl font-bold text-[#00ff99] mb-10 drop-shadow-[0_0_10px_#00ff99] text-center">
        Task Management
      </h1>

      {/* 🔘 Super Admin Add Task Button */}
      {userRole === 'superadmin' && (
        <div className="flex justify-end max-w-7xl mx-auto mb-6">
          <button className="bg-[#00ff99] text-black px-5 py-2 rounded-full font-semibold shadow-[0_0_15px_#00ff99] hover:bg-[#00cc88] transition-all">
            ➕ Add New Task
          </button>
        </div>
      )}

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            whileHover={{ scale: 1.02 }}
            className={`rounded-xl border p-6 transition-all duration-300 shadow-[0_0_15px_#00ff99] ${
              task.done
                ? 'bg-zinc-800 border-green-500/40'
                : 'bg-zinc-900 border-zinc-700'
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-2 ${
                task.done ? 'text-green-400 line-through' : 'text-white'
              }`}
            >
              {task.title}
            </h2>
            <p className="text-sm text-zinc-400 mb-6">
              Assigned to:{' '}
              <span className="text-[#00ff99] font-medium">
                {task.assigned}
              </span>
            </p>

            <div className="flex justify-between items-center">
              {/* 👇 Buttons visible only to superadmin */}
              {userRole === 'superadmin' ? (
                <>
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                      task.done
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-[#00ff99] hover:bg-[#00cc88] text-black'
                    }`}
                  >
                    {task.done ? 'Undo' : 'Mark Done'}
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-300"
                    title="Delete Task"
                  >
                    <FaTrash />
                  </button>
                </>
              ) : (
                <span className="text-xs text-zinc-500">View only</span>
              )}
            </div>
          </motion.div>
        ))}

        {tasks.length === 0 && (
          <p className="text-center text-zinc-500 col-span-full mt-10">
            🎉 All tasks completed or none assigned!
          </p>
        )}
      </div>
    </div>
  )
}
