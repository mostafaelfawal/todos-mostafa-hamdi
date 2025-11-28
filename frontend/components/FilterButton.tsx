import { IconType } from "react-icons";
import Tooltip from "./Tooltip";

export default function FilterButton({
  title,
  icon,
  isActive,
  setIsActive,
  clickAudio,
}: {
  title: string;
  icon: React.ReactElement<IconType>;
  isActive: boolean;
  setIsActive: VoidFunction;
  clickAudio: VoidFunction;
}) {
  const handleActive = () => {
    clickAudio();
    setIsActive();
  };

  return (
    <Tooltip message={`${title} tasks`} side="top">
      <button
        onClick={handleActive}
        disabled={isActive}
        className={`rounded-xl border-2 border-gray-300 dark:border-gray-500 p-2 transition-all
        ${
          isActive
            ? "bg-green-400 text-white shadow-[2px_2px_0_#00000020] cursor-default!"
            : "active:translate-y-0.5 active:shadow-none bg-white dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-green-100 dark:hover:bg-green-500 shadow-[2px_2px_0_#00000020]"
        }`}
      >
        {icon}
      </button>
    </Tooltip>
  );
}
