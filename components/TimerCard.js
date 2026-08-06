"use client";

import { Play, Pause, RotateCcw } from "lucide-react";
import { useState } from "react";

export default function TimerCard() {
  const [running, setRunning] = useState(false);

  return (
    <section className="bg-white rounded-[32px] p-8 shadow-xl">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-violet-500 font-semibold">
            Focus Session
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Pomodoro Timer
          </h2>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">
          ⏳
        </div>
      </div>

      {/* Timer */}

      <div className="flex justify-center mt-10">

        <div className="relative">

          <svg width="240" height="240">

            <circle
              cx="120"
              cy="120"
              r="100"
              stroke="#ECE6FF"
              strokeWidth="12"
              fill="none"
            />

            <circle
              cx="120"
              cy="120"
              r="100"
              stroke="#8B5CF6"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="628"
              strokeDashoffset="160"
              transform="rotate(-90 120 120)"
            />

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <p className="text-gray-500">
              Remaining
            </p>

            <h1 className="text-6xl font-bold tracking-tight mt-1">
              25:00
            </h1>

            <p className="text-sm text-violet-500 mt-3">
              Stay Focused
            </p>

          </div>

        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-center gap-5 mt-10">

        <button
          onClick={() => setRunning(!running)}
          className="w-16 h-16 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          {running ? <Pause /> : <Play />}
        </button>

        <button
          className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
        >
          <RotateCcw />
        </button>

      </div>

    </section>
  );
}