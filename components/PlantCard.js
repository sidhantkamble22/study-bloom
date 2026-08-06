import { FaLeaf } from "react-icons/fa";

export default function PlantCard() {
  return (
    <div className="mt-8 bg-white rounded-[32px] shadow-lg p-6">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm">My Plant</p>

          <h2 className="text-2xl font-bold text-[#6B46C1]">
            Little Sprout 🌱
          </h2>

          <p className="text-gray-500 mt-1">
            Level 1
          </p>
        </div>

        <div className="w-24 h-24 bg-[#F4EDFF] rounded-full flex items-center justify-center text-5xl">
          🌱
        </div>

      </div>

      <div className="mt-6">

        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">
            Growth Progress
          </span>

          <span className="text-sm font-semibold">
            6 / 20
          </span>
        </div>

        <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
          <div className="w-[30%] h-full bg-[#8BC34A] rounded-full"></div>
        </div>

      </div>

      <button className="mt-6 w-full bg-[#CDB4FF] hover:bg-[#b89df8] text-white py-3 rounded-full font-semibold transition">
        💧 Water Plant
      </button>

    </div>
  );
}