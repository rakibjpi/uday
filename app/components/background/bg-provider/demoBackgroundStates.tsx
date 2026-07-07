import type { BackgroundState } from "~/components/background/index";

// ============================================================================
export const demoBackgroundStates: Record<string, BackgroundState> = {
  // Solid color backgrounds
  solid: {
    config: {
      type: "solid",
      color: "bg-slate-900",
      theme: {
        light: "bg-slate-100",
        dark: "bg-slate-900",
      },
    },
    priority: "route",
  },
  solidDark: {
    config: {
      type: "solid",
      color: "bg-gray-950",
      theme: {
        light: "bg-gray-50",
        dark: "bg-gray-950",
      },
    },
    priority: "route",
  },

  // Gradient backgrounds
  gradient: {
    config: {
      type: "gradient",
      gradientType: "linear",
      colors: ["#667eea", "#764ba2", "#f093fb"],
      direction: "to bottom right",
      animated: true,
      animationDuration: 10,
    },
    overlay: { opacity: 0.1, color: "#000" },
    transition: { duration: 0.8, type: "fade" },
    priority: "route",
  },
  gradientSunset: {
    config: {
      type: "gradient",
      gradientType: "linear",
      colors: ["#ff6b6b", "#feca57", "#ff9ff3"],
      direction: "to bottom",
      animated: true,
      animationDuration: 15,
    },
    overlay: { opacity: 0.15, color: "#000" },
    transition: { duration: 0.6, type: "fade" },
    priority: "route",
  },
  gradientOcean: {
    config: {
      type: "gradient",
      gradientType: "linear",
      colors: ["#0077b6", "#00b4d8", "#90e0ef"],
      direction: "to bottom right",
      animated: true,
      animationDuration: 12,
    },
    overlay: { opacity: 0.1, color: "#000" },
    transition: { duration: 0.7, type: "slide" },
    priority: "route",
  },
  gradientForest: {
    config: {
      type: "gradient",
      gradientType: "linear",
      colors: ["#2d6a4f", "#40916c", "#95d5b2"],
      direction: "to bottom",
      animated: false,
    },
    overlay: { opacity: 0.2, color: "#000", grain: true },
    transition: { duration: 0.5, type: "fade" },
    priority: "route",
  },
  gradientRadial: {
    config: {
      type: "gradient",
      gradientType: "radial",
      colors: ["#4c1d95", "#7c3aed", "#a78bfa", "#c4b5fd"],
      animated: false,
    },
    overlay: { opacity: 0.1, color: "#000" },
    transition: { duration: 0.6, type: "scale" },
    priority: "route",
  },
  gradientConic: {
    config: {
      type: "gradient",
      gradientType: "conic",
      colors: [
        "#f97316",
        "#eab308",
        "#22c55e",
        "#06b6d4",
        "#8b5cf6",
        "#f97316",
      ],
      animated: true,
      animationDuration: 20,
    },
    overlay: { blur: 4, opacity: 0.2, color: "#000" },
    transition: { duration: 0.8, type: "fade" },
    priority: "route",
  },

  // Image backgrounds
  image: {
    config: {
      type: "image",
      src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200",
      position: "center",
      size: "cover",
      parallax: true,
      parallaxSpeed: 0.3,
    },
    overlay: { blur: 8, opacity: 0.6, color: "#000", grain: true },
    priority: "route",
  },
  imageMountain: {
    config: {
      type: "image",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
      position: "center",
      size: "cover",
      parallax: true,
      parallaxSpeed: 0.4,
    },
    overlay: { blur: 4, opacity: 0.4, color: "#1e293b" },
    transition: { duration: 0.8, type: "fade" },
    priority: "route",
  },
  imageCity: {
    config: {
      type: "image",
      src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200",
      position: "center",
      size: "cover",
      parallax: false,
    },
    overlay: { blur: 12, opacity: 0.7, color: "#0f172a", grain: true },
    transition: { duration: 0.6, type: "slide" },
    priority: "route",
  },

  // Minimal/Clean backgrounds
  minimal: {
    config: {
      type: "solid",
      color: "bg-white",
      theme: {
        light: "bg-white",
        dark: "bg-slate-950",
      },
    },
    transition: { duration: 0.3, type: "fade" },
    priority: "global",
  },
  minimalGray: {
    config: {
      type: "solid",
      color: "bg-gray-100",
      theme: {
        light: "bg-gray-100",
        dark: "bg-gray-900",
      },
    },
    transition: { duration: 0.3, type: "fade" },
    priority: "global",
  },

  // Auth/Form backgrounds
  authGradient: {
    config: {
      type: "gradient",
      gradientType: "linear",
      colors: ["#1e1b4b", "#312e81", "#4338ca"],
      direction: "to bottom right",
      animated: false,
    },
    overlay: { grain: true, opacity: 0.05 },
    transition: { duration: 0.5, type: "fade" },
    priority: "layout",
  },
  authDark: {
    config: {
      type: "solid",
      color: "bg-slate-950",
    },
    overlay: { grain: true },
    transition: { duration: 0.4, type: "fade" },
    priority: "layout",
  },

  // Dashboard backgrounds
  dashboard: {
    config: {
      type: "solid",
      color: "bg-slate-100",
      theme: {
        light: "bg-slate-100",
        dark: "bg-slate-900",
      },
    },
    transition: { duration: 0.2, type: "none" },
    priority: "layout",
  },
  dashboardGradient: {
    config: {
      type: "gradient",
      gradientType: "linear",
      colors: ["#f8fafc", "#e2e8f0"],
      direction: "to bottom",
      theme: {
        light: ["#f8fafc", "#e2e8f0"],
        dark: ["#0f172a", "#1e293b"],
      },
    },
    transition: { duration: 0.3, type: "fade" },
    priority: "layout",
  },
};
