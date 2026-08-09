"use client";

import { useState } from "react";
import {
  Plus,
  Check,
  Trash2,
  ListTodo,
} from "lucide-react";

export default function TaskList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Add Task
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

  // Complete / Uncomplete Task
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  return (
    <div className="flex h-[430px] flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-lg">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex min-w-0 items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--lavender-soft)]">
            <ListTodo
              size={21}
              className="text-[var(--lavender-primary)]"
            />
          </div>

          <div className="min-w-0">

            <h2 className="text-xl font-semibold text-[var(--lavender-dark)]">
              Study Tasks
            </h2>

            <p className="text-xs text-[var(--text-muted)]">
              Plan your study session
            </p>

          </div>

        </div>

        {/* Task Count */}
        <div className="shrink-0 rounded-full bg-[var(--lavender-soft)] px-3 py-1 text-xs font-medium text-[var(--lavender-dark)]">
          {completedTasks}/{tasks.length}
        </div>

      </div>


      {/* Add Task */}
      <div className="mt-5 flex gap-2">

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
          className="min-w-0 flex-1 rounded-xl border border-[var(--lavender-light)] bg-[var(--lavender-soft)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--lavender-primary)] focus:ring-2 focus:ring-[var(--lavender-light)]"
        />

        <button
          onClick={addTask}
          aria-label="Add task"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--lavender-primary)] text-white transition hover:bg-[var(--lavender-dark)] active:scale-95"
        >
          <Plus size={20} />
        </button>

      </div>


      {/* Progress */}
      {tasks.length > 0 && (
        <div className="mt-4">

          <div className="mb-1.5 flex items-center justify-between">

            <span className="text-[11px] font-medium text-[var(--text-muted)]">
              Progress
            </span>

            <span className="text-[11px] font-medium text-[var(--lavender-dark)]">
              {Math.round(
                (completedTasks / tasks.length) * 100
              )}
              %
            </span>

          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-[var(--lavender-light)]">

            <div
              className="h-full rounded-full bg-[var(--lavender-primary)] transition-all duration-300"
              style={{
                width: `${
                  (completedTasks / tasks.length) * 100
                }%`,
              }}
            />

          </div>

        </div>
      )}


      {/* Task List */}
      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">

        {tasks.length === 0 ? (

          /* Empty State */
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--lavender-light)]">

            <ListTodo
              size={32}
              className="text-[var(--lavender-light)]"
            />

            <p className="mt-3 text-sm font-medium text-[var(--text-muted)]">
              No tasks yet
            </p>

            <p className="mt-1 text-center text-xs text-gray-300">
             Chiuuu Add something you want to study
            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {tasks.map((item) => (

              <div
                key={item.id}
                className="flex items-center gap-3 rounded-xl bg-[var(--lavender-soft)] p-3 transition hover:bg-[var(--lavender-light)]"
              >

                {/* Complete Button */}
                <button
                  onClick={() => toggleTask(item.id)}
                  aria-label={
                    item.completed
                      ? "Mark task incomplete"
                      : "Mark task complete"
                  }
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
                    item.completed
                      ? "border-[var(--lavender-primary)] bg-[var(--lavender-primary)] text-white"
                      : "border-[var(--lavender-primary)] bg-white"
                  }`}
                >
                  {item.completed && (
                    <Check size={14} />
                  )}
                </button>


                {/* Task Title */}
                <span
                  className={`min-w-0 flex-1 break-words text-sm ${
                    item.completed
                      ? "text-gray-400 line-through"
                      : "text-[var(--text-primary)]"
                  }`}
                >
                  {item.title}
                </span>


                {/* Delete Button */}
                <button
                  onClick={() => deleteTask(item.id)}
                  aria-label="Delete task"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 active:scale-95"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}