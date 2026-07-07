type variantType =
  | "primary"
  | "blue"
  | "secondary"
  | "danger"
  | "success"
  | "inline"
  | "transparent";

type sizeType = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

// Define the style theme types
type styleThemeType = "default" | "gradient" | "glass";

/**
 * Complete size styles implementation
 */
const sizeStyles = ({
  variant,
  sizeType,
}: {
  variant: variantType;
  sizeType: sizeType;
}): string => {
  const sizeMap: Record<sizeType, { padding: string; text: string }> = {
    xxs: { padding: "px-1 py-0.5", text: "text-xxs" },
    xs: { padding: "px-2 py-1", text: "text-xs" },
    sm: { padding: "px-3 py-1.5", text: "text-sm" },
    md: { padding: "px-4 py-2", text: "text-base" },
    lg: { padding: "px-6 py-3", text: "text-lg" },
    xl: { padding: "px-8 py-4", text: "text-xl" },
    xxl: { padding: "px-10 py-5", text: "text-2xl" },
  };

  const { padding, text } = sizeMap[sizeType];
  return `${padding} ${text}`;
};

// Define the structure for variant styles
type VariantStyleConfig = {
  style: string;
  image: string;
  icon: string;
};

// Enhanced variant styles with better interactive design
const variantStylesDefault: Record<variantType, VariantStyleConfig> = {
  primary: {
    style:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md disabled:bg-blue-300 disabled:hover:bg-blue-300 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200",
    image: "bg-white rounded-full shadow-sm ring-2 ring-blue-100",
    icon: "text-white w-5 h-5 transition-transform group-hover:scale-110 duration-200",
  },

  blue: {
    style:
      "bg-blue-50 text-blue-700 hover:bg-blue-100 active:bg-blue-200 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 border border-blue-200 hover:border-blue-300 disabled:bg-blue-25 disabled:text-blue-300 disabled:hover:bg-blue-25 disabled:border-blue-100 disabled:cursor-not-allowed transition-all duration-200",
    image: "bg-white rounded-full shadow-sm ring-2 ring-blue-200",
    icon: "text-blue-600 w-5 h-5 transition-transform group-hover:scale-110 duration-200",
  },

  secondary: {
    style:
      "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 hover:text-gray-900 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 border border-gray-200 hover:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:hover:bg-gray-50 disabled:border-gray-100 disabled:cursor-not-allowed transition-all duration-200",
    image: "bg-white rounded-full shadow-sm ring-2 ring-gray-200",
    icon: "text-gray-600 w-5 h-5 transition-transform group-hover:scale-110 duration-200",
  },

  danger: {
    style:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-sm hover:shadow-md disabled:bg-red-300 disabled:hover:bg-red-300 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200",
    image: "bg-white rounded-full shadow-sm ring-2 ring-red-100",
    icon: "text-white w-5 h-5 transition-transform group-hover:scale-110 duration-200",
  },

  success: {
    style:
      "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-sm hover:shadow-md disabled:bg-green-300 disabled:hover:bg-green-300 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200",
    image: "bg-white rounded-full shadow-sm ring-2 ring-green-100",
    icon: "text-white w-5 h-5 transition-transform group-hover:scale-110 duration-200",
  },

  inline: {
    style:
      "bg-transparent text-blue-600 hover:text-blue-900 active:text-blue-800 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:text-blue-300 disabled:hover:text-blue-300 disabled:cursor-not-allowed p-0 transition-all duration-200",
    image: "w-4 h-4 mr-1 opacity-80 group-hover:opacity-100 transition-opacity duration-200",
    icon: "text-blue-600 w-4 h-4 mr-1 transition-all group-hover:text-blue-700 group-hover:scale-105 duration-200",
  },

  transparent: {
    style:
      "bg-transparent hover:bg-gray-50 active:bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300 hover:text-gray-900 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400 disabled:border-gray-100 disabled:cursor-not-allowed transition-all duration-200",
    image: "bg-white rounded-full shadow-sm ring-1 ring-gray-200",
    icon: "text-gray-600 w-5 h-5 transition-all group-hover:text-gray-800 group-hover:scale-105 duration-200",
  },
};

