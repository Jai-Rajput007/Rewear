"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
        "hover:bg-gray-200 dark:hover:bg-gray-800",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-300" strokeWidth={1.5} />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
      )}
    </button>
  )
}
