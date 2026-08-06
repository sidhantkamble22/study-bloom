import Navbar from "@/components/Navbar";
import TimerCard from "@/components/TimerCard";
import PlantCard from "@/components/PlantCard";
import TaskCard from "@/components/TaskCard";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F2FF]">

      {/* Container */}
      <div className="max-w-md mx-auto px-5 pt-8 pb-28">

        {/* Navbar */}
        <Navbar />

        {/* Welcome */}
        <section className="mt-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            StudyBloom
          </h1>

          <p className="mt-2 text-gray-500 leading-7">
            Stay focused, grow your virtual plant and build your study streak.
          </p>
        </section>

        {/* Timer */}
        <section className="mt-8">
          <TimerCard />
        </section>

        {/* Plant */}
        <section className="mt-8">
          <PlantCard />
        </section>

        {/* Tasks */}
        <section className="mt-8">
          <TaskCard />
        </section>

      </div>

      {/* Bottom Navigation */}
      

    </main>
  );
}