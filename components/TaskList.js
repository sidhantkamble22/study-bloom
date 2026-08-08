"use client";

import { useState } from "react";
import {
  Plus,
  Check,
  Trash2,
} from "lucide-react";

export default function TaskList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const trimmedTask = task.trim();

    if (!trimmedTask) return;

    const newTask = {
      id: Date.now(),
      title: trimmedTask,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-purple-700">
            Study Tasks
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Plan your study session
          </p>
        </div>

        <Plus size={22} className="text-purple-600" />

      </div>

      <div className="mt-6 flex gap-2">

        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
          placeholder="Add a study task..."
          className="min-w-0 flex-1 rounded-xl border border-purple-100 bg-purple-50 px-4 py-3 text-sm outline-none transition focus:border-purple-400"
        />

        <button
          onClick={addTask}
          className="rounded-xl bg-purple-600 px-4 py-3 text-white transition hover:bg-purple-700"
        >
          <Plus size={20} />
        </button>

      </div>

      <div className="mt-5 space-y-3">

        {tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-purple-200 p-6 text-center">

            <p className="text-sm text-gray-400">
              No tasks yet
            </p>

            <p className="mt-1 text-xs text-gray-300">
             Chiuuu Add something you want to study
            </p>

          </div>
        ) : (
          tasks.map((item) => (

            <div
              key={item.id}
              className="flex items-center gap-3 rounded-xl bg-purple-50 p-3"
            >

              <button
                onClick={() => toggleTask(item.id)}
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                  item.completed
                    ? "border-purple-600 bg-purple-600 text-white"
                    : "border-purple-300"
                }`}
              >
                {item.completed && <Check size={14} />}
              </button>

              <span
                className={`flex-1 text-sm ${
                  item.completed
                    ? "text-gray-400 line-through"
                    : "text-gray-700"
                }`}
              >
                {item.title}
              </span>

              <button
                onClick={() => deleteTask(item.id)}
                className="text-gray-400 transition hover:text-red-500"
              >
                <Trash2 size={17} />
              </button>

            </div>

          ))
        )}

      </div>

    </div>
  );
}