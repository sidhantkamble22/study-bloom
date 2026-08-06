"use client";

import Image from "next/image";
import { Droplets, Sprout } from "lucide-react";
import { motion } from "framer-motion";

export default function PlantCard() {

  return (
    <section
      className="
        bg-white
        rounded-[32px]
        p-6
        shadow-lg
      "
    >

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <p className="
            text-sm
            text-violet-500
            font-medium
          ">
            Your Plant
          </p>


          <h2 className="
            text-2xl
            font-bold
            text-gray-900
            mt-1
          ">
            Little Sprout
          </h2>


          <p className="
            text-gray-400
            mt-1
          ">
            Growth Level 1
          </p>

        </div>



        <motion.div
          animate={{
            y:[0,-8,0]
          }}
          transition={{
            duration:3,
            repeat:Infinity
          }}

          className="
            w-28
            h-28
            rounded-full
            bg-violet-50
            flex
            items-center
            justify-center
          "
        >

          <Sprout
            size={55}
            className="text-green-500"
          />

        </motion.div>


      </div>




      {/* Progress */}

      <div className="mt-7">


        <div className="
          flex
          justify-between
          text-sm
          mb-2
        ">

          <span className="text-gray-500">
            Growth Progress
          </span>


          <span className="
            font-semibold
            text-violet-600
          ">
            6 / 20
          </span>


        </div>



        <div
          className="
            w-full
            h-3
            bg-gray-100
            rounded-full
            overflow-hidden
          "
        >

          <motion.div

            initial={{
              width:0
            }}

            animate={{
              width:"30%"
            }}

            transition={{
              duration:1
            }}

            className="
              h-full
              bg-gradient-to-r
              from-violet-400
              to-green-400
              rounded-full
            "

          />

        </div>


      </div>





      {/* Water Button */}

      <button
        className="
          mt-7
          w-full
          h-14
          rounded-2xl
          bg-violet-600
          text-white
          font-semibold
          flex
          items-center
          justify-center
          gap-2
          hover:scale-[1.02]
          transition
          shadow-lg
        "
      >

        <Droplets size={20}/>

        Water Plant

      </button>


    </section>
  );
}