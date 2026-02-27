// src/components/ThemeToggle.tsx
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../store/themeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <>
      <div className="flex items-center gap-x-3">
        <p className="text-sm font-medium text-gray-500">Switch theme</p>

        <button
          onClick={toggleTheme}
          className={`relative w-10 h-6 rounded-md transition-colors duration-300 cursor-pointer
      ${theme === "dark" ? "bg-gray-800" : "bg-gray-300"}
      active:scale-95`}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {/* Knob */}
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-sm shadow
        flex items-center justify-center
        transition-transform duration-300
        ${theme === "dark" ? "translate-x-4" : "translate-x-0"}`}
          >
            {theme === "dark" ? (
              <Sun className="h-3 w-3 text-yellow-500" />
            ) : (
              <Moon className="h-3 w-3 text-gray-700" />
            )}
          </span>
        </button>
      </div>
    </>
  );
}
