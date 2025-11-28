"use client"

import TasksProvider from "@/contexts/TasksProvider";
import FilterBox from "./FilterBox";
import Progress from "./Progress";
import TodoForm from "./TodoForm";
import TodosBox from "./TodosBox";

export default function Main() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md border-2 border-gray-300 dark:border-gray-500 rounded-xl p-4 space-y-3 shadow-[3px_3px_0_#00000020]">
        <TasksProvider>
          <TodoForm />
          <FilterBox />
          <TodosBox />
          <Progress />
        </TasksProvider>
      </div>
    </div>
  );
}
