import Navbar from "@/components/Navbar";
import TimerCard from "@/components/TimerCard";
import PlantCard from "@/components/PlantCard";
import TaskCard from "@/components/TaskCard";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F5FF]">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-8">

        <Navbar />

        <section className="mt-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            StudyBloom
          </h1>

          <p className="text-gray-500 mt-3">
            Focus, learn and grow every day.
          </p>
        </section>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

          <div className="lg:col-span-2">
            <TimerCard />
          </div>


          <div>
            <PlantCard />
          </div>

        </div>


        <div className="mt-8 max-w-3xl">
          <TaskCard />
        </div>


      </div>

      <div className="md:hidden">
        <BottomNav />
      </div>

    </main>
  );
}