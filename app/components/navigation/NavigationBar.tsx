import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  createContext,
  useContext,
} from "react";

// Import from separated modules
import { useScrollDirection, useMobileDetection } from "../../hooks";
import { navbarSizeConfig, maxWidthConfig } from "./config";
import { MenuItemComponent, MobileMenu, HamburgerButton } from "./components";
import type {
  NavbarProps,
  NavbarContextValue,
  MenuItem,
  NavbarVariant,
  NavbarSize,
  NavbarPosition,
  MenuItemType,
} from "./types";

// ============================================================================
// CONTEXT
// ============================================================================

const NavbarContext = createContext<NavbarContextValue | null>(null);

const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within NavigationBar");
  }
  return context;
};

// ============================================================================
// MAIN NAVIGATION BAR COMPONENT
// ============================================================================

export const NavigationBar: React.FC<NavbarProps> = ({
  children,
  variant = "default",
  size = "md",
  position = "top",
  className = "",
  logo,
  logoHref = "/",
  items = [],
  actions,
  mobileBreakpoint = 768,
  hideOnScroll = false,
  scrollThreshold = 10,
  onScrollHide,
  blurOnScroll = false,
  elevateOnScroll = true,
  bordered = false,
  maxWidth = "xl",
  disableAnimation = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const isMobile = useMobileDetection(mobileBreakpoint);
  const { scrollDirection, scrollY } = useScrollDirection(scrollThreshold);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Handle hide on scroll
  const isHidden = useMemo(() => {
    if (!hideOnScroll) return false;
    return scrollDirection === "down" && scrollY > scrollThreshold;
  }, [hideOnScroll, scrollDirection, scrollY, scrollThreshold]);

  useEffect(() => {
    onScrollHide?.(isHidden);
  }, [isHidden, onScrollHide]);

  // Variant classes
  const variantClasses = useMemo(() => {
    const classes: string[] = [];

    switch (variant) {
      case "sticky":
        classes.push("sticky");
        break;
      case "fixed":
        classes.push("fixed");
        break;
      case "transparent":
        classes.push(
          scrollY > 0
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md"
            : "bg-transparent",
        );
        break;
      case "blur":
        classes.push("bg-white/80 dark:bg-slate-900/80 backdrop-blur-md");
        break;
      default:
        classes.push("bg-white dark:bg-slate-900");
    }

    if (variant === "sticky" || variant === "fixed") {
      classes.push(position === "top" ? "top-0" : "bottom-0");
      if (blurOnScroll && scrollY > 0) {
        classes.push("backdrop-blur-md bg-white/95 dark:bg-slate-900/95");
      } else {
        classes.push("bg-white dark:bg-slate-900");
      }
    }

    if (elevateOnScroll && scrollY > 0) {
      classes.push("shadow-md");
    }

    if (bordered) {
      classes.push(
        position === "top"
          ? "border-b border-slate-200 dark:border-slate-800"
          : "border-t border-slate-200 dark:border-slate-800",
      );
    }

    return classes.join(" ");
  }, [variant, position, scrollY, blurOnScroll, elevateOnScroll, bordered]);

  // Transform classes for hide animation
  const transformClasses = useMemo(() => {
    if (disableAnimation) return "";
    if (isHidden) {
      return position === "top" ? "-translate-y-full" : "translate-y-full";
    }
    return "translate-y-0";
  }, [isHidden, position, disableAnimation]);

  const contextValue: NavbarContextValue = {
    isOpen,
    isMobile,
    activeItem,
    toggleMenu,
    closeMenu,
    setActiveItem,
    variant,
    size,
  };

  return (
    <NavbarContext.Provider value={contextValue}>
      <header
        className={`w-full z-40 transition-all duration-300 ${variantClasses} ${transformClasses} ${navbarSizeConfig[size].height} ${className}`}
      >
        <div className={`mx-auto ${maxWidthConfig[maxWidth]} h-full`}>
          <div
            className={`flex items-center justify-between h-full ${navbarSizeConfig[size].padding}`}
          >
            {/* Logo */}
            {logo && (
              <a
                href={logoHref}
                className={`flex items-center ${navbarSizeConfig[size].logoSize}`}
              >
                {logo}
              </a>
            )}

            {/* Desktop Menu */}
            {!isMobile && items.length > 0 && (
              <nav className="flex items-center gap-2">
                {items.map((item) => (
                  <MenuItemComponent key={item.id} item={item} context={contextValue} />
                ))}
              </nav>
            )}

            {/* Custom Children */}
            {children}

            {/* Actions */}
            <div className="flex items-center gap-3">
              {actions}
              {isMobile && items.length > 0 && (
                <HamburgerButton isOpen={isOpen} onToggle={toggleMenu} />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && <MobileMenu items={items} context={contextValue} />}
      </header>
    </NavbarContext.Provider>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export { useNavbar };
export type {
  NavbarProps,
  MenuItem,
  NavbarVariant,
  NavbarSize,
  NavbarPosition,
  MenuItemType,
};
