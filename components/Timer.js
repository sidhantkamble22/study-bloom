"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Clock3,
  Settings2,
  X,
} from "lucide-react";

const DEFAULT_STUDY_MINUTES = 25;
const DEFAULT_BREAK_MINUTES = 5;

export default function Timer({ onSessionComplete }) {
  const [mode, setMode] = useState("study");

  const [studyMinutes, setStudyMinutes] = useState(
    DEFAULT_STUDY_MINUTES
  );

  const [breakMinutes, setBreakMinutes] = useState(
    DEFAULT_BREAK_MINUTES
  );

  const [timeLeft, setTimeLeft] = useState(
    DEFAULT_STUDY_MINUTES * 60
  );

  const [isRunning, setIsRunning] = useState(false);

  const [showSettings, setShowSettings] = useState(false);

  // Current mode total time
  const totalTime = useMemo(() => {
    return mode === "study"
      ? studyMinutes * 60
      : breakMinutes * 60;
  }, [mode, studyMinutes, breakMinutes]);

  // Timer logic
// Timer countdown
useEffect(() => {
  if (!isRunning) return;

  const interval = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        return 0;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [isRunning]);

// Handle timer completion
useEffect(() => {
  if (!isRunning || timeLeft !== 0) return;

  setIsRunning(false);

  if (mode === "study") {
    // One study session completed
    if (onSessionComplete) {
      onSessionComplete();
    }

    // Start break
    setMode("break");
    setTimeLeft(breakMinutes * 60);
  } else {
    // Break completed → start study
    setMode("study");
    setTimeLeft(studyMinutes * 60);
  }
}, [
  timeLeft,
  isRunning,
  mode,
  breakMinutes,
  studyMinutes,
  onSessionComplete,
]);

  // Time format
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (timeLeft % 60)
    .toString()
    .padStart(2, "0");

  // Progress percentage
  const progress =
    totalTime > 0
      ? ((totalTime - timeLeft) / totalTime) * 100
      : 0;

  // Start timer
  const handleStart = () => {
    setIsRunning(true);
  };

  // Pause timer
  const handlePause = () => {
    setIsRunning(false);
  };

  // Reset timer
  const handleReset = () => {
    setIsRunning(false);

    setTimeLeft(
      mode === "study"
        ? studyMinutes * 60
        : breakMinutes * 60
    );
  };

  // Change mode
  const changeMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);

    setTimeLeft(
      newMode === "study"
        ? studyMinutes * 60
        : breakMinutes * 60
    );
  };

  // Save settings
  const saveSettings = () => {
    setIsRunning(false);

    setTimeLeft(
      mode === "study"
        ? studyMinutes * 60
        : breakMinutes * 60
    );

    setShowSettings(false);
  };

  return (
    <div className="relative flex h-[430px] flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:p-8">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex min-w-0 items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--lavender-soft)]">
            <Clock3
              size={21}
              className="text-[var(--lavender-primary)]"
            />
          </div>

          <div className="min-w-0">

            <h2 className="text-xl font-semibold text-[var(--lavender-dark)]">
              Focus Timer
            </h2>

            <p className="text-xs text-[var(--text-muted)]">
              Stay focused and grow your plant
            </p>

          </div>

        </div>

        {/* Settings Button */}
        <button
          onClick={() => setShowSettings(true)}
          aria-label="Timer settings"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--lavender-soft)] text-[var(--lavender-primary)] transition hover:bg-[var(--lavender-light)] active:scale-95"
        >
          <Settings2 size={19} />
        </button>

      </div>

      {/* Study / Break Mode */}
      <div className="mx-auto mt-5 flex w-fit rounded-xl bg-[var(--lavender-soft)] p-1">

        <button
          onClick={() => changeMode("study")}
          className={`rounded-lg px-5 py-2 text-sm font-medium transition ${
            mode === "study"
              ? "bg-[var(--lavender-primary)] text-white shadow-sm"
              : "text-[var(--lavender-dark)] hover:bg-white"
          }`}
        >
          Study
        </button>

        <button
          onClick={() => changeMode("break")}
          className={`rounded-lg px-5 py-2 text-sm font-medium transition ${
            mode === "break"
              ? "bg-[var(--lavender-primary)] text-white shadow-sm"
              : "text-[var(--lavender-dark)] hover:bg-white"
          }`}
        >
          Break
        </button>

      </div>

      {/* Timer Circle */}
      <div className="mt-5 flex flex-1 items-center justify-center">

        <div
          className="relative flex h-52 w-52 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(
              var(--lavender-primary) ${progress}%,
              var(--lavender-light) ${progress}%
            )`,
          }}
        >

          {/* Inner Circle */}
          <div className="flex h-44 w-44 items-center justify-center rounded-full bg-white">

            <div className="text-center">

              <p className="text-4xl font-bold tracking-wider text-[var(--text-primary)] md:text-5xl">
                {minutes}:{seconds}
              </p>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                {mode === "study"
                  ? "Focus Session"
                  : "Break Time"}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">

        {!isRunning ? (
          <button
            onClick={handleStart}
            className="flex items-center gap-2 rounded-xl bg-[var(--lavender-primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--lavender-dark)] active:scale-95"
          >
            <Play size={17} />
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex items-center gap-2 rounded-xl bg-[var(--lavender-primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--lavender-dark)] active:scale-95"
          >
            <Pause size={17} />
            Pause
          </button>
        )}

        <button
          onClick={handleReset}
          className="flex items-center gap-2 rounded-xl bg-[var(--lavender-soft)] px-5 py-3 text-sm font-medium text-[var(--lavender-dark)] transition hover:bg-[var(--lavender-light)] active:scale-95 "
        >
          <RotateCcw size={17} />
          Reset
        </button>

      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-black/20 p-5 backdrop-blur-sm">

          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Settings2
                  size={19}
                  className="text-[var(--lavender-primary)]"
                />

                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  Timer Settings
                </h3>

              </div>

              <button
                onClick={() => setShowSettings(false)}
                aria-label="Close settings"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-[var(--lavender-soft)] hover:text-[var(--lavender-dark)]"
              >
                <X size={19} />
              </button>

            </div>

            <div className="mt-6 space-y-5">

              {/* Study Duration */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-600">
                  Study Duration
                </label>

                <div className="flex items-center gap-2">

                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={studyMinutes}
                    onChange={(e) =>
                      setStudyMinutes(
                        Math.max(
                          1,
                          Number(e.target.value) || 1
                        )
                      )
                    }
                    className="w-full rounded-xl border border-[var(--lavender-light)] bg-[var(--lavender-soft)] px-4 py-3 text-gray-700 outline-none transition focus:border-[var(--lavender-primary)] focus:ring-2 focus:ring-[var(--lavender-light)]"
                  />

                  <span className="text-sm text-[var(--text-muted)]">
                    min
                  </span>

                </div>

              </div>

              {/* Break Duration */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-600">
                  Break Duration
                </label>

                <div className="flex items-center gap-2">

                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={breakMinutes}
                    onChange={(e) =>
                      setBreakMinutes(
                        Math.max(
                          1,
                          Number(e.target.value) || 1
                        )
                      )
                    }
                    className="w-full rounded-xl border border-[var(--lavender-light)] bg-[var(--lavender-soft)] px-4 py-3 text-gray-700 outline-none transition focus:border-[var(--lavender-primary)] focus:ring-2 focus:ring-[var(--lavender-light)]"
                  />

                  <span className="text-sm text-[var(--text-muted)]">
                    min
                  </span>

                </div>

              </div>

              {/* Save */}
              <button
                onClick={saveSettings}
                className="w-full rounded-xl bg-[var(--lavender-primary)] py-3 font-medium text-white transition hover:bg-[var(--lavender-dark)] active:scale-[0.98]"
              >
                Save Settings
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}