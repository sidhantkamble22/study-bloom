"use client";

import { useEffect, useState } from "react";
import { Sprout, Droplets, Lock, CheckCircle2 } from "lucide-react";

const PLANT_STAGES = [
  {
    stage: 1,
    title: "Tiny Seed",
    description: "Your little plant is waiting to grow.",
    sessions: "0–3 Sessions",
    image: "/plants/stage-1.png",
  },
  {
    stage: 2,
    title: "Little Sprout",
    description: "A small sprout is starting to appear.",
    sessions: "4–8 Sessions",
    image: "/plants/stage-2.png",
  },
  {
    stage: 3,
    title: "Young Plant",
    description: "Your plant is growing stronger every day.",
    sessions: "9–15 Sessions",
    image: "/plants/stage-3.png",
  },
  {
    stage: 4,
    title: "Beautiful Plant",
    description: "You grew a beautiful plant through your focus.",
    sessions: "16+ Sessions",
    image: "/plants/stage-4.png",
  },
];

const RAIN_DROPS = [
  { left: "5%", delay: "0s", duration: "0.8s" },
  { left: "10%", delay: "0.2s", duration: "0.9s" },
  { left: "16%", delay: "0.4s", duration: "0.75s" },
  { left: "22%", delay: "0.1s", duration: "0.85s" },
  { left: "28%", delay: "0.5s", duration: "0.9s" },
  { left: "34%", delay: "0.25s", duration: "0.75s" },
  { left: "40%", delay: "0.6s", duration: "0.85s" },
  { left: "46%", delay: "0.15s", duration: "0.8s" },
  { left: "52%", delay: "0.45s", duration: "0.9s" },
  { left: "58%", delay: "0.05s", duration: "0.75s" },
  { left: "64%", delay: "0.35s", duration: "0.85s" },
  { left: "70%", delay: "0.55s", duration: "0.8s" },
  { left: "76%", delay: "0.2s", duration: "0.9s" },
  { left: "82%", delay: "0.4s", duration: "0.75s" },
  { left: "88%", delay: "0.1s", duration: "0.85s" },
  { left: "94%", delay: "0.5s", duration: "0.8s" },
];

function getPlantStage(sessions) {
  const safeSessions = Math.max(0, Number(sessions) || 0);
  if (safeSessions >= 16) return 4;
  if (safeSessions >= 9) return 3;
  if (safeSessions >= 4) return 2;
  return 1;
}

