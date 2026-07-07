import React from "react";
import type { BackgroundOverlayType } from "~/components/background/index";

// ============================================================================
// BACKGROUND OVERLAY

export const MemoizedBackgroundOverlay = React.memo(BackgroundOverlay);

// ============================================================================
export function BackgroundOverlay({
  blur,
  opacity,
  color,
  grain,
}: BackgroundOverlayType) {
  const blurClasses = {
    0: "",
    1: "backdrop-blur-sm",
    2: "backdrop-blur",
    3: "backdrop-blur-md",
    4: "backdrop-blur-lg",
    5: "backdrop-blur-xl",
    6: "backdrop-blur-2xl",
    7: "backdrop-blur-3xl",
  } as const;

  return (
    <>
      {blur && (
        <div
          className={`absolute inset-0 ${blurClasses[Math.min(Math.round(blur / 4), 7) as keyof typeof blurClasses]}`}
        />
      )}
      {color && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: color, opacity: opacity || 0.5 }}
        />
      )}
      {grain && (
        <div
          className="absolute inset-0 opacity-5 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMCCg0QExYBUjC0AAAAPklEQVQ4y2NgGAWjgP6ASdncAEaiAhaGiRNgJApQGDhxwkQQiQJYGCZOmDhxIohEASyMEydOnAgj0cHQdw8A3/cPVPl2BtcAAAAASUVORK5CYII=)",
          }}
        />
      )}
    </>
  );
}
