import type { ReactNode } from "react";

// ============================================================================
// NAVIGATION BAR TYPES
// ============================================================================

export type NavbarVariant = "default" | "sticky" | "fixed" | "transparent" | "blur";
export type NavbarSize = "sm" | "md" | "lg";
export type NavbarPosition = "top" | "bottom";
export type MenuItemType = "link" | "dropdown" | "mega" | "button";

export interface MenuItem {
  id: string;
  label: string;
  type?: MenuItemType;
  href?: string;
  icon?: ReactNode;
  badge?: string | number;
  children?: MenuItem[];
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  external?: boolean;
  megaMenuContent?: ReactNode;
}

export interface NavbarProps {
  children?: ReactNode;
  variant?: NavbarVariant;
  size?: NavbarSize;
  position?: NavbarPosition;
  className?: string;
  logo?: ReactNode;
  logoHref?: string;
  items?: MenuItem[];
  actions?: ReactNode;
  mobileBreakpoint?: number;
  hideOnScroll?: boolean;
  scrollThreshold?: number;
  onScrollHide?: (hidden: boolean) => void;
  blurOnScroll?: boolean;
  elevateOnScroll?: boolean;
  bordered?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  disableAnimation?: boolean;
}

export interface NavbarContextValue {
  isOpen: boolean;
  isMobile: boolean;
  activeItem: string | null;
  toggleMenu: () => void;
  closeMenu: () => void;
  setActiveItem: (id: string | null) => void;
  variant: NavbarVariant;
  size: NavbarSize;
}

// ============================================================================
// HEADER TYPES
// ============================================================================

export type HeaderVariant = "default" | "centered" | "split" | "minimal" | "hero";
export type HeaderSize = "sm" | "md" | "lg" | "xl";

export type BreadcrumbItem = {
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
};

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
  href?: string;
}

export interface HeaderProps {
  children?: ReactNode;
  variant?: HeaderVariant;
  size?: HeaderSize;
  className?: string;
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  description?: string | ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  tabs?: TabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  avatar?: ReactNode;
  badge?: string | number;
  backgroundImage?: string;
  backgroundOverlay?: boolean;
  backgroundBlur?: boolean;
  sticky?: boolean;
  bordered?: boolean;
  elevated?: boolean;
  fullWidth?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export interface HeaderContextValue {
  activeTab: string | null;
  setActiveTab: (id: string) => void;
  variant: HeaderVariant;
  size: HeaderSize;
}

// ============================================================================
// SIDEBAR TYPES
// ============================================================================

export type SidebarVariant = "default" | "floating" | "bordered" | "minimal";
export type SidebarPosition = "left" | "right";
export type SidebarBehavior = "static" | "collapsible" | "overlay" | "push";
export type SidebarSize = "sm" | "md" | "lg" | "xl";

export interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  badge?: string | number;
  children?: SidebarItem[];
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  divider?: boolean;
  header?: boolean;
}

export interface SidebarProps {
  children?: ReactNode;
  variant?: SidebarVariant;
  position?: SidebarPosition;
  behavior?: SidebarBehavior;
  size?: SidebarSize;
  className?: string;
  items?: SidebarItem[];
  header?: ReactNode;
  footer?: ReactNode;
  collapsedWidth?: number;
  expandedWidth?: number;
  defaultCollapsed?: boolean;
  isCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  showCollapseButton?: boolean;
  collapseBreakpoint?: number;
  overlay?: boolean;
  overlayBlur?: boolean;
  persistent?: boolean;
  resizable?: boolean;
  minWidth?: number;
  maxWidth?: number;
}

export interface SidebarContextValue {
  isCollapsed: boolean;
  isHovered: boolean;
  activeItem: string | null;
  expandedItems: Set<string>;
  toggleCollapse: () => void;
  setActiveItem: (id: string | null) => void;
  toggleExpanded: (id: string) => void;
  variant: SidebarVariant;
  behavior: SidebarBehavior;
  size: SidebarSize;
}
