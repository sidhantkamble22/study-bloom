"use client";

import {
  Timer,
  ListTodo,
  Sprout,
  Music2,
} from "lucide-react";

const navItems = [
  {
    name: "Timer",
    icon: Timer,
    target: "timer-section",
  },
  {
    name: "Tasks",
    icon: ListTodo,
    target: "tasks-section",
  },
  {
    name: "Plant",
    icon: Sprout,
    target: "plant-section",
  },
  {
    name: "Music",
    icon: Music2,
    target: "music-section",
  },
];

export default function BottomNav() {
  const scrollToSection = (target) => {
    const section = document.getElementById(target);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2">

      <div className="flex items-center justify-around rounded-2xl border border-purple-100 bg-white/95 px-3 py-3 shadow-xl backdrop-blur-md">

        {/* Timer */}
        <button
          onClick={() => scrollToSection("timer-section")}
          className="flex min-w-[60px] flex-col items-center gap-1 rounded-xl px-3 py-2 text-gray-400 transition hover:bg-purple-50 hover:text-purple-600"
        >
          <Timer size={21} />

          <span className="text-[11px] font-medium">
            Timer
          </span>
        </button>


        {/* Tasks */}
        <button
          onClick={() => scrollToSection("tasks-section")}
          className="flex min-w-[60px] flex-col items-center gap-1 rounded-xl px-3 py-2 text-gray-400 transition hover:bg-purple-50 hover:text-purple-600"
        >
          <ListTodo size={21} />

          <span className="text-[11px] font-medium">
            Tasks
          </span>
        </button>


        {/* Plant */}
        <button
          onClick={() => scrollToSection("plant-section")}
          className="flex min-w-[60px] flex-col items-center gap-1 rounded-xl px-3 py-2 text-gray-400 transition hover:bg-purple-50 hover:text-purple-600"
        >
          <Sprout size={21} />

          <span className="text-[11px] font-medium">
            Plant
          </span>
        </button>


        {/* Music */}
        <button
          onClick={() => scrollToSection("music-section")}
          className="flex min-w-[60px] flex-col items-center gap-1 rounded-xl px-3 py-2 text-gray-400 transition hover:bg-purple-50 hover:text-purple-600"
        >
          <Music2 size={21} />

          <span className="text-[11px] font-medium">
            Music
          </span>
        </button>

      </div>

    </nav>
  );
}