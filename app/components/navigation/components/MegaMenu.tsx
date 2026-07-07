import React, { useRef } from "react";
import { useClickOutside } from "../../../hooks";
import type { MenuItem } from "../types";

// ============================================================================
// MEGA MENU COMPONENT
// ============================================================================

interface MegaMenuProps {
  item: MenuItem;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ item, onClose }) => {
  const megaRef = useRef<HTMLDivElement>(null);
  useClickOutside(megaRef, onClose);

  return (
    <div
      ref={megaRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {item.megaMenuContent || (
        <div className="grid grid-cols-4 gap-6">
          {item.children?.map((child) => (
            <div key={child.id}>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                {child.label}
              </h3>
              {child.children?.map((subChild) => (
                <a
                  key={subChild.id}
                  href={subChild.href}
                  onClick={(e) => {
                    if (subChild.onClick) {
                      e.preventDefault();
                      subChild.onClick();
                    }
                    onClose();
                  }}
                  className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 rounded-md transition-colors"
                >
                  {subChild.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export type { MegaMenuProps };
