import { useState } from "react";
import type { BackgroundState } from "~/components/background/index";
import {
  BackgroundContext,
  contextProvider,
  useTheme,
} from "../../../context/ThemeContext";
import { useReducedMotion } from "motion/react";
import { Outlet } from "react-router";
import { BackgroundRenderer } from "~/components/background/index";

export function BackgroundProvider() {
  const [current, setCurrent] = useState<BackgroundState | null>(null);
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const setBackground = (state: BackgroundState) => {
    setCurrent((prev) => {
      // Priority-based override: route > layout > global
      if (!prev) return state;
      const priorities = { route: 3, layout: 2, global: 1 };
      const newPriority = priorities[state.priority || "global"];
      const prevPriority = priorities[prev.priority || "global"];
      return newPriority >= prevPriority ? state : prev;
    });
  };

  const resetBackground = () => setCurrent(null);

  return (
    <Outlet
      context={contextProvider.set(BackgroundContext, {
        current,
        setBackground,
        resetBackground,
        theme,
        prefersReducedMotion,
        BackgroundRenderer,
      })}
    />
  );
}

export const useBackground = () => {
  const ctx = contextProvider.get(BackgroundContext);
  if (!ctx)
    throw new Error("useBackground must be used within BackgroundProvider");
  return ctx;
};
