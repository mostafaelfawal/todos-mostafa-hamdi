"use client";

import { TodoType } from "@/types/TodoType";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTask, editTask } from "@/api/tasks";
import TodoActions from "./TodoActions";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

interface ITodoCard extends TodoType {
  playSuccess: VoidFunction;
  playUndo: VoidFunction;
}

export default function TodoCard({
  title,
  completed,
  _id,
  playSuccess,
  playUndo,
}: ITodoCard) {
  const [complete, setComplete] = useState<boolean>(completed);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>(title);
  const queryClient = useQueryClient();

  const editTaskMutation = useMutation({
    mutationFn: ({ _id, title, completed }: TodoType) =>
      editTask(_id!, title, completed),
    onMutate: async (updated: TodoType) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previous = queryClient.getQueryData<any[]>(["tasks"]);
      queryClient.setQueryData(["tasks"], (old: any[] | undefined) =>
        (old ?? []).map((t) =>
          t._id === updated._id ? { ...t, ...updated } : t
        )
      );
      return { previous };
    },
    onError: (_err, _vars, context: any) => {
      if (context?.previous)
        queryClient.setQueryData(["tasks"], context.previous);
      toast.error("Failed to update task");
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
        refetchType: "active",
      });
    },
    // error handled above in onError with rollback
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    // optimistic delete
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previous = queryClient.getQueryData<any[]>(["tasks"]);
      queryClient.setQueryData(["tasks"], (old: any[] | undefined) =>
        (old ?? []).filter((t) => t._id !== id)
      );
      return { previous };
    },
    onError: (_err, _id, context: any) => {
      if (context?.previous)
        queryClient.setQueryData(["tasks"], context.previous);
      toast.error("Failed to delete task");
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
        refetchType: "active",
      });
    },
    // error handled above in onError with rollback
  });

  const toggleTaskStateMutation = useMutation({
    mutationFn: ({ id, newCompleted }: { id: string; newCompleted: boolean }) =>
      editTask(id, title, newCompleted),
    onMutate: async ({
      id,
      newCompleted,
    }: {
      id: string;
      newCompleted: boolean;
    }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previous = queryClient.getQueryData<any[]>(["tasks"]);
      queryClient.setQueryData(["tasks"], (old: any[] | undefined) =>
        (old ?? []).map((t) =>
          t._id === id ? { ...t, completed: newCompleted } : t
        )
      );
      return { previous };
    },
    onError: (_err, _vars, context: any) => {
      if (context?.previous)
        queryClient.setQueryData(["tasks"], context.previous);
      toast.error("Failed to update task");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
        refetchType: "active",
      });
    },
  });

  function handleDeleteTask() {
    playUndo();
    deleteTaskMutation.mutate(_id!);
  }

  function handleEditTask() {
    playSuccess();
    editTaskMutation.mutate({ _id, title: editInput, completed: complete });
  }

  function handleToggleTaskState() {
    if (complete) {
      playUndo();
    } else {
      playSuccess();
    }
    const next = !complete;
    setComplete(next);
    toggleTaskStateMutation.mutate({ id: _id!, newCompleted: next });
  }

  return (
    <>
      <article
        className={`flex justify-between items-center px-4 py-3 border-2 overflow-hidden ${
          complete ? "border-green-400" : "border-gray-300 dark:border-gray-500"
        } rounded-xl shadow-[3px_3px_0_#00000020] hover:shadow-[4px_4px_0_#00000030]
        transition-all duration-200 bg-[#fafafa] dark:bg-gray-700 hover:-translate-y-0.5`}
      >
        {/* العنوان */}
        <p
          className={`font-semibold text-[15px] max-w-65 wrap-break-word ${
            complete
              ? "line-through text-gray-400"
              : "text-gray-800 dark:text-white"
          }`}
        >
          {title}
        </p>

        {/* الأزرار */}
        <TodoActions
          complete={complete}
          onDelete={() => setDeleteModal(true)}
          onEdit={() => setEditModal(true)}
          onToggle={handleToggleTaskState}
          isDeletePending={deleteTaskMutation.isPending}
        />
      </article>

      {/* Modals */}
      {deleteModal && (
        <DeleteModal
          title={title}
          onConfirm={handleDeleteTask}
          onClose={() => setDeleteModal(false)}
        />
      )}

      {editModal && (
        <EditModal
          editInput={editInput}
          onInputChange={setEditInput}
          onConfirm={handleEditTask}
          onClose={() => setEditModal(false)}
        />
      )}
    </>
  );
}
