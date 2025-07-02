'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'

export default function DashboardPage() {
  const router = useRouter()
  const [animations, setAnimations] = useState<any[]>([])

  useEffect(() => {
    const loadAnimations = async () => {
      const files = ['employees', 'tasks', 'attendance', 'realtime']
      const loaded = await Promise.all(
        files.map((file) =>
          fetch(`/animations/${file}.json`).then((res) => res.json())
        )
      )
      setAnimations(loaded)
    }

    loadAnimations()
  }, [])

  const features = [
    {
      title: 'Employees',
      description: 'Manage employee records',
      href: '/dashboard/employees',
      shadow: 'shadow-[0_0_15px_#00ff99]',
    },
    {
      title: 'Tasks',
      description: 'Assign & track tasks',
      href: '/dashboard/tasks',
      shadow: 'shadow-[0_0_15px_#8b5cf6]',
    },
    {
      title: 'Attendance',
      description: 'Punch In / Out logs',
      href: '/attendance',
      shadow: 'shadow-[0_0_15px_#facc15]',
    },
    {
      title: 'Live Updates',
      description: 'Realtime via WebSocket',
      href: '/dashboard/attendance',
      shadow: 'shadow-[0_0_15px_#3b82f6]',
    },
  ]

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-8 text-[#00ff99] drop-shadow-[0_0_8px_#00ff99] text-center">
        Admin Dashboard
      </h1>

      <div className="w-full flex justify-center">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 max-w-6xl">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push(feature.href)}
              className={`cursor-pointer w-[350px] h-[280px] bg-zinc-900 border border-zinc-700 rounded-xl p-6 ${feature.shadow} hover:brightness-110 hover:translate-y-[-2px] transition-all duration-300 flex flex-col items-center justify-center`}
            >
              {animations[index] && (
                <div className="w-32 h-32 mb-2">
                  <Lottie animationData={animations[index]} loop />
                </div>
              )}
              <h2 className="text-2xl font-semibold text-center mb-1">{feature.title}</h2>
              <p className="text-zinc-400 text-base text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