// Modern gradient variants
const variantStylesGradient: Record<variantType, VariantStyleConfig> = {
  primary: {
    style:
      "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-600/40 disabled:from-blue-300 disabled:to-blue-300 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300",
    image: "bg-white rounded-full shadow-md ring-2 ring-white/50",
    icon: "text-white w-5 h-5 drop-shadow-sm transition-all group-hover:scale-110 group-hover:rotate-3 duration-300",
  },

  blue: {
    style:
      "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-200 active:from-blue-200 active:to-blue-300 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 border border-blue-200 hover:border-blue-300 disabled:from-blue-25 disabled:to-blue-25 disabled:text-blue-300 disabled:border-blue-100 disabled:cursor-not-allowed transition-all duration-300",
    image: "bg-white rounded-full shadow-sm ring-2 ring-blue-300/50",
    icon: "text-blue-600 w-5 h-5 transition-all group-hover:scale-110 group-hover:text-blue-700 duration-300",
  },

  secondary: {
    style:
      "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 active:from-gray-300 active:to-gray-400 hover:text-gray-900 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 border border-gray-300 hover:border-gray-400 disabled:from-gray-50 disabled:to-gray-50 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed transition-all duration-300",
    image: "bg-white rounded-full shadow-sm ring-2 ring-gray-300/50",
    icon: "text-gray-600 w-5 h-5 transition-all group-hover:scale-110 group-hover:text-gray-800 duration-300",
  },

  danger: {
    style:
      "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 active:from-red-800 active:to-red-900 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-600/40 disabled:from-red-300 disabled:to-red-300 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300",
    image: "bg-white rounded-full shadow-md ring-2 ring-white/50",
    icon: "text-white w-5 h-5 drop-shadow-sm transition-all group-hover:scale-110 duration-300",
  },

  success: {
    style:
      "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 active:from-green-800 active:to-green-900 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-600/40 disabled:from-green-300 disabled:to-green-300 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300",
    image: "bg-white rounded-full shadow-md ring-2 ring-white/50",
    icon: "text-white w-5 h-5 drop-shadow-sm transition-all group-hover:scale-110 duration-300",
  },

  inline: {
    style:
      "bg-transparent text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:from-blue-300 disabled:to-blue-300 disabled:cursor-not-allowed p-0 transition-all duration-300",
    image: "w-4 h-4 mr-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300",
    icon: "text-blue-600 w-4 h-4 mr-1 transition-all group-hover:text-blue-700 group-hover:scale-105 duration-300",
  },

  transparent: {
    style:
      "bg-transparent hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 active:from-gray-100 active:to-gray-200 text-gray-700 border border-gray-200 hover:border-gray-300 hover:text-gray-900 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:text-gray-400 disabled:hover:bg-transparent disabled:border-gray-100 disabled:cursor-not-allowed transition-all duration-300",
    image: "bg-white rounded-full shadow-sm ring-1 ring-gray-300/50",
    icon: "text-gray-600 w-5 h-5 transition-all group-hover:text-gray-800 group-hover:scale-105 duration-300",
  },
};

