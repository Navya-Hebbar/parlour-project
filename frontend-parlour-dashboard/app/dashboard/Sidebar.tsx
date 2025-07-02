'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserName(localStorage.getItem('userName'));
      setUserEmail(localStorage.getItem('userEmail'));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    window.location.href = '/login';
  };

  return (
    <aside className="bg-zinc-900 text-white w-64 min-h-screen p-6 flex flex-col gap-4 shadow-lg">
      {/* Profile/Login Section */}
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-full bg-[#00ff99] flex items-center justify-center text-zinc-900 text-2xl font-bold shadow-[0_0_20px_#00ff99] animate-pulse">
          {userName ? userName.charAt(0).toUpperCase() : <span>?</span>}
        </div>
        <div className="text-base font-semibold text-[#00ff99]">
          {userName ? userName : <Link href="/login" className="text-[#00ff99]">Login</Link>}
        </div>
        {userEmail && <div className="text-xs text-zinc-400">{userEmail}</div>}
        {userName && (
          <button
            onClick={handleLogout}
            className="mt-2 px-4 py-1 rounded-full bg-zinc-800 text-[#00ff99] font-bold shadow-[0_0_10px_#00ff99] hover:bg-[#00ff99] hover:text-zinc-900 transition-all duration-200"
          >
            Logout
          </button>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-8 text-[#00ff99] drop-shadow-[0_0_8px_#00ff99]">Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="hover:text-[#00ff99] hover:drop-shadow-[0_0_8px_#00ff99] transition-all">Home</Link>
        <Link href="/dashboard/employees" className="hover:text-[#00ff99] hover:drop-shadow-[0_0_8px_#00ff99] transition-all">Employees</Link>
        <Link href="/dashboard/tasks" className="hover:text-[#00ff99] hover:drop-shadow-[0_0_8px_#00ff99] transition-all">Tasks</Link>
        <Link href="/attendance" className="hover:text-[#00ff99] hover:drop-shadow-[0_0_8px_#00ff99] transition-all">Attendance</Link>
        <Link href="/dashboard/attendance" className="hover:text-[#00ff99] hover:drop-shadow-[0_0_8px_#00ff99] transition-all">Live Updates</Link>
      </nav>
    </aside>
  );
} 