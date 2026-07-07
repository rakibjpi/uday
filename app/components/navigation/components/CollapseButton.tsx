import React from "react";
import { CollapseIcon } from "../icons";

// ============================================================================
// COLLAPSE BUTTON COMPONENT
// ============================================================================

interface CollapseButtonProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const CollapseButton: React.FC<CollapseButtonProps> = ({ isCollapsed, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      <CollapseIcon
        className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform ${
          isCollapsed ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

export type { CollapseButtonProps };
