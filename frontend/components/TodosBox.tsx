"use client";

import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import TodoCard from "./TodoCard/TodoCard";
import { TodoType } from "@/types/TodoType";
import useClickSound from "@/hooks/useClickSound";
import { TasksContext } from "@/contexts/TasksContext";
import EmptyState from "./EmptyState";

export default function TodosBox() {
  const playSuccess = useClickSound("/sounds/successClick.wav");
  const playUndo = useClickSound("/sounds/undoClick.wav");

  const { isLoading, isError, tasks, filter } = useContext(TasksContext);

  useEffect(() => {
    if (isError) toast.error("An error occurred while fetching tasks");
  }, [isError]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-gray-300 dark:border-gray-500 rounded-xl shadow-[3px_3px_0_#00000020]">
        <p className="animate-pulse text-gray-700 dark:text-white">
          Loading tasks...
        </p>
        <div className="rounded-full border-3 border-green-400 border-b-transparent animate-spin w-5 h-5"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return filter !== "all" ? (
      <EmptyState
        image="/no-data.svg"
        title="There are no specific tasks for this filter."
        subtitle="Add your first task"
      />
    ) : (
      <EmptyState
        image="/no-todos.svg"
        title="No tasks have been added yet."
        subtitle="Add your first task"
      />
    );
  }

  return (
    <div className="space-y-2 overflow-y-auto max-h-55 py-2 px-1 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-gray-200 dark:scrollbar-thumb-green-400 dark:scrollbar-track-gray-700">
      {tasks.map((t: TodoType) => (
        <TodoCard
          key={t._id}
          playSuccess={playSuccess.playClick}
          playUndo={playUndo.playClick}
          _id={t._id}
          title={t.title}
          completed={t.completed}
        />
      ))}
    </div>
  );
}
