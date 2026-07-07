import React from "react";
import {
  CanvasBg,
  ImageBg,
  GradientBg,
  SolidBg,
  VideoBg,
} from "~/components/background/index";

import { useDeviceCapabilities } from "~/hooks/useDeviceCapabilities";

import type {
  BackgroundConfig,
  CanvasBackground,
  GradientBackground,
  ImageBackground,
  SolidBackground,
  ThemeMode,
  VideoBackground,
} from "~/components/background/index";

// ============================================================================
// BACKGROUND CONTEXT
// ============================================================================

export const MemoizedBackgroundLayer = React.memo(
  BackgroundLayer,
  (prev, next) => {
    return prev.config === next.config && prev.theme === next.theme;
  },
);

// ============================================================================
// BACKGROUND LAYER (Type-specific rendering)
// ============================================================================
export function BackgroundLayer({
  config,
  theme,
}: {
  config: BackgroundConfig;
  theme: ThemeMode;
}) {
  const actualTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  // In BackgroundLayer
  const { isMobile, isLowEnd } = useDeviceCapabilities();

  if (config.type === "video" && (isMobile || isLowEnd)) {
    if (config.fallback) {
      return <BackgroundLayer config={config.fallback} theme={theme} />;
    }
    return <div className="absolute inset-0 bg-slate-900" />;
  }

  switch (config.type) {
    case "solid":
      return <SolidBg config={config as SolidBackground} theme={actualTheme} />;
    case "gradient":
      return (
        <GradientBg config={config as GradientBackground} theme={actualTheme} />
      );
    case "image":
      return <ImageBg config={config as ImageBackground} />;
    case "video":
      return <VideoBg config={config as VideoBackground} />;
    case "canvas":
      return <CanvasBg config={config as CanvasBackground} />;
    default:
      return null;
  }
}
