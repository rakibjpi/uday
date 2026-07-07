// ============================================================================
// PRESET CARD COMPONENT
// ============================================================================

import { motion } from "motion/react";
import type { BackgroundState } from "~/type/Type";

export function PresetCard({
  name,
  state,
  isSelected,
  onSelect,
}: {
  name: string;
  state: BackgroundState;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const getPreviewStyle = (): React.CSSProperties => {
    const config = state.config;
    if (!config) return {};

    switch (config.type) {
      case "solid":
        return { backgroundColor: config.color.replace("bg-", "") };
      case "gradient":
        if (config.gradientType === "linear") {
          return {
            background: `linear-gradient(${config.direction || "to bottom"}, ${config.colors.join(", ")})`,
          };
        } else if (config.gradientType === "radial") {
          return {
            background: `radial-gradient(circle, ${config.colors.join(", ")})`,
          };
        } else {
          return {
            background: `conic-gradient(${config.colors.join(", ")})`,
          };
        }
      case "image":
        return {
          backgroundImage: `url(${config.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
      default:
        return { backgroundColor: "#1e293b" };
    }
  };

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full aspect-video rounded-xl overflow-hidden border-2 transition-all duration-200
        ${
          isSelected
            ? "border-blue-500 ring-2 ring-blue-500/30"
            : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
        }`}
    >
      <div className="absolute inset-0" style={getPreviewStyle()} />
      {state.overlay && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: state.overlay.color || "transparent",
            opacity: state.overlay.opacity || 0,
            backdropFilter: state.overlay.blur
              ? `blur(${state.overlay.blur}px)`
              : undefined,
          }}
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-linear-to-t from-black/60 to-transparent">
        <span className="text-xs font-medium text-white capitalize">
          {name.replace(/([A-Z])/g, " $1").trim()}
        </span>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </motion.button>
  );
}
