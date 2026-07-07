import React, { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  BackgroundErrorBoundary,
  BackgroundLayer,
  useBackground,
  BackgroundOverlay,
} from "~/components/background/index";

import type { BackgroundState, ThemeMode } from "~/components/background/index";

// ============================================================================
// DECLARATIVE BACKGROUND COMPONENT (Used in routes/layouts)
// ============================================================================

export function Background({ state }: { state: BackgroundState }) {
  const { setBackground } = useBackground();

  useEffect(() => {
    setBackground(state);
  }, [state, setBackground]);

  return null;
}

// ============================================================================
// STANDALONE BACKGROUND COMPONENT (Works without Provider)
// ============================================================================

export function StandaloneBackground({
  state,
  theme: themeProp = "system",
  skipInitialAnimation = true, // Skip animation on first render for better LCP
}: {
  state: BackgroundState;
  theme?: ThemeMode;
  skipInitialAnimation?: boolean;
}) {
  const [key, setKey] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const prevStateRef = useRef<string>(JSON.stringify(state));
  const prefersReducedMotion = useReducedMotion();

  // Determine actual theme - compute initial value synchronously to avoid flash
  const getInitialTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    if (themeProp === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return themeProp;
  };

  const [actualTheme, setActualTheme] = useState<"light" | "dark">(
    getInitialTheme,
  );

  useEffect(() => {
    // Mark first render complete after mount
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      if (themeProp === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        setActualTheme(systemTheme);
      } else {
        setActualTheme(themeProp);
      }
    };

    if (themeProp === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateTheme);
      return () => mediaQuery.removeEventListener("change", updateTheme);
    }
  }, [themeProp]);

  // Update key when state prop changes to trigger re-render with animation
  useEffect(() => {
    const stateString = JSON.stringify(state);
    
    if (stateString !== prevStateRef.current) {
      prevStateRef.current = stateString;
      if (!isFirstRender) {
        setKey((k) => k + 1);
      }
    }
  }, [state, isFirstRender]);

  if (!state?.config) return null;

  const transition = state.transition || { duration: 0.5, type: "fade" };
  // Skip animation on first render for faster LCP
  const shouldAnimate =
    !prefersReducedMotion &&
    transition.type !== "none" &&
    !(skipInitialAnimation && isFirstRender);

  // Render immediately without animation on first load for better LCP
  if (isFirstRender || !shouldAnimate) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0">
          <BackgroundErrorBoundary
            fallback={<div className="absolute inset-0 bg-slate-900" />}
          >
            <BackgroundLayer config={state.config} theme={actualTheme} />
            {state.overlay && <BackgroundOverlay {...state.overlay} />}
          </BackgroundErrorBoundary>
        </div>
      </div>
    );
  }

  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.05 },
    },
  } as const;

  const variantKey =
    transition.type === "none" ? "fade" : transition.type || "fade";
  const selectedVariant = variants[variantKey as keyof typeof variants];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={selectedVariant.initial}
          animate={selectedVariant.animate}
          exit={selectedVariant.exit}
          transition={{
            duration: transition.duration || 0.5,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <BackgroundErrorBoundary
            fallback={<div className="absolute inset-0 bg-slate-900" />}
          >
            <BackgroundLayer config={state.config} theme={actualTheme} />
            {state.overlay && <BackgroundOverlay {...state.overlay} />}
          </BackgroundErrorBoundary>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
