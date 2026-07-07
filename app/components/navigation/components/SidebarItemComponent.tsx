import React, { useCallback } from "react";
import { ChevronDownIcon } from "../icons";
import { sidebarSizeConfig } from "../config";
import type { SidebarItem, SidebarContextValue, SidebarSize } from "../types";

// ============================================================================
// SIDEBAR ITEM COMPONENT
// ============================================================================

interface SidebarItemComponentProps {
  item: SidebarItem;
  level?: number;
  context: SidebarContextValue;
}

export const SidebarItemComponent: React.FC<SidebarItemComponentProps> = ({
  item,
  level = 0,
  context,
}) => {
  const {
    isCollapsed,
    activeItem,
    expandedItems,
    setActiveItem,
    toggleExpanded,
    size,
  } = context;

  const config = sidebarSizeConfig[size];
  const isActive = activeItem === item.id || item.active;
  const isExpanded = expandedItems.has(item.id);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (item.disabled) {
        e.preventDefault();
        return;
      }

      if (hasChildren) {
        e.preventDefault();
        toggleExpanded(item.id);
      } else if (item.onClick) {
        e.preventDefault();
        item.onClick();
      }

      setActiveItem(item.id);
    },
    [item, hasChildren, setActiveItem, toggleExpanded],
  );

  // Divider
  if (item.divider) {
    return (
      <div className="my-2 border-t border-slate-200 dark:border-slate-700" />
    );
  }

  // Header
  if (item.header) {
    return (
      <div
        className={`${config.itemPadding} text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        {isCollapsed ? item.label[0] : item.label}
      </div>
    );
  }

  const paddingLeft = isCollapsed ? "" : `pl-${4 + level * 4}`;

  return (
    <div>
      <a
        href={item.href || "#"}
        onClick={handleClick}
        className={`flex items-center ${config.gap} ${config.itemPadding} ${paddingLeft} ${config.fontSize} rounded-lg transition-all duration-200 relative group ${
          item.disabled
            ? "text-slate-400 cursor-not-allowed"
            : isActive
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
              : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
        title={isCollapsed ? item.label : undefined}
      >
        {/* Icon */}
        {item.icon && (
          <span className={`${config.iconSize} shrink-0`}>{item.icon}</span>
        )}

        {/* Label */}
        {!isCollapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>

            {/* Badge */}
            {item.badge && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-blue-500 text-white rounded-full">
                {item.badge}
              </span>
            )}

            {/* Expand Icon */}
            {hasChildren && (
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            )}
          </>
        )}

        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className="absolute left-full ml-2 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
            {item.label}
            {item.badge && (
              <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-blue-500 text-white rounded-full">
                {item.badge}
              </span>
            )}
          </div>
        )}
      </a>

      {/* Children */}
      {hasChildren && isExpanded && !isCollapsed && (
        <div className="mt-1 space-y-1">
          {item.children!.map((child) => (
            <SidebarItemComponent
              key={child.id}
              item={child}
              level={level + 1}
              context={context}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export type { SidebarItemComponentProps };
