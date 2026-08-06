"use client";

import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between">

      <div>
        <p className="text-sm font-medium text-violet-600">
          Good Evening
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-1">
          Welcome Back
        </h2>
      </div>

      <div className="flex items-center gap-3">

        <button className="w-11 h-11 rounded-2xl bg-white shadow-md flex items-center justify-center hover:scale-105 transition">
          <Search size={20} />
        </button>

        <button className="w-11 h-11 rounded-2xl bg-white shadow-md flex items-center justify-center hover:scale-105 transition">
          <Bell size={20} />
        </button>

        <button className="w-11 h-11 rounded-2xl bg-violet-500 text-white shadow-lg flex items-center justify-center">
          <UserCircle2 size={24} />
        </button>

      </div>
    </header>
  );
}