import React, { useMemo } from "react";
import type { GradientBackground } from  "~/components/background/index";

// Gradient Background

export function GradientBg({
  config,
  theme,
}: {
  config: GradientBackground;
  theme: string;
}) {
  const colors = config.theme?.[theme as "light" | "dark"] || config.colors;
  const gradient = useMemo(() => {
    const colorStr = colors.join(", ");
    if (config.gradientType === "radial")
      return `radial-gradient(circle, ${colorStr})`;
    if (config.gradientType === "conic") return `conic-gradient(${colorStr})`;
    return `linear-gradient(${config.direction || "to bottom right"}, ${colorStr})`;
  }, [colors, config.gradientType, config.direction]);

  return (
    <div
      className={`absolute inset-0 ${config.animated ? "animate-gradient-shift" : ""}`}
      style={{ background: gradient }}
    />
  );
}
