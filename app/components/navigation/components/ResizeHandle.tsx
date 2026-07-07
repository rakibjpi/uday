import React from "react";
import type { SidebarPosition } from "../types";

// ============================================================================
// RESIZE HANDLE COMPONENT
// ============================================================================

interface ResizeHandleProps {
  onMouseDown: () => void;
  position: SidebarPosition;
}

export const ResizeHandle: React.FC<ResizeHandleProps> = ({ onMouseDown, position }) => {
  return (
    <div
      className={`absolute top-0 ${position === "left" ? "right-0" : "left-0"} bottom-0 w-1 cursor-ew-resize group hover:bg-blue-500 transition-colors`}
      onMouseDown={onMouseDown}
    >
      <div className="absolute inset-y-0 -left-1 -right-1" />
    </div>
  );
};

export type { ResizeHandleProps };
