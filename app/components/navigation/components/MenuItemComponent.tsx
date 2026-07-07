import React, { useState, useCallback } from "react";
import { DropdownMenu } from "./DropdownMenu";
import { MegaMenu } from "./MegaMenu";
import { ChevronDownIcon } from "../icons";
import type { MenuItem, NavbarContextValue } from "../types";

// ============================================================================
// MENU ITEM COMPONENT
// ============================================================================

interface MenuItemComponentProps {
  item: MenuItem;
  context: NavbarContextValue;
}

export const MenuItemComponent: React.FC<MenuItemComponentProps> = ({ item, context }) => {
  const { activeItem, setActiveItem, closeMenu, isMobile } = context;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isActive = activeItem === item.id || item.active;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (item.disabled) {
        e.preventDefault();
        return;
      }

      if (item.type === "dropdown" || item.type === "mega") {
        e.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
      } else if (item.onClick) {
        e.preventDefault();
        item.onClick();
        if (isMobile) closeMenu();
      } else if (isMobile) {
        closeMenu();
      }
    },
    [item, isDropdownOpen, isMobile, closeMenu],
  );

  const handleMouseEnter = useCallback(() => {
    if (!isMobile && (item.type === "dropdown" || item.type === "mega")) {
      setIsDropdownOpen(true);
    }
    setActiveItem(item.id);
  }, [item, isMobile, setActiveItem]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile && (item.type === "dropdown" || item.type === "mega")) {
      setIsDropdownOpen(false);
    }
  }, [isMobile]);

  const baseClasses =
    "relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200";
  const stateClasses = item.disabled
    ? "text-slate-400 cursor-not-allowed"
    : isActive
      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
      : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700";

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={item.href || "#"}
        onClick={handleClick}
        className={`${baseClasses} ${stateClasses}`}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
      >
        {item.icon && <span>{item.icon}</span>}
        <span>{item.label}</span>
        {item.badge && (
          <span className="px-2 py-0.5 text-xs font-semibold bg-blue-500 text-white rounded-full">
            {item.badge}
          </span>
        )}
        {(item.type === "dropdown" || item.type === "mega") && (
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        )}
      </a>

      {isDropdownOpen && item.type === "dropdown" && (
        <DropdownMenu item={item} onClose={() => setIsDropdownOpen(false)} />
      )}

      {isDropdownOpen && item.type === "mega" && (
        <MegaMenu item={item} onClose={() => setIsDropdownOpen(false)} />
      )}
    </div>
  );
};

export type { MenuItemComponentProps };
