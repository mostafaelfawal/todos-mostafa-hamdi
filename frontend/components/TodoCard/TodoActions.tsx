import { FaEdit, FaCheck, FaTrash, FaUndo } from "react-icons/fa";
import Tooltip from "../Tooltip";

interface TodoActionsProps {
  complete: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onToggle: () => void;
  isDeletePending: boolean;
}

export default function TodoActions({
  complete,
  onDelete,
  onEdit,
  onToggle,
  isDeletePending,
}: TodoActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Tooltip message="Delete">
        <button
          onClick={onDelete}
          disabled={isDeletePending}
          className="p-2 rounded-full bg-red-400 text-white hover:brightness-110 
                   active:scale-95 shadow-[2px_2px_0_#00000030] transition-all disabled:bg-red-600"
        >
          <FaTrash size={13} />
        </button>
      </Tooltip>

      <Tooltip message="Edit">
        <button
          onClick={onEdit}
          className="p-2 rounded-full bg-blue-400 text-white hover:brightness-110 
                   active:scale-95 shadow-[2px_2px_0_#00000030] transition-all"
        >
          <FaEdit size={13} />
        </button>
      </Tooltip>

      <Tooltip message={complete ? "Mark as pending" : "Mark as done"}>
        <button
          onClick={onToggle}
          className={`p-2 rounded-full transition-all active:scale-95 shadow-[2px_2px_0_#00000030] ${
            complete
              ? "bg-yellow-400 text-white hover:brightness-110"
              : "bg-green-400 text-white hover:brightness-110"
          }`}
        >
          {complete ? <FaUndo size={13} /> : <FaCheck size={13} />}
        </button>
      </Tooltip>
    </div>
  );
}
