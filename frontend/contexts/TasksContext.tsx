import { TodoType } from "@/types/TodoType";
import { createContext } from "react";

type TasksContextType = {
  allTasks: TodoType[];
  tasks: TodoType[];
  isLoading: boolean;
  isError: boolean;
  filter: string;
  setFilter: (f: string) => void;
};

export const TasksContext = createContext<TasksContextType>({
  allTasks: [],
  tasks: [],
  isLoading: false,
  isError: false,
  filter: "all",
  setFilter: () => {},
});
