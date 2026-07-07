import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import type {
  BackgroundState,
  ThemeMode,
  GradientType,
  BackgroundConfig,
  BackgroundOverlayType,
  BackgroundTransition,
} from "~/type/Type";
import { demoBackgroundStates } from "./demoBackgroundStates";
import { useTheme } from "~/context/ThemeContext";
import { ThemeModeSelector } from "./ThemeModeSelector";
import { Toggle } from "./Toggle";
import { Select } from "./Select";
import { Slider } from "./Slider";
import { ColorPicker } from "./ColorPicker";
import { Tab } from "./Tab";
import { PresetCard } from "./PresetCard";

// ============================================================================
// TYPES
// ============================================================================

interface BackgroundSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (state: BackgroundState) => void;
  position?: "left" | "right";
  showPreview?: boolean;
}

export interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

type SettingsTab =
  | "presets"
  | "solid"
  | "gradient"
  | "image"
  | "overlay"
  | "transition";

// ============================================================================
// PRESET CATEGORIES
// ============================================================================

const presetCategories = {
  solid: ["solid", "solidDark", "minimal", "minimalGray"],
  gradient: [
    "gradient",
    "gradientSunset",
    "gradientOcean",
    "gradientForest",
    "gradientRadial",
    "gradientConic",
    "authGradient",
  ],
  image: ["image", "imageMountain", "imageCity"],
  dashboard: ["dashboard", "dashboardGradient", "authDark"],
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function BackgroundSettings({
  isOpen,
  onClose,
  onApply,
  position = "right",
  showPreview = true,
}: BackgroundSettingsProps) {
  const themeContext = useTheme();

  // Fallback values when context is not available
  const current = themeContext?.current ?? null;
  const setBackground = themeContext?.setBackground ?? (() => {});
  const theme = themeContext?.theme ?? "system";

  const [activeTab, setActiveTab] = useState<SettingsTab>("presets");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [localTheme, setLocalTheme] = useState<ThemeMode>(() => {
    // Try to get from localStorage first, then fall back to context or 'system'
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as ThemeMode | null;
      if (stored) return stored;
    }
    return theme;
  });

  // Custom background state
  const [customConfig, setCustomConfig] = useState<BackgroundConfig>({
    type: "solid",
    color: "#1e293b",
  });
  const [customOverlay, setCustomOverlay] = useState<BackgroundOverlayType>({
    blur: 0,
    opacity: 0,
    color: "#000000",
    grain: false,
  });
  const [customTransition, setCustomTransition] =
    useState<BackgroundTransition>({
      duration: 0.5,
      type: "fade",
    });
  const [priority, setPriority] = useState<"global" | "layout" | "route">(
    "route",
  );

  // Gradient specific state
  const [gradientColors, setGradientColors] = useState<string[]>([
    "#667eea",
    "#764ba2",
  ]);

  // Sync local theme with context
  useEffect(() => {
    setLocalTheme(theme);
  }, [theme]);

  const handleThemeChange = useCallback((newTheme: ThemeMode) => {
    setLocalTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    // Trigger theme update
    const root = document.documentElement;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const activeTheme = newTheme === "system" ? systemTheme : newTheme;
    root.classList.remove("light", "dark");
    root.classList.add(activeTheme);
  }, []);

  const handlePresetSelect = useCallback(
    (name: string) => {
      setSelectedPreset(name);
      const state = demoBackgroundStates[name];
      if (state && onApply) {
        onApply(state);
      } else if (state) {
        setBackground(state);
      }
    },
    [onApply, setBackground],
  );

  const buildCustomState = useCallback((): BackgroundState => {
    return {
      config: customConfig,
      overlay: customOverlay,
      transition: customTransition,
      priority,
    };
  }, [customConfig, customOverlay, customTransition, priority]);

  const handleApplyCustom = useCallback(() => {
    const state = buildCustomState();
    if (onApply) {
      onApply(state);
    } else {
      setBackground(state);
    }
  }, [buildCustomState, onApply, setBackground]);

  const addGradientColor = useCallback(() => {
    if (gradientColors.length < 6) {
      setGradientColors([...gradientColors, "#ffffff"]);
    }
  }, [gradientColors]);

  const removeGradientColor = useCallback(
    (index: number) => {
      if (gradientColors.length > 2) {
        setGradientColors(gradientColors.filter((_, i) => i !== index));
      }
    },
    [gradientColors],
  );

  const updateGradientColor = useCallback(
    (index: number, color: string) => {
      const newColors = [...gradientColors];
      newColors[index] = color;
      setGradientColors(newColors);
      if (customConfig.type === "gradient") {
        setCustomConfig({ ...customConfig, colors: newColors });
      }
    },
    [gradientColors, customConfig],
  );

  // Tabs content
  const tabs: { id: SettingsTab; label: string }[] = [
    { id: "presets", label: "Presets" },
    { id: "solid", label: "Solid" },
    { id: "gradient", label: "Gradient" },
    { id: "image", label: "Image" },
    { id: "overlay", label: "Overlay" },
    { id: "transition", label: "Effects" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Settings Panel */}
          <motion.div
            initial={{ x: position === "right" ? "100%" : "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: position === "right" ? "100%" : "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed top-0 bottom-0 ${position === "right" ? "right-0" : "left-0"} 
              w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Background Settings
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Theme Mode */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <ThemeModeSelector
                value={localTheme}
                onChange={handleThemeChange}
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-2 overflow-x-auto border-b border-slate-200 dark:border-slate-800">
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  label={tab.label}
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence mode="wait">
                {/* Presets Tab */}
                {activeTab === "presets" && (
                  <motion.div
                    key="presets"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {Object.entries(presetCategories).map(
                      ([category, presets]) => (
                        <div key={category} className="space-y-3">
                          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                            {category} Backgrounds
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {presets.map((name) => {
                              const state = demoBackgroundStates[name];
                              if (!state) return null;
                              return (
                                <PresetCard
                                  key={name}
                                  name={name}
                                  state={state}
                                  isSelected={selectedPreset === name}
                                  onSelect={() => handlePresetSelect(name)}
                                />
                              );
                            })}
                          </div>
                        </div>
                      ),
                    )}
                  </motion.div>
                )}

                {/* Solid Tab */}
                {activeTab === "solid" && (
                  <motion.div
                    key="solid"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <ColorPicker
                      label="Color"
                      value={
                        customConfig.type === "solid"
                          ? customConfig.color.startsWith("#")
                            ? customConfig.color
                            : "#1e293b"
                          : "#1e293b"
                      }
                      onChange={(color) =>
                        setCustomConfig({ type: "solid", color })
                      }
                    />
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                        Theme Variants
                      </h4>
                      <div className="space-y-3">
                        <ColorPicker
                          label="Light"
                          value="#f8fafc"
                          onChange={(color) =>
                            setCustomConfig({
                              type: "solid",
                              color:
                                customConfig.type === "solid"
                                  ? customConfig.color
                                  : "#1e293b",
                              theme: { light: color, dark: "#1e293b" },
                            })
                          }
                        />
                        <ColorPicker
                          label="Dark"
                          value="#1e293b"
                          onChange={(color) =>
                            setCustomConfig({
                              type: "solid",
                              color:
                                customConfig.type === "solid"
                                  ? customConfig.color
                                  : "#1e293b",
                              theme: { light: "#f8fafc", dark: color },
                            })
                          }
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleApplyCustom}
                      className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                    >
                      Apply Solid Background
                    </button>
                  </motion.div>
                )}

                {/* Gradient Tab */}
                {activeTab === "gradient" && (
                  <motion.div
                    key="gradient"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <Select<GradientType>
                      label="Gradient Type"
                      value={
                        customConfig.type === "gradient"
                          ? customConfig.gradientType
                          : "linear"
                      }
                      options={[
                        { value: "linear", label: "Linear" },
                        { value: "radial", label: "Radial" },
                        { value: "conic", label: "Conic" },
                      ]}
                      onChange={(gradientType) =>
                        setCustomConfig({
                          type: "gradient",
                          gradientType,
                          colors: gradientColors,
                          direction: "to bottom right",
                          animated: false,
                        })
                      }
                    />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Colors ({gradientColors.length}/6)
                        </label>
                        <button
                          onClick={addGradientColor}
                          disabled={gradientColors.length >= 6}
                          className="text-sm text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          + Add Color
                        </button>
                      </div>
                      {gradientColors.map((color, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="color"
                            value={color}
                            onChange={(e) =>
                              updateGradientColor(index, e.target.value)
                            }
                            className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-700 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={color}
                            onChange={(e) =>
                              updateGradientColor(index, e.target.value)
                            }
                            className="flex-1 px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                          />
                          {gradientColors.length > 2 && (
                            <button
                              onClick={() => removeGradientColor(index)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <Select<string>
                      label="Direction"
                      value={
                        customConfig.type === "gradient"
                          ? customConfig.direction || "to bottom"
                          : "to bottom"
                      }
                      options={[
                        { value: "to top", label: "To Top" },
                        { value: "to bottom", label: "To Bottom" },
                        { value: "to left", label: "To Left" },
                        { value: "to right", label: "To Right" },
                        { value: "to top right", label: "To Top Right" },
                        { value: "to top left", label: "To Top Left" },
                        { value: "to bottom right", label: "To Bottom Right" },
                        { value: "to bottom left", label: "To Bottom Left" },
                      ]}
                      onChange={(direction) =>
                        setCustomConfig({
                          type: "gradient",
                          gradientType:
                            customConfig.type === "gradient"
                              ? customConfig.gradientType
                              : "linear",
                          colors: gradientColors,
                          direction,
                          animated:
                            customConfig.type === "gradient"
                              ? customConfig.animated
                              : false,
                        })
                      }
                    />

                    <Toggle
                      label="Animated"
                      checked={
                        customConfig.type === "gradient"
                          ? customConfig.animated || false
                          : false
                      }
                      onChange={(animated) =>
                        setCustomConfig({
                          type: "gradient",
                          gradientType:
                            customConfig.type === "gradient"
                              ? customConfig.gradientType
                              : "linear",
                          colors: gradientColors,
                          direction:
                            customConfig.type === "gradient"
                              ? customConfig.direction
                              : "to bottom",
                          animated,
                          animationDuration: 10,
                        })
                      }
                    />

                    {customConfig.type === "gradient" &&
                      customConfig.animated && (
                        <Slider
                          label="Animation Duration"
                          value={customConfig.animationDuration || 10}
                          onChange={(animationDuration) =>
                            setCustomConfig({
                              ...customConfig,
                              animationDuration,
                            })
                          }
                          min={1}
                          max={30}
                          step={1}
                          unit="s"
                        />
                      )}

                    {/* Preview */}
                    <div
                      className="w-full h-24 rounded-xl border border-slate-200 dark:border-slate-700"
                      style={{
                        background:
                          customConfig.type === "gradient"
                            ? customConfig.gradientType === "linear"
                              ? `linear-gradient(${customConfig.direction || "to bottom"}, ${gradientColors.join(", ")})`
                              : customConfig.gradientType === "radial"
                                ? `radial-gradient(circle, ${gradientColors.join(", ")})`
                                : `conic-gradient(${gradientColors.join(", ")})`
                            : undefined,
                      }}
                    />

                    <button
                      onClick={handleApplyCustom}
                      className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                    >
                      Apply Gradient Background
                    </button>
                  </motion.div>
                )}

                {/* Image Tab */}
                {activeTab === "image" && (
                  <motion.div
                    key="image"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="text-sm text-slate-600 dark:text-slate-400">
                        Image URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://example.com/image.jpg"
                        value={
                          customConfig.type === "image" ? customConfig.src : ""
                        }
                        onChange={(e) =>
                          setCustomConfig({
                            type: "image",
                            src: e.target.value,
                            position: "center",
                            size: "cover",
                            parallax: false,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                      />
                    </div>

                    <Select<string>
                      label="Position"
                      value={
                        customConfig.type === "image"
                          ? customConfig.position || "center"
                          : "center"
                      }
                      options={[
                        { value: "center", label: "Center" },
                        { value: "top", label: "Top" },
                        { value: "bottom", label: "Bottom" },
                        { value: "left", label: "Left" },
                        { value: "right", label: "Right" },
                      ]}
                      onChange={(position) =>
                        setCustomConfig({
                          type: "image",
                          src:
                            customConfig.type === "image"
                              ? customConfig.src
                              : "",
                          position,
                          size:
                            customConfig.type === "image"
                              ? customConfig.size
                              : "cover",
                          parallax:
                            customConfig.type === "image"
                              ? customConfig.parallax
                              : false,
                        })
                      }
                    />

                    <Select<string>
                      label="Size"
                      value={
                        customConfig.type === "image"
                          ? customConfig.size || "cover"
                          : "cover"
                      }
                      options={[
                        { value: "cover", label: "Cover" },
                        { value: "contain", label: "Contain" },
                        { value: "auto", label: "Auto" },
                      ]}
                      onChange={(size) =>
                        setCustomConfig({
                          type: "image",
                          src:
                            customConfig.type === "image"
                              ? customConfig.src
                              : "",
                          position:
                            customConfig.type === "image"
                              ? customConfig.position
                              : "center",
                          size,
                          parallax:
                            customConfig.type === "image"
                              ? customConfig.parallax
                              : false,
                        })
                      }
                    />

                    <Toggle
                      label="Parallax Effect"
                      checked={
                        customConfig.type === "image"
                          ? customConfig.parallax || false
                          : false
                      }
                      onChange={(parallax) =>
                        setCustomConfig({
                          type: "image",
                          src:
                            customConfig.type === "image"
                              ? customConfig.src
                              : "",
                          position:
                            customConfig.type === "image"
                              ? customConfig.position
                              : "center",
                          size:
                            customConfig.type === "image"
                              ? customConfig.size
                              : "cover",
                          parallax,
                          parallaxSpeed: 0.3,
                        })
                      }
                    />

                    {customConfig.type === "image" && customConfig.parallax && (
                      <Slider
                        label="Parallax Speed"
                        value={customConfig.parallaxSpeed || 0.3}
                        onChange={(parallaxSpeed) =>
                          setCustomConfig({ ...customConfig, parallaxSpeed })
                        }
                        min={0.1}
                        max={1}
                        step={0.1}
                      />
                    )}

                    <button
                      onClick={handleApplyCustom}
                      className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                    >
                      Apply Image Background
                    </button>
                  </motion.div>
                )}

                {/* Overlay Tab */}
                {activeTab === "overlay" && (
                  <motion.div
                    key="overlay"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <ColorPicker
                      label="Color"
                      value={customOverlay.color || "#000000"}
                      onChange={(color) =>
                        setCustomOverlay({ ...customOverlay, color })
                      }
                    />

                    <Slider
                      label="Opacity"
                      value={customOverlay.opacity || 0}
                      onChange={(opacity) =>
                        setCustomOverlay({ ...customOverlay, opacity })
                      }
                      min={0}
                      max={1}
                      step={0.05}
                    />

                    <Slider
                      label="Blur"
                      value={customOverlay.blur || 0}
                      onChange={(blur) =>
                        setCustomOverlay({ ...customOverlay, blur })
                      }
                      min={0}
                      max={20}
                      step={1}
                      unit="px"
                    />

                    <Toggle
                      label="Grain Effect"
                      checked={customOverlay.grain || false}
                      onChange={(grain) =>
                        setCustomOverlay({ ...customOverlay, grain })
                      }
                    />

                    <button
                      onClick={handleApplyCustom}
                      className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                    >
                      Apply Overlay Settings
                    </button>
                  </motion.div>
                )}

                {/* Transition/Effects Tab */}
                {activeTab === "transition" && (
                  <motion.div
                    key="transition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <Select<"fade" | "slide" | "scale" | "none">
                      label="Transition Type"
                      value={customTransition.type || "fade"}
                      options={[
                        { value: "fade", label: "Fade" },
                        { value: "slide", label: "Slide" },
                        { value: "scale", label: "Scale" },
                        { value: "none", label: "None" },
                      ]}
                      onChange={(type) =>
                        setCustomTransition({ ...customTransition, type })
                      }
                    />

                    <Slider
                      label="Duration"
                      value={customTransition.duration || 0.5}
                      onChange={(duration) =>
                        setCustomTransition({ ...customTransition, duration })
                      }
                      min={0}
                      max={2}
                      step={0.1}
                      unit="s"
                    />

                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                      <Select<"global" | "layout" | "route">
                        label="Priority"
                        value={priority}
                        options={[
                          { value: "global", label: "Global (Lowest)" },
                          { value: "layout", label: "Layout (Medium)" },
                          { value: "route", label: "Route (Highest)" },
                        ]}
                        onChange={setPriority}
                      />
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        Higher priority backgrounds override lower priority
                        ones.
                      </p>
                    </div>

                    <button
                      onClick={handleApplyCustom}
                      className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                    >
                      Apply Transition Settings
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setBackground({
                    config: null,
                    priority: "global",
                  });
                  setSelectedPreset(null);
                }}
                className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Reset to Default
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
