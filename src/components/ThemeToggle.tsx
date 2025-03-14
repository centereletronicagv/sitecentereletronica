
import React from "react";
import { Moon } from "lucide-react";

export function ThemeToggle() {
  // No toggle functionality as we only want dark mode
  return (
    <button
      className="p-2 rounded-md transition-colors hover:bg-secondary cursor-default"
      aria-label="Dark theme"
    >
      <Moon size={18} className="text-center-gray" />
    </button>
  );
}
