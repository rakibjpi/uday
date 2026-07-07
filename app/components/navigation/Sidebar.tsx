import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  createContext,
  useContext,
} from "react";

// Import from separated modules
import { useClickOutside, useResponsiveSidebar, useResizable } from "../../hooks";
import { sidebarSizeConfig } from "./config";
import { SidebarItemComponent, CollapseButton, ResizeHandle } from "./components";
import type {
  SidebarProps,
  SidebarContextValue,
  SidebarItem,
  SidebarVariant,
  SidebarPosition,
  SidebarBehavior,
  SidebarSize,
} from "./types";

// ============================================================================
// CONTEXT
// ============================================================================

const SidebarContext = createContext<SidebarContextValue | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within Sidebar");
  }
  return context;
};

// ============================================================================
// MAIN SIDEBAR COMPONENT
// ============================================================================

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  variant = "default",
  position = "left",
  behavior = "static",
  size = "md",
  className = "",
  items = [],
  header,
  footer,
  collapsedWidth,
  expandedWidth,
  defaultCollapsed = false,
  isCollapsed: controlledCollapsed,
  onCollapsedChange,
  showCollapseButton = true,
  collapseBreakpoint = 1024,
  overlay = true,
  overlayBlur = false,
  persistent = false,
  resizable = false,
  minWidth = 200,
  maxWidth = 400,
}) => {
  const [localCollapsed, setLocalCollapsed] = useState(defaultCollapsed);
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isMobile = useResponsiveSidebar(collapseBreakpoint);
  const isCollapsed = controlledCollapsed ?? localCollapsed;

  const config = sidebarSizeConfig[size];
  const effectiveCollapsedWidth = collapsedWidth ?? config.collapsed;
  const effectiveExpandedWidth = expandedWidth ?? config.expanded;

  // Resizable functionality
  const { width, startResize, isResizing } = useResizable(
    effectiveExpandedWidth * 4, // Convert from Tailwind units to pixels
    minWidth,
    maxWidth,
    resizable && !isCollapsed,
  );

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile && behavior === "collapsible") {
      setLocalCollapsed(true);
    }
  }, [isMobile, behavior]);

  // Handle collapse toggle
  const toggleCollapse = useCallback(() => {
    const newCollapsed = !isCollapsed;
    setLocalCollapsed(newCollapsed);
    onCollapsedChange?.(newCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  // Handle item expansion
  const toggleExpanded = useCallback((id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Close sidebar on outside click (overlay mode)
  useClickOutside(
    sidebarRef,
    () => {
      if (behavior === "overlay" && !persistent) {
        toggleCollapse();
      }
    },
    behavior === "overlay" && !isCollapsed,
  );

  // Variant classes
  const variantClasses = useMemo(() => {
    const classes: string[] = [];

    switch (variant) {
      case "floating":
        classes.push(
          "m-4 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700",
        );
        break;
      case "bordered":
        classes.push(
          position === "left"
            ? "border-r border-slate-200 dark:border-slate-700"
            : "border-l border-slate-200 dark:border-slate-700",
        );
        break;
      case "minimal":
        classes.push("bg-transparent");
        break;
      default:
        classes.push("bg-white dark:bg-slate-900");
    }

    return classes.join(" ");
  }, [variant, position]);

  // Width calculation
  const sidebarWidth = useMemo(() => {
    if (resizable && !isCollapsed) {
      return `${width}px`;
    }
    return isCollapsed
      ? `${effectiveCollapsedWidth * 4}px`
      : `${effectiveExpandedWidth * 4}px`;
  }, [isCollapsed, effectiveCollapsedWidth, effectiveExpandedWidth, resizable, width]);

  // Behavior classes
  const behaviorClasses = useMemo(() => {
    const classes: string[] = [];

    if (behavior === "overlay") {
      classes.push("fixed top-0 bottom-0 z-50");
      classes.push(position === "left" ? "left-0" : "right-0");
      if (isCollapsed) {
        classes.push(
          position === "left" ? "-translate-x-full" : "translate-x-full",
        );
      } else {
        classes.push("translate-x-0");
      }
    } else if (behavior === "push") {
      classes.push("relative");
    } else {
      classes.push("relative");
    }

    classes.push("transition-all duration-300 ease-in-out");

    return classes.join(" ");
  }, [behavior, position, isCollapsed]);

  const contextValue: SidebarContextValue = {
    isCollapsed,
    isHovered,
    activeItem,
    expandedItems,
    toggleCollapse,
    setActiveItem,
    toggleExpanded,
    variant,
    behavior,
    size,
  };

  return (
    <>
      {/* Overlay */}
      {behavior === "overlay" && !isCollapsed && overlay && (
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
            overlayBlur ? "backdrop-blur-sm" : ""
          }`}
          onClick={() => !persistent && toggleCollapse()}
        />
      )}

      {/* Sidebar */}
      <SidebarContext.Provider value={contextValue}>
        <aside
          ref={sidebarRef}
          className={`${variantClasses} ${behaviorClasses} ${className}`}
          style={{ width: sidebarWidth }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`flex flex-col h-full ${config.padding}`}>
            {/* Header */}
            {header && (
              <div className="shrink-0 mb-4">
                {header}
              </div>
            )}

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden space-y-1">
              {children ||
                items.map((item) => (
                  <SidebarItemComponent key={item.id} item={item} context={contextValue} />
                ))}
            </nav>

            {/* Footer */}
            {footer && (
              <div className="shrink-0 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                {footer}
              </div>
            )}

            {/* Collapse Button */}
            {showCollapseButton && behavior === "collapsible" && (
              <div className="shrink-0 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <CollapseButton isCollapsed={isCollapsed} onToggle={toggleCollapse} />
              </div>
            )}
          </div>

          {/* Resize Handle */}
          {resizable && !isCollapsed && (
            <ResizeHandle onMouseDown={startResize} position={position} />
          )}
        </aside>
      </SidebarContext.Provider>
    </>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  SidebarProps,
  SidebarItem,
  SidebarVariant,
  SidebarPosition,
  SidebarBehavior,
  SidebarSize,
};
