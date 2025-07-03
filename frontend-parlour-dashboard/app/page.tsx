'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from "next/image";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (token && role) {
      // User is logged in, redirect to appropriate dashboard
      if (role === 'superadmin') {
        router.push('/dashboard/employees')
      } else {
        router.push('/attendance')
      }
    } else {
      // User is not logged in, redirect to login page
      router.push('/login')
    }
  }, [router])

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-lg">Loading...</p>
      </div>
    </div>
  )
}