// Glassmorphism variant (modern, trendy design)
const variantStylesGlass: Record<variantType, VariantStyleConfig> = {
  primary: {
    style:
      "bg-blue-500/80 backdrop-blur-md text-white hover:bg-blue-600/90 active:bg-blue-700/90 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-600/30 border border-white/20 disabled:bg-blue-300/60 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300",
    image: "bg-white/90 backdrop-blur-sm rounded-full shadow-lg ring-2 ring-white/30",
    icon: "text-white w-5 h-5 drop-shadow-lg transition-all group-hover:scale-110 group-hover:drop-shadow-2xl duration-300",
  },

  blue: {
    style:
      "bg-blue-100/60 backdrop-blur-md text-blue-700 hover:bg-blue-200/70 active:bg-blue-300/70 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 border border-blue-200/50 hover:border-blue-300/60 disabled:bg-blue-50/40 disabled:text-blue-300 disabled:cursor-not-allowed transition-all duration-300",
    image: "bg-white/80 backdrop-blur-sm rounded-full shadow-md ring-2 ring-blue-200/40",
    icon: "text-blue-600 w-5 h-5 transition-all group-hover:scale-110 group-hover:text-blue-700 duration-300",
  },

  secondary: {
    style:
      "bg-gray-200/60 backdrop-blur-md text-gray-700 hover:bg-gray-300/70 active:bg-gray-400/70 hover:text-gray-900 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 border border-gray-300/50 hover:border-gray-400/60 disabled:bg-gray-100/40 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300",
    image: "bg-white/80 backdrop-blur-sm rounded-full shadow-md ring-2 ring-gray-300/40",
    icon: "text-gray-600 w-5 h-5 transition-all group-hover:scale-110 group-hover:text-gray-800 duration-300",
  },

  danger: {
    style:
      "bg-red-500/80 backdrop-blur-md text-white hover:bg-red-600/90 active:bg-red-700/90 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-600/30 border border-white/20 disabled:bg-red-300/60 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300",
    image: "bg-white/90 backdrop-blur-sm rounded-full shadow-lg ring-2 ring-white/30",
    icon: "text-white w-5 h-5 drop-shadow-lg transition-all group-hover:scale-110 group-hover:drop-shadow-2xl duration-300",
  },

  success: {
    style:
      "bg-green-500/80 backdrop-blur-md text-white hover:bg-green-600/90 active:bg-green-700/90 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-600/30 border border-white/20 disabled:bg-green-300/60 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300",
    image: "bg-white/90 backdrop-blur-sm rounded-full shadow-lg ring-2 ring-white/30",
    icon: "text-white w-5 h-5 drop-shadow-lg transition-all group-hover:scale-110 group-hover:drop-shadow-2xl duration-300",
  },

  inline: {
    style:
      "bg-transparent text-blue-600 hover:text-blue-700 active:text-blue-800 focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 disabled:text-blue-300 disabled:cursor-not-allowed p-0 transition-all duration-300",
    image: "w-4 h-4 mr-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300",
    icon: "text-blue-600 w-4 h-4 mr-1 transition-all group-hover:text-blue-700 group-hover:scale-105 duration-300",
  },

  transparent: {
    style:
      "bg-white/40 backdrop-blur-md hover:bg-white/60 active:bg-white/70 text-gray-700 border border-gray-200/50 hover:border-gray-300/60 hover:text-gray-900 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:text-gray-400 disabled:bg-white/20 disabled:border-gray-200/30 disabled:cursor-not-allowed transition-all duration-300",
    image: "bg-white/70 backdrop-blur-sm rounded-full shadow-sm ring-1 ring-gray-200/40",
    icon: "text-gray-600 w-5 h-5 transition-all group-hover:text-gray-800 group-hover:scale-105 duration-300",
  },
};

// Fixed interface for variant style parameters
interface VariantStyleParams {
  styleTheme: styleThemeType;
  variant: variantType;
}

// Map of all style themes
const styleThemeMap: Record<
  styleThemeType,
  Record<variantType, VariantStyleConfig>
> = {
  default: variantStylesDefault,
  gradient: variantStylesGradient,
  glass: variantStylesGlass,
};

// Fixed function to get variant styles
const getVariantStyles = ({
  styleTheme,
  variant,
}: VariantStyleParams): VariantStyleConfig => {
  return styleThemeMap[styleTheme][variant];
};

// Helper function to get complete button styles
const getButtonStyles = ({
  variant = "primary",
  sizeType = "md",
  styleTheme = "default",
  fullWidth = false,
  underline = false,
}: {
  variant?: variantType;
  sizeType?: sizeType;
  styleTheme?: styleThemeType;
  fullWidth?: boolean;
  underline?: boolean;
}): string => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none disabled:cursor-not-allowed";

  const variantConfig = getVariantStyles({ styleTheme, variant });
  const sizeClasses = sizeStyles({ variant, sizeType });

  // Width class
  const widthClass = fullWidth ? "w-full" : "";

  // Underline class (only for inline variant)
  const underlineClass =
    variant === "inline" && underline
      ? "underline underline-offset-2 hover:underline-offset-4 decoration-blue-600/60 hover:decoration-blue-600/80"
      : variant === "inline" && !underline
      ? "no-underline"
      : "";

  return `${baseStyles} ${variantConfig.style} ${sizeClasses} ${widthClass} ${underlineClass}`.trim();
};

// Helper to get icon styles
const getIconStyles = ({
  variant = "primary",
  styleTheme = "default",
}: {
  variant?: variantType;
  styleTheme?: styleThemeType;
}): string => {
  const variantConfig = getVariantStyles({ styleTheme, variant });
  return variantConfig.icon;
};

// Helper to get image styles
const getImageStyles = ({
  variant = "primary",
  styleTheme = "default",
}: {
  variant?: variantType;
  styleTheme?: styleThemeType;
}): string => {
  const variantConfig = getVariantStyles({ styleTheme, variant });
  return variantConfig.image;
};

// Export all style theme maps for direct access if needed
export {
  getButtonStyles,
  getIconStyles,
  getImageStyles,
  getVariantStyles,
  type sizeType,
  type variantType,
  type styleThemeType,
};