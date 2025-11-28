"use client";

import { toggleTheme } from "@/utils/toggleTheme";
import { useEffect, useState } from "react";
import { FaCheck, FaMoon, FaSun } from "react-icons/fa6";

export default function Header() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  // Run only on client
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    const darkMode = theme === "dark";

    document.documentElement.classList.toggle("dark", darkMode);
    setIsDark(darkMode);
  }, []);

  return (
    <header className="absolute top-0 w-full flex justify-between items-center p-4 rounded-b-xl shadow-[3px_3px_0_#00000020] border-2 border-gray-300 dark:border-gray-500 transition-colors">
      <div className="flex justify-center items-center gap-2">
        <h1 className="text-center font-bold text-xl text-gray-800 dark:text-white transition-colors">
          Todo | Mostafa Hamdi
        </h1>
        <span className="rounded-full bg-green-500 border-2 text-white p-1 border-gray-300 dark:border-gray-500 transition-colors">
          <FaCheck />
        </span>
      </div>

      <button
        onClick={() => isDark !== null && setIsDark(toggleTheme())}
        className="rounded-full p-2 bg-green-500 text-white hover:bg-green-600 dark:hover:bg-green-400 transition-colors"
        aria-label="Toggle Theme"
      >
        {isDark === null ? null : isDark ? <FaSun /> : <FaMoon />}
      </button>
    </header>
  );
}
