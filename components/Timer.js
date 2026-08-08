"use client";

import { useEffect, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Clock3,
} from "lucide-react";

const STUDY_TIME = 25 * 60;

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(STUDY_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (timeLeft % 60)
    .toString()
    .padStart(2, "0");

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(STUDY_TIME);
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <div className="flex items-center gap-2">
        <Clock3 size={22} className="text-purple-600" />

        <h2 className="text-xl font-semibold text-purple-700">
          Focus Timer
        </h2>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="flex h-64 w-64 items-center justify-center rounded-full border-[10px] border-purple-100">

          <div className="text-center">
            <p className="text-5xl font-bold tracking-wider text-gray-800">
              {minutes}:{seconds}
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Focus Session
            </p>
          </div>

        </div>
      </div>

      <div className="mt-8 flex justify-center gap-3">

        {!isRunning ? (
          <button
            onClick={() => setIsRunning(true)}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700"
          >
            <Play size={18} />
            Start
          </button>
        ) : (
          <button
            onClick={() => setIsRunning(false)}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700"
          >
            <Pause size={18} />
            Pause
          </button>
        )}

        <button
          onClick={handleReset}
          className="flex items-center gap-2 rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-200"
        >
          <RotateCcw size={18} />
          Reset
        </button>

      </div>

    </div>
  );
}