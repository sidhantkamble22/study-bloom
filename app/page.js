"use client";

import { useCallback, useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Timer from "@/components/Timer";
import TaskList from "@/components/TaskList";
import Plant from "@/components/Plant";
import BottomNav from "@/components/BottomNav";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  const [sessionCompleted, setSessionCompleted] =
    useState(0);

    useEffect(() => {
  const savedSessions = localStorage.getItem("studySessions");

  if (savedSessions !== null) {
    setSessionCompleted(Number(savedSessions));
  }
}, []);


const handleSessionComplete = useCallback(() => {
  setSessionCompleted((prev) => {
    const newCount = prev + 1;

    localStorage.setItem(
      "studySessions",
      String(newCount)
    );

    return newCount;
  });
}, []);

const handleResetPlant = useCallback(() => {
  setSessionCompleted(0);
  localStorage.setItem("studySessions", "0");
}, []);


  return (
    <main className="min-h-screen bg-[var(--background)]">

      {/* Navbar */}
      <Navbar />

      <div className="mx-auto w-full max-w-7xl px-4 pb-28 sm:px-6 lg:px-8">

        {/* ============================= */}
        {/* TIMER + TASKS */}
        {/* ============================= */}

        <section className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">

          {/* Timer */}
          <div
            id="timer-section"
            className="scroll-mt-24 min-w-0"
          >
            <Timer
              onSessionComplete={
                handleSessionComplete
              }
            />
          </div>

          {/* Tasks */}
          <div
            id="tasks-section"
            className="scroll-mt-24 min-w-0"
          >
            <TaskList />
          </div>

        </section>


        {/* ============================= */}
        {/* PLANT + MUSIC */}
        {/* ============================= */}

        <section className="mt-6 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">

          {/* Plant */}
          <div
            id="plant-section"
            className="scroll-mt-24 min-w-0"
          >
           <Plant
  sessionCompleted={sessionCompleted}
  onResetPlant={handleResetPlant}
/>
          </div>

          {/* Music */}
          <div
            id="music-section"
            className="scroll-mt-24 min-w-0"
          >
            <MusicPlayer />
          </div>

        </section>

      </div>


      {/* Bottom Navigation */}
      <BottomNav />

    </main>
  );
}