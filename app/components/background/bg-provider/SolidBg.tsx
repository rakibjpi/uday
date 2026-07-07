import type React from "react";
import type { SolidBackground } from  "~/components/background/index";

// Solid Background

export function SolidBg({
  config,
  theme,
}: {
  config: SolidBackground;
  theme: "light" | "dark";
}) {
  const color = config.theme?.[theme] || config.color;
  return <div className={`absolute inset-0 ${color}`} />;
}
