"use client";

import { useContext } from "react";
import { TasksContext } from "@/contexts/TasksContext";
import FilterButton from "./FilterButton";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { FaListCheck } from "react-icons/fa6";
import useClickSound from "@/hooks/useClickSound";

export default function FilterBox() {
  const { filter, setFilter } = useContext(TasksContext);
  const { playClick } = useClickSound("/sounds/click.wav");

  const buttons = [
    { icon: <FaListCheck />, title: "all" },
    { icon: <IoMdCheckmark />, title: "complete" },
    { icon: <IoCloseSharp />, title: "incomplete" },
  ];

  return (
    <div className="border-2 border-gray-300 dark:border-gray-500 rounded-xl p-1 flex justify-around items-center shadow-[2px_2px_0_#00000020]">
      {buttons.map((b) => (
        <FilterButton
          key={b.title}
          clickAudio={playClick}
          icon={b.icon}
          title={b.title}
          isActive={filter === b.title}
          setIsActive={() => setFilter(b.title)}
        />
      ))}
    </div>
  );
}
