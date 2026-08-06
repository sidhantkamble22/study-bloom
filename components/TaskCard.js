"use client";

import { Check, CirclePlus, BookOpen, Code2 } from "lucide-react";

export default function TaskCard() {
  const tasks = [
    {
      id: 1,
      title: "React Practice",
      icon: Code2,
      completed: true,
    },
    {
      id: 2,
      title: "DSA Revision",
      icon: BookOpen,
      completed: false,
    },
    {
      id: 3,
      title: "Build Project",
      icon: Code2,
      completed: false,
    },
  ];


  return (
    <section className="
      bg-white
      rounded-[32px]
      p-6
      shadow-lg
    ">

      {/* Header */}

      <div className="
        flex
        items-center
        justify-between
      ">

        <div>
          <p className="
            text-sm
            text-violet-500
            font-medium
          ">
            Today's Focus
          </p>

          <h2 className="
            text-2xl
            font-bold
            text-gray-900
            mt-1
          ">
            Tasks
          </h2>
        </div>


        <button className="
          w-11
          h-11
          rounded-2xl
          bg-violet-100
          flex
          items-center
          justify-center
          text-violet-600
          hover:scale-105
          transition
        ">
          <CirclePlus size={22}/>
        </button>

      </div>



      {/* Task List */}

      <div className="
        mt-6
        space-y-4
      ">

        {tasks.map((task)=>{

          const Icon = task.icon;

          return (

            <div
              key={task.id}
              className="
                flex
                items-center
                justify-between
                bg-[#F8F5FF]
                rounded-2xl
                p-4
              "
            >

              <div className="
                flex
                items-center
                gap-4
              ">


                <div className="
                  w-11
                  h-11
                  rounded-xl
                  bg-white
                  flex
                  items-center
                  justify-center
                  text-violet-600
                ">
                  <Icon size={21}/>
                </div>


                <p className={`
                  font-semibold
                  ${
                    task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                  }
                `}>
                  {task.title}
                </p>


              </div>



              <button className={`
                w-8
                h-8
                rounded-full
                flex
                items-center
                justify-center

                ${
                  task.completed
                  ? "bg-violet-600 text-white"
                  : "border-2 border-gray-300"
                }
              `}>

                {
                  task.completed && (
                    <Check size={16}/>
                  )
                }

              </button>


            </div>

          )

        })}


      </div>


    </section>
  );
}