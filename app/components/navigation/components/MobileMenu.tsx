import React, { useEffect, useRef } from "react";
import { MenuItemComponent } from "./MenuItemComponent";
import type { MenuItem, NavbarContextValue } from "../types";

// ============================================================================
// MOBILE MENU COMPONENT
// ============================================================================

interface MobileMenuProps {
  items: MenuItem[];
  context: NavbarContextValue;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ items, context }) => {
  const { isOpen, closeMenu } = context;
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={closeMenu}
      />

      {/* Menu */}
      <div
        ref={menuRef}
        className="fixed top-16 left-0 right-0 bottom-0 bg-white dark:bg-slate-900 z-50 overflow-y-auto animate-in slide-in-from-top duration-300"
      >
        <nav className="flex flex-col p-4 space-y-2">
          {items.map((item) => (
            <MenuItemComponent key={item.id} item={item} context={context} />
          ))}
        </nav>
      </div>
    </>
  );
};

export type { MobileMenuProps };
