'use client'
import Sidebar from '../dashboard/Sidebar';

export default function AttendanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
} 