import Modal from "../Modal";

interface EditModalProps {
  editInput: string;
  onInputChange: (value: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export default function EditModal({
  editInput,
  onInputChange,
  onConfirm,
  onClose,
}: EditModalProps) {
  return (
    <Modal onSubmit={onConfirm} closeModal={onClose}>
      <p className="mb-2 font-bold text-lg text-gray-800 dark:text-white text-center">
        Edit the task
      </p>
      <input
        type="text"
        placeholder="Edit your task..."
        autoFocus
        value={editInput}
        onChange={(e) => onInputChange(e.target.value)}
        className="flex-1 px-3 py-2 rounded-xl border-2 border-gray-300 dark:border-gray-500 outline-none 
                 hover:border-blue-400 focus:border-blue-400 text-gray-800 
                 transition-all shadow-[2px_2px_0_#00000020] bg-white"
      />
      <button
        type="submit"
        className="mt-6 w-full flex justify-center gap-2 items-center text-sm bg-blue-400 rounded-xl px-4 py-2 
             border-2 border-gray-300 dark:border-gray-500 text-white hover:brightness-110 
             transition-all shadow-[2px_2px_0_#00000020] active:translate-y-0.5 active:shadow-none"
      >
        Edit
      </button>
    </Modal>
  );
}
