import React, { useRef } from "react";
import { useClickOutside } from "../../../hooks";
import type { MenuItem } from "../types";

// ============================================================================
// DROPDOWN MENU COMPONENT
// ============================================================================

interface DropdownMenuProps {
  item: MenuItem;
  onClose: () => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ item, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, onClose);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 mt-2 min-w-50 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {item.children?.map((child) => (
        <a
          key={child.id}
          href={child.href}
          onClick={(e) => {
            if (child.onClick) {
              e.preventDefault();
              child.onClick();
            }
            onClose();
          }}
          className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
            child.disabled
              ? "text-slate-400 cursor-not-allowed"
              : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          } ${child.active ? "bg-slate-100 dark:bg-slate-700" : ""}`}
        >
          {child.icon && <span className="w-4 h-4">{child.icon}</span>}
          <span className="flex-1">{child.label}</span>
          {child.badge && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-blue-500 text-white rounded-full">
              {child.badge}
            </span>
          )}
        </a>
      ))}
    </div>
  );
};

export type { DropdownMenuProps };
