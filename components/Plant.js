"use client";

import { useState } from "react";
import { Droplets, Sprout } from "lucide-react";

export default function Plant() {
  const [stage, setStage] = useState(1);

  const waterPlant = () => {
    if (stage < 4) {
      setStage((prev) => prev + 1);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <div className="flex items-center gap-2">
            <Sprout size={22} className="text-purple-600" />

            <h2 className="text-xl font-semibold text-purple-700">
              My Plant
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-400">
            Grow your plant with every study session
          </p>
        </div>

        <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-600">
          Stage {stage}/4
        </span>

      </div>


      {/* Plant */}
      <div className="mt-6 flex min-h-[300px] items-center justify-center">

        <img
          src={`/plants/stage-${stage}.png`}
          alt={`Plant growth stage ${stage}`}
          className="h-64 w-full object-contain"
        />

      </div>


      {/* Progress */}
      <div className="mt-4">

        <div className="mb-2 flex justify-between text-sm">

          <span className="text-gray-500">
            Growth Progress
          </span>

          <span className="font-medium text-purple-600">
            {stage * 25}%
          </span>

        </div>


        <div className="h-2 overflow-hidden rounded-full bg-purple-100">

          <div
            className="h-full rounded-full bg-purple-500 transition-all duration-500"
            style={{
              width: `${stage * 25}%`,
            }}
          />

        </div>

      </div>


      {/* Water Button */}
      <button
        onClick={waterPlant}
        disabled={stage === 4}
        className="mx-auto mt-6 flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-200"
      >

        <Droplets size={19} />

        {stage === 4 ? "Fully Grown" : "Water Plant"}

      </button>

    </div>
  );
}