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
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
        refetchType: "active",
      });
    },
    onError: () => {
      toast.error("Failed to update task");
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
        refetchType: "active",
      });
    },
    onError: () => {
      toast.error("Failed to delete task");
    },
  });

  const toggleTaskStateMutation = useMutation({
    mutationFn: (id: string) => editTask(id, title, complete),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
        refetchType: "active",
      });
    },
    onError: () => {
      toast.error("Failed to update task");
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
    setComplete(!complete);
    toggleTaskStateMutation.mutate(_id!);
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
