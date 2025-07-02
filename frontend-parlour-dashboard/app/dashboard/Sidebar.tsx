'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Simulate getting user info from localStorage (replace with real logic as needed)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const email = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
    if (token && email) {
      setUserEmail(email);
    } else {
      setUserEmail(null);
    }
  }, []);

  return (
    <aside className="bg-zinc-900 text-white w-64 min-h-screen p-6 flex flex-col gap-4 shadow-lg">
      {/* Profile/Login Section */}
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-full bg-[#00ff99] flex items-center justify-center text-zinc-900 text-2xl font-bold">
          {userEmail ? userEmail.charAt(0).toUpperCase() : <span>?</span>}
        </div>
        <div className="text-sm font-semibold">
          {userEmail ? userEmail : <Link href="/login" className="text-[#00ff99]">Login</Link>}
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-8 text-[#00ff99]">Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="hover:text-[#00ff99]">Home</Link>
        <Link href="/dashboard/employees" className="hover:text-[#00ff99]">Employees</Link>
        <Link href="/dashboard/tasks" className="hover:text-[#00ff99]">Tasks</Link>
        <Link href="/attendance" className="hover:text-[#00ff99]">Attendance</Link>
      </nav>
    </aside>
  );
} 