'use client'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function DashboardAttendanceLog() {
  const [logs, setLogs] = useState<{
    userId: string;
    name: string;
    action: string;
    time: string;
  }[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('attendance_update', (data: { userId: string; name: string; action: string; time: string }) => {
      setLogs((prev) => [
        {
          userId: data.userId,
          name: data.name,
          action: data.action,
          time: new Date(data.time).toLocaleTimeString(),
        },
        ...prev,
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold text-[#00ff99] mb-8 drop-shadow-[0_0_8px_#00ff99] text-center">
        Live Attendance Log
      </h1>
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg overflow-x-auto max-w-3xl mx-auto shadow-[0_0_30px_#00ff99]">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-800 text-[#00ff99]">
            <tr>
              <th className="px-4 py-3">Employee</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-4 text-center text-zinc-500">
                  No attendance events yet.
                </td>
              </tr>
            )}
            {logs.map((log, idx) => (
              <tr key={idx} className="border-t border-zinc-700">
                <td className="px-4 py-2 font-semibold text-[#00ff99] drop-shadow-[0_0_6px_#00ff99]">{log.name}</td>
                <td className={`px-4 py-2 font-bold ${log.action === 'in' ? 'text-[#00ff99]' : 'text-red-400'} drop-shadow-[0_0_6px_#00ff99]`}>
                  {log.action === 'in' ? 'Punch In' : 'Punch Out'}
                </td>
                <td className="px-4 py-2 text-zinc-400">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 