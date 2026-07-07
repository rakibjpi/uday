import React from "react";
import { ChevronRightIcon } from "../icons";
import type { BreadcrumbItem } from "../types";

// ============================================================================
// BREADCRUMBS COMPONENT
// ============================================================================

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRightIcon className="w-4 h-4 text-slate-400" />
          )}
          {item.href && !item.active ? (
            <a
              href={item.href}
              className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              {item.label}
            </a>
          ) : (
            <span
              className={`flex items-center gap-1.5 ${
                item.active
                  ? "text-slate-900 dark:text-slate-100 font-medium"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export type { BreadcrumbsProps };
