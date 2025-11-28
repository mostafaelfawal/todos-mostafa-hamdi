"use client";
import { CgClose } from "react-icons/cg";

type ModalProps = {
  children: React.ReactNode;
  closeModal: VoidFunction;
  onSubmit: VoidFunction;
};

export default function Modal({ children, closeModal, onSubmit }: ModalProps) {
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-black/20 flex justify-center items-center z-50"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
          closeModal();
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md p-6 bg-white dark:bg-gray-600 rounded-2xl border-4 border-gray-300 dark:border-gray-500 shadow-[5px_5px_0_#00000020]"
      >
        {/* زر الإغلاق */}
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-3 right-3 p-2 rounded-full bg-red-400 text-white hover:brightness-110 
                     shadow-[2px_2px_0_#00000030] active:scale-95 transition-all"
        >
          <CgClose size={15} />
        </button>

        {/* محتوى المودال */}
        <div className="mt-4 flex justify-center items-center flex-col">
          {children}
        </div>
      </form>
    </div>
  );
}
