import { UserRound } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-6">

      <h1 className="text-3xl font-bold text-purple-700">
        Study Bloom
      </h1>

      <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
        <UserRound size={20} className="text-purple-600" />

        <span className="font-medium text-gray-700">
          Sidhant
        </span>
      </div>

    </nav>
  );
}