import Navbar from "@/components/Navbar";
import Timer from "@/components/Timer";
import TaskList from "@/components/TaskList";
import Plant from "@/components/Plant";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3E8FF] px-6 pb-10">

      <Navbar />

      <section className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">

        <div className="md:col-span-2">
          <Timer />
        </div>

        <div>
          <TaskList />
        </div>

      </section>

      <section className="mx-auto mt-6 max-w-6xl">
        <Plant />
      </section>

    </main>
  );
}