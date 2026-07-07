// ============================================================================
// BACKGROUND RENDERER (The actual background display)
// ============================================================================

import { useEffect, useState } from "react";
import {
  useBackground,
  BackgroundErrorBoundary,
  BackgroundLayer,
  BackgroundOverlay,
} from "~/components/background/index";
import { AnimatePresence, motion } from "motion/react";

export function BackgroundRenderer() {
  const { current, theme, prefersReducedMotion } = useBackground();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((k) => k + 1);
  }, [current?.config]);

  if (!current?.config) return null;

  const transition = current.transition || { duration: 0.5, type: "fade" };
  const shouldAnimate = !prefersReducedMotion && transition.type !== "none";

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
        {shouldAnimate ? (
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
            // Wrap BackgroundLayer
            <BackgroundErrorBoundary
              fallback={<div className="absolute inset-0 bg-slate-900" />}
            >
              <BackgroundLayer config={current.config} theme={theme} />
              {current.overlay && <BackgroundOverlay {...current.overlay} />}
            </BackgroundErrorBoundary>
          </motion.div>
        ) : (
          <div key={key} className="absolute inset-0">
            <BackgroundErrorBoundary
              fallback={<div className="absolute inset-0 bg-slate-900" />}
            >
              <BackgroundLayer config={current.config} theme={theme} />
              {current.overlay && <BackgroundOverlay {...current.overlay} />}
            </BackgroundErrorBoundary>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
