import { Leaf, UserRound } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 mb-6 flex items-center justify-between rounded-2xl border border-purple-100/70 bg-white/85 px-5 py-3 shadow-[0_8px_30px_rgba(124,58,237,0.08)] backdrop-blur-xl md:px-6">

      {/* Brand */}
      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
          <Leaf
            size={21}
            className="text-purple-600"
            strokeWidth={2}
          />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Lumé
          </h1>

          <p className="hidden text-[11px] font-medium tracking-wide text-purple-500 sm:block">
            FOCUS • GROW • ACHIEVE
          </p>
        </div>

      </div>

      {/* Developer */}
      <div className="flex items-center gap-3 rounded-full border border-purple-100 bg-purple-50/70 py-1.5 pl-2 pr-4">

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600">
          <UserRound
            size={16}
            className="text-white"
          />
        </div>

        <div className="hidden sm:block">
          <p className="text-[10px] font-medium uppercase tracking-wider text-purple-400">
            Developer
          </p>

          <p className="text-sm font-semibold text-gray-800">
            Sidhant
          </p>
        </div>

      </div>

    </nav>
  );
}