"use client";
import { useState } from "react";

export default function TaskModal({
  open,
  onClose,
  onSave,
  initial,
  employees,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (task: any) => void;
  initial?: any;
  employees: { _id: string; name: string }[];
}) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [assignedTo, setAssignedTo] = useState(initial?.assignedTo || "");
  const [status, setStatus] = useState(initial?.status || "pending");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-xl p-8 shadow-[0_0_40px_#8b5cf6] w-full max-w-md border border-[#8b5cf6] animate-fadeIn">
        <h2 className="text-2xl font-bold mb-6 text-[#8b5cf6] drop-shadow-[0_0_8px_#8b5cf6]">
          {initial ? "Edit Task" : "Add Task"}
        </h2>
        <label className="block mb-2 text-sm font-semibold">Title</label>
        <input
          className="w-full px-4 py-2 mb-4 rounded bg-zinc-800 text-white border border-[#8b5cf6] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />
        <label className="block mb-2 text-sm font-semibold">Description</label>
        <textarea
          className="w-full px-4 py-2 mb-4 rounded bg-zinc-800 text-white border border-[#8b5cf6] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        />
        <label className="block mb-2 text-sm font-semibold">Assign To</label>
        <select
          className="w-full px-4 py-2 mb-4 rounded bg-zinc-800 text-white border border-[#8b5cf6] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
        <label className="block mb-2 text-sm font-semibold">Status</label>
        <select
          className="w-full px-4 py-2 mb-6 rounded bg-zinc-800 text-white border border-[#8b5cf6] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded-full bg-[#8b5cf6] text-black font-bold shadow-[0_0_10px_#8b5cf6] hover:bg-[#6d28d9] hover:shadow-[0_0_20px_#8b5cf6] transition-all"
            onClick={() => {
              onSave({ title, description, assignedTo, status });
              onClose();
            }}
          >
            Save
          </button>
          <button
            className="px-4 py-2 rounded-full bg-zinc-800 text-[#8b5cf6] font-bold shadow-[0_0_10px_#8b5cf6] hover:bg-red-500 hover:text-white transition-all"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 