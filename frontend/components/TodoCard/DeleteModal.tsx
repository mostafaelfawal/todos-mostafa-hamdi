import Modal from "../Modal";

interface DeleteModalProps {
  title: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteModal({
  title,
  onConfirm,
  onClose,
}: DeleteModalProps) {
  return (
    <Modal onSubmit={onConfirm} closeModal={onClose}>
      <p className="font-bold text-lg text-gray-800 dark:text-white text-center">
        Are you sure you want to delete this task?
      </p>
      <p className="text-gray-500 dark:text-gray-300 text-sm italic mt-1 text-center">
        {`"${title}"`}
      </p>

      <button
        type="submit"
        className="mt-6 w-full flex justify-center gap-2 items-center text-sm bg-red-400 rounded-xl px-4 py-2 
           border-2 border-gray-300 dark:border-gray-500 text-white hover:brightness-110 
           transition-all shadow-[2px_2px_0_#00000020] active:translate-y-0.5 active:shadow-none"
      >
        Delete
      </button>
    </Modal>
  );
}
