'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaRegClock, FaCheckCircle } from 'react-icons/fa'
import Lottie from 'lottie-react'
import axios from 'axios'
import io from 'socket.io-client'

// ✅ Mocked employee list
const mockEmployees = [
  { id: 'e001', name: 'Aditi Sharma' },
  { id: 'e002', name: 'Navya Hebbar' },
  { id: 'e003', name: 'Ravi Kumar' },
  { id: 'e004', name: 'Simran Kaur' },
]


const socket = io('http://localhost:5000')

export default function AttendancePage() {
  const [currentTime, setCurrentTime] = useState('')
  const [clockAnim, setClockAnim] = useState<any>(null)

  const [punchState, setPunchState] = useState<{ [id: string]: boolean }>({})
  const [punchLogs, setPunchLogs] = useState<
    { id: string; name: string; type: 'in' | 'out'; time: string }[]
  >([])

  // ⏱ Live digital clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // 🌀 Fix Turbopack JSON import error by using fetch
  useEffect(() => {
    fetch('/animations/clock.json')
      .then((res) => res.json())
      .then(setClockAnim)
  }, [])

  // Listen for real-time punch updates
  useEffect(() => {
    socket.on('attendance_update', (data: { userId: string; name: string; action: string; time: string }) => {
      setPunchLogs((prev) => [
        {
          id: data.userId || '',
          name: data.name || '',
          type: data.action === 'in' ? 'in' : 'out',
          time: new Date(data.time).toLocaleTimeString(),
        },
        ...prev,
      ])
    })
    return () => {
      socket.off('attendance_update')
    }
  }, [])

  const handlePunch = async (empId: string, empName: string) => {
    const isIn = punchState[empId]
    setPunchState({ ...punchState, [empId]: !isIn })
    const type = !isIn ? 'in' : 'out'
    try {
      // Send punch to backend
      const punchData = {
        userId: empId,
        name: empName,
        action: type,
        time: new Date().toISOString(),
      }
      await axios.post('http://localhost:5000/api/employees/punch', punchData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    } catch (err) {
      // fallback: update log locally if backend fails
      const now = new Date().toLocaleTimeString()
      setPunchLogs((prev) => [
        { id: empId, name: empName, type, time: now },
        ...prev,
      ])
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 text-white relative">
      {/* 🕒 Header & clock animation */}
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-[#00ff99] drop-shadow-[0_0_8px_#00ff99] mb-4">
          Parlour Attendance
        </h1>

        <div className="w-60 h-60 mb-6 rounded-full border-4 border-[#00ff99] p-2 bg-zinc-900 shadow-[0_0_30px_#00ff99] animate-pulse flex items-center justify-center">
          {clockAnim && <Lottie animationData={clockAnim} loop />}
        </div>

        <p className="text-xl text-zinc-400 font-mono">
          Current Time: <span className="text-[#00ff99]">{currentTime}</span>
        </p>
      </div>

      {/* 👤 Employee Cards */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto mb-16">
        {mockEmployees.map((emp) => {
          const isIn = punchState[emp.id]
          return (
            <motion.div
              key={emp.id}
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 shadow-[0_0_20px_#00ff99] flex flex-col items-center justify-between gap-4"
            >
              <div className="w-20 h-20 rounded-full bg-[#00ff99]/10 flex items-center justify-center text-[#00ff99] text-3xl">
                {emp.name.charAt(0)}
              </div>

              <div className="text-center">
                <h2 className="text-xl font-semibold">{emp.name}</h2>
                <p className="text-sm text-zinc-400">
                  {isIn ? 'Present' : 'Not Yet Punched In'}
                </p>
              </div>

              <button
                onClick={() => handlePunch(emp.id, emp.name)}
                className={`w-full py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  isIn
                    ? 'bg-red-500 hover:bg-red-600 shadow-[0_0_15px_#f87171]'
                    : 'bg-[#00ff99] hover:bg-[#00cc88] shadow-[0_0_15px_#00ff99]'
                }`}
              >
                {isIn ? (
                  <div className="flex items-center justify-center gap-2">
                    <FaCheckCircle /> Punch Out
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock /> Punch In
                  </div>
                )}
              </button>
            </motion.div>
          )
        })}
      </div>

      {/* 📝 Punch Log Table with Clear Log */}
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#00ff99]">Punch Log</h2>
          {punchLogs.length > 0 && (
            <button
              onClick={() => setPunchLogs([])}
              className="text-sm px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-[0_0_10px_#f87171] transition-all"
            >
              Clear Log
            </button>
          )}
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-lg overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-800 text-[#00ff99]">
              <tr>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {punchLogs.map((log, idx) => (
                <tr key={idx} className="border-t border-zinc-700">
                  <td className="px-4 py-2">{log.name}</td>
                  <td
                    className={`px-4 py-2 ${
                      log.type === 'in'
                        ? 'text-[#00ff99]'
                        : 'text-red-400'
                    }`}
                  >
                    {log.type === 'in' ? 'Punch In' : 'Punch Out'}
                  </td>
                  <td className="px-4 py-2 text-zinc-400">{log.time}</td>
                </tr>
              ))}
              {punchLogs.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-4 text-center text-zinc-500">
                    No punches recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
