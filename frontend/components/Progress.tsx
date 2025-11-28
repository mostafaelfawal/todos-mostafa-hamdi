"use client";

import useProgressCalc from "@/hooks/useProgressCalc";

export default function Progress() {
  const width = useProgressCalc();

  return (
    <div className="h-3 w-full border-2 border-gray-300 dark:border-gray-500 rounded-full shadow-[2px_2px_0_#00000020]">
      <div
        style={{ width: `${width}%` }}
        className="bg-green-400  h-full rounded-full shadow-[1px_1px_0_#00000020] duration-300"
      ></div>
    </div>
  );
}
