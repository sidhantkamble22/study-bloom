"use client";

import Link from "next/link";
import { Home, Sprout, CheckSquare, User } from "lucide-react";
import { usePathname } from "next/navigation";


export default function BottomNav() {

  const pathname = usePathname();


  const navItems = [
    {
      name: "Home",
      icon: Home,
      path: "/",
    },
    {
      name: "Plant",
      icon: Sprout,
      path: "/plant",
    },
    {
      name: "Tasks",
      icon: CheckSquare,
      path: "/tasks",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
  ];


  return (

    <nav className="
      fixed
      bottom-5
      left-1/2
      -translate-x-1/2
      w-[90%]
      max-w-md
      bg-white/90
      backdrop-blur-xl
      shadow-xl
      rounded-[28px]
      px-5
      py-4
      flex
      justify-between
      items-center
      border
      border-gray-100
    ">


      {
        navItems.map((item)=>{

          const Icon = item.icon;

          const active = pathname === item.path;


          return (

            <Link
              href={item.path}
              key={item.name}
              className="
                flex
                flex-col
                items-center
                gap-1
                transition
              "
            >

              <div
                className={`
                  w-11
                  h-11
                  rounded-2xl
                  flex
                  items-center
                  justify-center

                  ${
                    active
                    ? "bg-violet-600 text-white shadow-lg"
                    : "text-gray-400"
                  }
                `}
              >

                <Icon size={22}/>

              </div>


              <span
                className={`
                  text-xs
                  font-medium

                  ${
                    active
                    ? "text-violet-600"
                    : "text-gray-400"
                  }
                `}
              >
                {item.name}
              </span>


            </Link>

          )

        })
      }


    </nav>

  );
}