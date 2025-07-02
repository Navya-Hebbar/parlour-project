'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Lottie from 'lottie-react'
import animationData from '@/public/animations/login.json'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      })

      const token = res.data.token
      const role = res.data.user.role
      const userEmail = res.data.user.email

      localStorage.setItem('token', token)
      localStorage.setItem('userEmail', userEmail)

      // Force reload to update sidebar state
      if (role === 'superadmin') {
        router.push('/dashboard/employees')
      } else {
        router.push('/attendance')
      }
      window.location.reload();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white px-4">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Lottie Animation */}
        <div className="w-[300px] md:w-[400px]">
          <Lottie animationData={animationData} loop={true} />
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="bg-zinc-800 p-8 rounded-xl shadow-glow max-w-sm w-full"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-neon-green">
            Parlour Admin Login
          </h1>

          <label className="block mb-1 text-sm font-semibold">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 mb-4 rounded bg-zinc-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-1 text-sm font-semibold">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 mb-4 rounded bg-zinc-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-2 px-4 rounded shadow-glowGreen"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}
