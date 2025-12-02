"use client";

import { FormEvent, useState } from "react";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useClickSound from "@/hooks/useClickSound";
import { addTask } from "@/api/tasks";

export default function TodoForm() {
  const [task, setTask] = useState<string>("");
  const queryClient = useQueryClient();
  const { playClick } = useClickSound("/sounds/click.wav");

  // mutation لإضافة مهمة جديدة
  const addTaskMutation = useMutation({
    mutationFn: (newTask: string) => addTask(newTask),
    // optimistic update: add the new task to the cache immediately so UI
    // (including the progress bar) updates without waiting for the server
    onMutate: async (newTitle: string) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previous = queryClient.getQueryData<any[]>(["tasks"]);
      const tempTask = {
        _id: `temp-${Date.now()}`,
        title: newTitle,
        completed: false,
      };
      queryClient.setQueryData(["tasks"], (old: any[] | undefined) => [
        ...(old ?? []),
        tempTask,
      ]);
      return { previous };
    },
    onError: (_err, _newTitle, context: any) => {
      // rollback
      if (context?.previous) {
        queryClient.setQueryData(["tasks"], context.previous);
      }
      toast.error("Failed to add task");
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setTask(""); // تفريغ الحقل
      // refresh from server so temporary IDs get replaced with real ones
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
        refetchType: "active",
      });
    },
  });

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    playClick();
    if (!task.trim()) return toast.error("Enter a task first!");
    addTaskMutation.mutate(task);
  };

  return (
    <form onSubmit={handleAdd} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Enter your task..."
        autoFocus
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="flex-1 px-3 py-2 rounded-xl border-2 border-gray-300 dark:border-gray-500 outline-none 
                   hover:border-green-400 focus:border-green-400 text-gray-800 
                   transition-all shadow-[2px_2px_0_#00000020] dark:placeholder-gray-300 dark:text-white"
      />

      <button
        type="submit"
        disabled={addTaskMutation.isPending}
        className="flex gap-2 items-center text-sm bg-green-400 rounded-xl px-3 py-2 
                   border-2 border-gray-300 dark:border-gray-500 text-white hover:brightness-110 
                   transition-all min-w-fit disabled:opacity-60 
                   shadow-[2px_2px_0_#00000020] active:translate-y-0.5 active:shadow-none"
      >
        {addTaskMutation.isPending ? (
          "Adding..."
        ) : (
          <>
            <FaPlus /> Add
          </>
        )}
      </button>
    </form>
  );
}
