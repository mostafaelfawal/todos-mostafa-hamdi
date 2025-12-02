"use client";

import { ReactNode, useState, useMemo } from "react";
import { TasksContext } from "./TasksContext";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/api/tasks";
import { TodoType } from "@/types/TodoType";

export default function TasksProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState("all");

  const { isLoading, isError, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });

  // فلترة المهام بناءً على الفلتر الحالي
  const filteredTasks = useMemo(() => {
    if (!data) return [];
    switch (filter) {
      case "complete":
        return data.filter((t: TodoType) => t.completed);
      case "incomplete":
        return data.filter((t: TodoType) => !t.completed);
      default:
        return data;
    }
  }, [data, filter]);

  const allTasks = data ?? [];

  return (
    <TasksContext.Provider
      value={{
        isLoading,
        isError,
        allTasks,
        tasks: filteredTasks,
        filter,
        setFilter,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
