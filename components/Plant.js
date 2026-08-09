"use client";

import { useEffect, useState } from "react";
import {
  Sprout,
  Droplets,
  Lock,
  CheckCircle2,
} from "lucide-react";

const PLANT_STAGES = [
  {
    stage: 1,
    title: "Tiny Seed",
    description: "Your little plant is waiting to grow.",
    image: "/plants/stage-1.png",
  },
  {
    stage: 2,
    title: "Little Sprout",
    description: "A small sprout is starting to appear.",
    image: "/plants/stage-2.png",
  },
  {
    stage: 3,
    title: "Growing Plant",
    description: "Your plant is becoming healthier and stronger.",
    image: "/plants/stage-3.png",
  },
  {
    stage: 4,
    title: "Beautiful Plant",
    description: "You grew a beautiful plant through your focus.",
    image: "/plants/stage-4.png",
  },
];

export default function Plant({ sessionCompleted = 0 }) {
  const [stage, setStage] = useState(1);
  const [watered, setWatered] = useState(false);

  const currentPlant = PLANT_STAGES[stage - 1];

  // Water plant
  const handleWater = () => {
    if (watered) return;

    setWatered(true);

    if (stage < 4) {
      setStage((prev) => prev + 1);
    }
  };

  // Reset watering status when new study session completes
  useEffect(() => {
    if (sessionCompleted > 0) {
      setWatered(false);
    }
  }, [sessionCompleted]);

  const progress = ((stage - 1) / 3) * 100;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--lavender-soft)]">
            <Sprout
              size={21}
              className="text-[var(--lavender-primary)]"
            />
          </div>

          <div>

            <h2 className="text-xl font-semibold text-[var(--lavender-dark)]">
              My Plant
            </h2>

            <p className="text-xs text-[var(--text-muted)]">
              Grow your plant with every study session
            </p>

          </div>

        </div>

        {/* Stage */}
        <div className="rounded-full bg-[var(--lavender-soft)] px-3 py-1.5 text-xs font-medium text-[var(--lavender-dark)]">
          Stage {stage}/4
        </div>

      </div>


      {/* Plant Area */}
      <div className="mt-6 flex flex-col items-center">

        {/* Plant Image */}
        <div className="flex h-64 w-full max-w-sm items-center justify-center rounded-3xl bg-[var(--lavender-soft)]">

          <img
            src={currentPlant.image}
            alt={currentPlant.title}
            className="h-52 w-52 object-contain transition-all duration-500"
          />

        </div>


        {/* Plant Info */}
        <div className="mt-5 text-center">

          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {currentPlant.title}
          </h3>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {currentPlant.description}
          </p>

        </div>


        {/* Progress */}
        <div className="mt-5 w-full max-w-sm">

          <div className="mb-2 flex items-center justify-between">

            <span className="text-xs font-medium text-[var(--text-muted)]">
              Growth
            </span>

            <span className="text-xs font-medium text-[var(--lavender-dark)]">
              {Math.round(progress)}%
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[var(--lavender-light)]">

            <div
              className="h-full rounded-full bg-[var(--lavender-primary)] transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>


        {/* Water Button */}
        <button
          onClick={handleWater}
          disabled={watered || stage === 4}
          className={`mt-6 flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white transition active:scale-95 ${
            watered || stage === 4
              ? "cursor-not-allowed bg-[var(--lavender-light)] text-[var(--lavender-dark)]"
              : "bg-[var(--lavender-primary)] hover:bg-[var(--lavender-dark)]"
          }`}
        >

          {stage === 4 ? (
            <>
              <CheckCircle2 size={18} />
              Fully Grown
            </>
          ) : watered ? (
            <>
              <CheckCircle2 size={18} />
              Watered
            </>
          ) : (
            <>
              <Droplets size={18} />
              Water Plant
            </>
          )}

        </button>


        {/* Stage Information */}
        <div className="mt-6 grid w-full max-w-sm grid-cols-4 gap-2">

          {PLANT_STAGES.map((plant) => {

            const isCompleted = plant.stage < stage;
            const isCurrent = plant.stage === stage;
            const isLocked = plant.stage > stage;

            return (
              <div
                key={plant.stage}
                className={`flex flex-col items-center rounded-xl p-2 transition ${
                  isCurrent
                    ? "bg-[var(--lavender-light)]"
                    : "bg-[var(--lavender-soft)]"
                }`}
              >

                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    isCompleted || isCurrent
                      ? "bg-[var(--lavender-primary)] text-white"
                      : "bg-[var(--lavender-light)] text-[var(--lavender-dark)]"
                  }`}
                >

                  {isLocked ? (
                    <Lock size={13} />
                  ) : (
                    plant.stage
                  )}

                </div>

                <span className="mt-1 text-[9px] font-medium text-[var(--text-muted)]">
                  Stage {plant.stage}
                </span>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}