import { TasksContext } from "@/contexts/TasksContext";
import { useContext } from "react";

export default function useProgressCalc() {
  const { tasks, isLoading } = useContext(TasksContext);

  if (isLoading || !tasks) return 0; // لو البيانات لسه بتتحمل
  if (tasks.length === 0) return 0;

  const completedTasks = tasks.filter((t) => t.completed);
  const percentage = (completedTasks.length / tasks.length) * 100; // صححت العملية الحسابية
  return percentage;
}
