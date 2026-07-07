// ============================================================================
// NAVBAR SIZE CONFIGURATIONS
// ============================================================================

export const navbarSizeConfig = {
  sm: {
    height: "h-14",
    padding: "px-4 py-2",
    fontSize: "text-sm",
    logoSize: "h-8",
    iconSize: "w-4 h-4",
  },
  md: {
    height: "h-16",
    padding: "px-6 py-3",
    fontSize: "text-base",
    logoSize: "h-10",
    iconSize: "w-5 h-5",
  },
  lg: {
    height: "h-20",
    padding: "px-8 py-4",
    fontSize: "text-lg",
    logoSize: "h-12",
    iconSize: "w-6 h-6",
  },
};

// ============================================================================
// HEADER SIZE CONFIGURATIONS
// ============================================================================

export const headerSizeConfig = {
  sm: {
    padding: "py-4 px-4",
    title: "text-2xl",
    subtitle: "text-sm",
    description: "text-sm",
    gap: "gap-2",
  },
  md: {
    padding: "py-6 px-6",
    title: "text-3xl",
    subtitle: "text-base",
    description: "text-base",
    gap: "gap-3",
  },
  lg: {
    padding: "py-8 px-8",
    title: "text-4xl",
    subtitle: "text-lg",
    description: "text-lg",
    gap: "gap-4",
  },
  xl: {
    padding: "py-12 px-8",
    title: "text-5xl",
    subtitle: "text-xl",
    description: "text-xl",
    gap: "gap-6",
  },
};

// ============================================================================
// SIDEBAR SIZE CONFIGURATIONS
// ============================================================================

export const sidebarSizeConfig = {
  sm: {
    collapsed: 16, // 64px
    expanded: 56, // 224px
    padding: "p-2",
    itemPadding: "px-3 py-2",
    fontSize: "text-sm",
    iconSize: "w-4 h-4",
    gap: "gap-2",
  },
  md: {
    collapsed: 20, // 80px
    expanded: 64, // 256px
    padding: "p-4",
    itemPadding: "px-4 py-2.5",
    fontSize: "text-base",
    iconSize: "w-5 h-5",
    gap: "gap-3",
  },
  lg: {
    collapsed: 24, // 96px
    expanded: 72, // 288px
    padding: "p-6",
    itemPadding: "px-5 py-3",
    fontSize: "text-lg",
    iconSize: "w-6 h-6",
    gap: "gap-4",
  },
  xl: {
    collapsed: 28, // 112px
    expanded: 80, // 320px
    padding: "p-8",
    itemPadding: "px-6 py-3.5",
    fontSize: "text-xl",
    iconSize: "w-7 h-7",
    gap: "gap-5",
  },
};

// ============================================================================
// MAX WIDTH CONFIGURATIONS
// ============================================================================

export const maxWidthConfig = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};
