import { useEffect, useState } from "react";
import type { BackgroundState, ThemeMode } from "~/components/background/index";
import { useReducedMotion } from "motion/react";
import {
  contextProvider,
  createBackgroundContextValue,
  ThemeContext,
} from "../../../context/ThemeContext";
import { Outlet } from "react-router";

export function ThemeProvider() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem("theme") as ThemeMode;
    return stored || "system";
  });
  const [current, setCurrent] = useState<BackgroundState | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const setBackground = (state: BackgroundState) => {
    setCurrent((prev) => {
      if (!prev) return state;
      const priorities = { route: 3, layout: 2, global: 1 };
      const newPriority = priorities[state.priority || "global"];
      const prevPriority = priorities[prev.priority || "global"];
      return newPriority >= prevPriority ? state : prev;
    });
  };

  const resetBackground = () => setCurrent(null);

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      const activeTheme = theme === "system" ? systemTheme : theme;

      root.classList.remove("light", "dark");
      root.classList.add(activeTheme);
    };

    updateTheme();
    localStorage.setItem("theme", theme);

    // Listen for system theme changes when in system mode
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateTheme);
      return () => mediaQuery.removeEventListener("change", updateTheme);
    }
  }, [theme]);

  const contextValue = createBackgroundContextValue(
    current,
    setBackground,
    resetBackground,
    theme,
    prefersReducedMotion,
  );

  return <Outlet context={contextProvider.set(ThemeContext, contextValue)} />;
}