export default function Plant({
  sessionCompleted = 0,
  onResetPlant,
}) {
  const [watered, setWatered] = useState(false);
  const [isWatering, setIsWatering] = useState(false);

  const safeSessionCompleted = Math.max(0, Number(sessionCompleted) || 0);
  const stage = getPlantStage(safeSessionCompleted);
  const currentPlant = PLANT_STAGES[stage - 1];

  const progress = Math.min((safeSessionCompleted / 16) * 100, 100);

  useEffect(() => {
    setWatered(false);
  }, [safeSessionCompleted]);

  const handleWater = () => {
    if (watered || isWatering || stage === 4) return;

    setIsWatering(true);

    const timer = setTimeout(() => {
      setIsWatering(false);
      setWatered(true);
    }, 2000);

    return () => clearTimeout(timer);
  };
  const handleResetPlant = () => {
  const confirmed = window.confirm(
    "Your plant is fully grown. Do you want to start a new plant?"
  );

  if (!confirmed) return;

  onResetPlant?.();
};
  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-purple-100 bg-white p-6 shadow-[0_8px_30px_rgba(124,58,237,0.06)] md:p-7">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--lavender-soft)]">
            <Sprout size={21} className="text-[var(--lavender-primary)]" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[var(--lavender-dark)]">
              My Plant
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Grow with every study session
            </p>
          </div>
        </div>

        <div className="rounded-full bg-[var(--lavender-soft)] px-3 py-1.5 text-xs font-medium text-[var(--lavender-dark)]">
          Stage {stage}/4
        </div>
      </div>

      {/* Plant Image */}
      <div className="mt-6 flex justify-center">
        <div className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-purple-100 bg-[var(--lavender-soft)]">
          <img
            src={currentPlant.image}
            alt={currentPlant.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/plants/stage-1.png";
            }}
            className={`h-auto w-full object-contain transition-transform duration-700 ${
              isWatering ? "scale-[1.02]" : ""
            }`}
          />

          {isWatering && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {RAIN_DROPS.map((drop, index) => (
                <span
                  key={`rain-${index}`}
                  className="absolute -top-6 h-5 w-[2px] rounded-full bg-white/80"
                  style={{
                    left: drop.left,
                    animation: `plantRain ${drop.duration} linear ${drop.delay} infinite`,
                  }}
                />
              ))}

              <div className="absolute inset-0 bg-blue-300/5 animate-pulse" />

              <span className="plant-splash splash-one" />
              <span className="plant-splash splash-two" />
              <span className="plant-splash splash-three" />
            </div>
          )}
        </div>
      </div>

      {/* Plant information */}
      <div className="mt-5 text-center">
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {currentPlant.title}
          </h3>

          {stage === 4 && (
            <CheckCircle2 size={18} className="text-[var(--lavender-primary)]" />
          )}
        </div>

        <p className="mx-auto mt-1 max-w-md text-sm text-[var(--text-muted)]">
          {currentPlant.description}
        </p>
      </div>

      {/* Growth */}
      <div className="mx-auto mt-5 w-full max-w-sm">
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
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-2 text-center text-[11px] text-gray-400">
          {safeSessionCompleted} study{" "}
          {safeSessionCompleted === 1 ? "session" : "sessions"} completed
        </p>
      </div>

      {/* Water button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleWater}
          disabled={watered || isWatering || stage === 4}
          className={`mt-5 flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300 active:scale-95 ${
            stage === 4
              ? "cursor-not-allowed bg-[var(--lavender-light)] text-[var(--lavender-dark)]"
              : watered
              ? "cursor-not-allowed bg-purple-100 text-purple-600"
              : isWatering
              ? "cursor-wait bg-purple-500 text-white"
              : "bg-[var(--lavender-primary)] text-white shadow-md shadow-purple-200 hover:bg-[var(--lavender-dark)]"
          }`}
        >
          {stage === 4 ? (
            <>
              <CheckCircle2 size={18} />
              Fully Grown
            </>
          ) : isWatering ? (
            <>
              <Droplets size={18} className="animate-bounce" />
              Watering...
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

        {stage === 4 && (
  <div className="mt-4 flex justify-center">
    <button
      type="button"
      onClick={handleResetPlant}
      className="rounded-xl bg-[var(--lavender-primary)] px-6 py-3 text-sm font-medium text-white shadow-md transition hover:bg-[var(--lavender-dark)] active:scale-95"
    >
      🌱 Reset & Grow Again
    </button>
  </div>
)}
      </div>

      {/* Stage cards */}
      <div className="mx-auto mt-6 grid w-full max-w-md grid-cols-4 gap-2">
        {PLANT_STAGES.map((plant) => {
          const isCurrent = plant.stage === stage;
          const isLocked = plant.stage > stage;
          const isCompleted = plant.stage < stage;

          const label =
            plant.stage === 1
              ? "Seed"
              : plant.stage === 2
              ? "Sprout"
              : plant.stage === 3
              ? "Young"
              : "Bloom";

          return (
            <div
              key={plant.stage}
              className={`rounded-xl p-2 text-center transition-all duration-300 ${
                isCurrent
                  ? "bg-[var(--lavender-light)] ring-1 ring-purple-200"
                  : "bg-[var(--lavender-soft)]"
              }`}
            >
              <div
                className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                  isCurrent || isCompleted
                    ? "bg-[var(--lavender-primary)] text-white"
                    : "bg-[var(--lavender-light)] text-[var(--lavender-dark)]"
                }`}
              >
                {isLocked ? <Lock size={13} /> : plant.stage}
              </div>

              <p className="mt-1 truncate text-[9px] font-medium text-[var(--text-muted)]">
                {label}
              </p>

              <p className="mt-0.5 truncate text-[8px] text-gray-400">
                {plant.sessions}
              </p>
            </div>
          );
        })}
      </div>

      {/* Animation CSS */}
<style>{`
  @keyframes plantRain {
    0% {
      transform: translateY(-30px) translateX(0);
      opacity: 0;
    }

    15% {
      opacity: 0.8;
    }

    85% {
      opacity: 0.8;
    }

    100% {
      transform: translateY(330px) translateX(-12px);
      opacity: 0;
    }
  }

  .plant-splash {
    position: absolute;
    bottom: 12%;
    width: 8px;
    height: 4px;
    border: 1.5px solid rgba(139, 92, 246, 0.45);
    border-radius: 50%;
    transform: translateX(-50%);
    animation: plantSplash 0.9s ease-out infinite;
  }

  .splash-one {
    left: 42%;
  }

  .splash-two {
    left: 50%;
    animation-delay: 0.25s;
  }

  .splash-three {
    left: 58%;
    animation-delay: 0.5s;
  }

  @keyframes plantSplash {
    0% {
      width: 5px;
      height: 3px;
      opacity: 0.8;
    }

    70% {
      width: 25px;
      height: 8px;
      opacity: 0.35;
    }

    100% {
      width: 35px;
      height: 10px;
      opacity: 0;
    }
  }
`}</style>
    </div>
  );
}