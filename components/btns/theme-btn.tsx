"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa6";

export const ThemeBtn = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      onClick={toggleTheme}
      className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-600 hover:text-white transition-transform cursor-pointer"
    >
      {theme === "light" ? (
        <FaSun className="h-5 w-5 text-gray-700 dark:text-gray-300 hover:text-white" />
      ) : (
        <FaMoon className="h-5 w-5 text-yellow-500 hover:text-white" />
      )}
    </Button>
  );
};
