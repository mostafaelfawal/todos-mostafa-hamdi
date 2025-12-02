import { TasksContext } from "@/contexts/TasksContext";
import { useContext } from "react";

export default function useProgressCalc() {
  // Use the raw list (allTasks) so progress reflects total tasks and updates
  // immediately when we do optimistic updates on the cache.
  const { allTasks } = useContext(TasksContext);

  if (!allTasks || allTasks.length === 0) return 0;

  const completedTasks = allTasks.filter((t) => t.completed);
  const percentage = (completedTasks.length / allTasks.length) * 100;
  return percentage;
}
