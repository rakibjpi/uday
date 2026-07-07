import React from "react";

// ============================================================================
// HAMBURGER BUTTON COMPONENT
// ============================================================================

interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <div className="w-6 h-5 flex flex-col justify-between">
        <span
          className={`block h-0.5 w-full bg-slate-700 dark:bg-slate-200 transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-slate-700 dark:bg-slate-200 transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-slate-700 dark:bg-slate-200 transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </div>
    </button>
  );
};

export type { HamburgerButtonProps };
