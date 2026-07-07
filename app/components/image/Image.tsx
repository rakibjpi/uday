import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  createContext,
  useContext,
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";

// ============================================================================
// TYPES
// ============================================================================

type ImageFit = "contain" | "cover" | "fill" | "none" | "scale-down";
type ImagePosition =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";
type LoadingStrategy = "lazy" | "eager";
type FetchPriority = "high" | "low" | "auto";
type ImageFormat = "auto" | "webp" | "avif" | "jpeg" | "png";
type PlaceholderType = "blur" | "empty" | "color" | "shimmer" | "skeleton" | "gradient";

interface ImageSize {
  width: number;
  descriptor: "w" | "x";
}

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  loading?: LoadingStrategy;
  fetchPriority?: FetchPriority;
  preload?: boolean;
  blurDataURL?: string;
  placeholder?: PlaceholderType;
  placeholderColor?: string;
  decoding?: "async" | "sync" | "auto";
  fit?: ImageFit;
  position?: ImagePosition;
  fill?: boolean;
  sizes?: string;
  srcSet?: string;
  imageSizes?: number[];
  deviceSizes?: number[];
  customSrcSet?: ImageSize[];
  format?: ImageFormat;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onLoadingComplete?: (result: {
    naturalWidth: number;
    naturalHeight: number;
    loadTime: number;
  }) => void;
  onLoadStart?: () => void;
  unoptimized?: boolean;
  role?: string;
  title?: string;
  draggable?: boolean;
  crossOrigin?: "anonymous" | "use-credentials";
  referrerPolicy?: React.ImgHTMLAttributes<HTMLImageElement>["referrerPolicy"];
  fadeIn?: boolean;
  fadeDuration?: number;
  retryCount?: number;
  retryDelay?: number;
  aspectRatio?: string;
  lazyBoundary?: string;
  threshold?: number;
}

// ============================================================================
// CONFIGURATION CONTEXT
// ============================================================================

interface ImageConfigContextValue {
  defaultQuality: number;
  defaultFormat: ImageFormat;
  imageSizes: number[];
  deviceSizes: number[];
  domains: string[];
  enableBlurPlaceholder: boolean;
  enableRetry: boolean;
  maxRetries: number;
  retryDelay: number;
  loaderFunction?: (props: {
    src: string;
    width?: number;
    quality?: number;
    format?: ImageFormat;
  }) => string;
  onImageLoad?: (src: string, loadTime: number) => void;
  onImageError?: (src: string, error: Error) => void;
}

const ImageConfigContext = createContext<ImageConfigContextValue>({
  defaultQuality: 75,
  defaultFormat: "auto",
  imageSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  domains: [],
  enableBlurPlaceholder: true,
  enableRetry: true,
  maxRetries: 3,
  retryDelay: 1000,
});

const ImageConfigProvider: React.FC<{
  children: ReactNode;
  config?: Partial<ImageConfigContextValue>;
}> = ({ children, config }) => {
  const value = useMemo(
    () => ({
      defaultQuality: 75,
      defaultFormat: "auto" as ImageFormat,
      imageSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      domains: [],
      enableBlurPlaceholder: true,
      enableRetry: true,
      maxRetries: 3,
      retryDelay: 1000,
      ...config,
    }),
    [config],
  );

  return (
    <ImageConfigContext.Provider value={value}>
      {children}
    </ImageConfigContext.Provider>
  );
};

const useImageConfig = () => useContext(ImageConfigContext);

// ============================================================================
// ERROR BOUNDARY
// ============================================================================

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ImageErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Image component error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="bg-gray-100 flex items-center justify-center w-full h-full">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate blur placeholder with gradient
 */
function generateBlurSvg(
  width: number,
  height: number,
  color = "#e2e8f0",
): string {
  const adjustedColor = adjustBrightness(color, -10);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${adjustedColor};stop-opacity:1" />
      </linearGradient>
      <filter id="b" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="20"/>
        <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1" result="s"/>
        <feFlood x="0" y="0" width="100%" height="100%" fill="url(#g)" result="bg"/>
        <feBlend in="s" in2="bg" mode="normal"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" filter="url(#b)" fill="url(#g)"/>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Generate shimmer effect
 */
function generateShimmerSvg(
  width: number,
  height: number,
  baseColor = "#e2e8f0",
  shimmerColor = "#f1f5f9",
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="shimmer" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stop-color="${baseColor}"/>
        <stop offset="50%" stop-color="${shimmerColor}"/>
        <stop offset="100%" stop-color="${baseColor}"/>
        <animateTransform
          attributeName="gradientTransform"
          type="translate"
          from="-1 0"
          to="1 0"
          dur="1.5s"
          repeatCount="indefinite"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#shimmer)"/>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Generate gradient placeholder
 */
function generateGradientSvg(
  width: number,
  height: number,
  colors = ["#667eea", "#764ba2"],
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        ${colors.map((color, i) => `<stop offset="${(i / (colors.length - 1)) * 100}%" style="stop-color:${color};stop-opacity:1" />`).join("")}
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)"/>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Adjust color brightness
 */
function adjustBrightness(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;
}

/**
 * Format detection cache
 */
const supportedFormatsCache = new Map<ImageFormat, boolean>();

async function detectFormatSupport(format: ImageFormat): Promise<boolean> {
  if (supportedFormatsCache.has(format)) {
    return supportedFormatsCache.get(format)!;
  }

  if (typeof window === "undefined") {
    supportedFormatsCache.set(format, false);
    return false;
  }

  if (format === "jpeg" || format === "png") {
    supportedFormatsCache.set(format, true);
    return true;
  }

  if (format === "webp") {
    const canvas = document.createElement("canvas");
    const supported = canvas
      .toDataURL("image/webp")
      .startsWith("data:image/webp");
    supportedFormatsCache.set(format, supported);
    return supported;
  }

  if (format === "avif") {
    return new Promise((resolve) => {
      const avif = new Image();
      avif.onload = () => {
        const supported = avif.width > 0 && avif.height > 0;
        supportedFormatsCache.set(format, supported);
        resolve(supported);
      };
      avif.onerror = () => {
        supportedFormatsCache.set(format, false);
        resolve(false);
      };
      avif.src =
        "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKBzgABohQEAwgMgwf8AAAAAAAMNOvhZ+AACHNwBA=";
    });
  }

  supportedFormatsCache.set(format, false);
  return false;
}

async function getOptimalFormat(
  preferredFormat: ImageFormat,
): Promise<ImageFormat> {
  if (preferredFormat !== "auto") return preferredFormat;
  if (await detectFormatSupport("avif")) return "avif";
  if (await detectFormatSupport("webp")) return "webp";
  return "jpeg";
}

/**
 * Hook for optimal format detection
 */
function useOptimalFormat(
  format: ImageFormat,
  unoptimized: boolean,
): ImageFormat {
  const [optimalFormat, setOptimalFormat] = useState<ImageFormat>(
    format === "auto" ? "jpeg" : format,
  );

  useEffect(() => {
    if (unoptimized || format !== "auto") {
      setOptimalFormat(format);
      return;
    }
    getOptimalFormat(format).then(setOptimalFormat);
  }, [format, unoptimized]);

  return optimalFormat;
}

/**
 * Generate srcset string
 */
function generateSrcSet(
  src: string,
  sizes: number[],
  quality: number,
  format: ImageFormat,
  loader?: ImageConfigContextValue["loaderFunction"],
): string {
  return sizes
    .map((size) => {
      const url = loader
        ? loader({ src, width: size, quality, format })
        : `${src}?w=${size}&q=${quality}&f=${format}`;
      return `${url} ${size}w`;
    })
    .join(", ");
}

/**
 * Generate responsive sizes attribute
 */
function generateResponsiveSizes(
  deviceSizes: number[],
  imageWidth?: number,
): string {
  if (imageWidth) {
    return `(max-width: ${imageWidth}px) 100vw, ${imageWidth}px`;
  }

  const sortedSizes = [...deviceSizes].sort((a, b) => a - b);
  const sizeQueries = sortedSizes.slice(0, -1).map((size, index) => {
    const nextSize = sortedSizes[index + 1];
    return `(max-width: ${nextSize}px) ${size}px`;
  });

  return [...sizeQueries, `${sortedSizes[sortedSizes.length - 1]}px`].join(", ");
}

/**
 * Parse aspect ratio string
 */
function parseAspectRatio(aspectRatio: string): { width: number; height: number } | null {
  const match = aspectRatio.match(/^(\d+(?:\.\d+)?)\s*[/:]\s*(\d+(?:\.\d+)?)$/);
  if (!match) return null;
  return { width: parseFloat(match[1]), height: parseFloat(match[2]) };
}

/**
 * Device capabilities detection
 */
function useDeviceCapabilities() {
  const [caps, setCaps] = useState({
    isMobile: false,
    isLowEnd: false,
    hasSlowConnection: false,
    prefersReducedData: false,
    prefersReducedMotion: false,
    dpr: 1,
  });

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;
    const hasSlowConnection =
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";
    const prefersReducedData = connection?.saveData === true;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = window.devicePixelRatio || 1;

    setCaps({ isMobile, isLowEnd, hasSlowConnection, prefersReducedData, prefersReducedMotion, dpr });
  }, []);

  return caps;
}

/**
 * Retry logic hook
 */
function useImageRetry(
  src: string,
  maxRetries: number,
  retryDelay: number,
  enabled: boolean,
) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retries, setRetries] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const retry = useCallback(() => {
    if (!enabled || retries >= maxRetries) return;

    timeoutRef.current = setTimeout(() => {
      setRetries((prev) => prev + 1);
      setCurrentSrc(`${src}?retry=${retries + 1}`);
    }, retryDelay * (retries + 1));
  }, [src, retries, maxRetries, retryDelay, enabled]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { currentSrc, retry, retries };
}

/**
 * Position and fit class mappings
 */
const positionMap: Record<ImagePosition, string> = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
  "top-left": "object-left-top",
  "top-right": "object-right-top",
  "bottom-left": "object-left-bottom",
  "bottom-right": "object-right-bottom",
};

const fitMap: Record<ImageFit, string> = {
  contain: "object-contain",
  cover: "object-cover",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
};

// ============================================================================
// OPTIMIZED IMAGE COMPONENT
// ============================================================================

export const OptimizedImage = React.memo(
  React.forwardRef<HTMLImageElement, ImageProps>(
    (
      {
        src,
        alt,
        width,
        height,
        quality,
        loading = "lazy",
        fetchPriority = "auto",
        preload = false,
        blurDataURL,
        placeholder = "empty",
        placeholderColor = "#e2e8f0",
        decoding = "async",
        fit = "cover",
        position = "center",
        fill = false,
        sizes,
        srcSet,
        imageSizes,
        deviceSizes,
        customSrcSet,
        format = "auto",
        className = "",
        style,
        onLoad,
        onError,
        onLoadingComplete,
        onLoadStart,
        unoptimized = false,
        role,
        title,
        draggable = false,
        crossOrigin,
        referrerPolicy,
        fadeIn = true,
        fadeDuration = 300,
        retryCount,
        retryDelay,
        aspectRatio,
        lazyBoundary = "200px",
        threshold = 0.01,
      },
      forwardedRef,
    ) => {
      const config = useImageConfig();
      const [isLoaded, setIsLoaded] = useState(false);
      const [hasError, setHasError] = useState(false);
      const [isInView, setIsInView] = useState(loading === "eager");
      const [loadStartTime, setLoadStartTime] = useState<number>(0);
      const internalRef = useRef<HTMLImageElement>(null);
      const containerRef = useRef<HTMLDivElement>(null);
      const deviceCaps = useDeviceCapabilities();

      const imgRef = forwardedRef || internalRef;

      // Retry logic
      const maxRetries = retryCount ?? config.maxRetries;
      const delayMs = retryDelay ?? config.retryDelay;
      const { currentSrc, retry, retries } = useImageRetry(
        src,
        maxRetries,
        delayMs,
        config.enableRetry,
      );

      // Quality and format optimization
      const effectiveQuality = quality ?? config.defaultQuality;
      const effectiveImageSizes = imageSizes ?? config.imageSizes;
      const effectiveDeviceSizes = deviceSizes ?? config.deviceSizes;

      const optimalFormat = useOptimalFormat(
        format === "auto" ? config.defaultFormat : format,
        unoptimized,
      );

      // Adjust quality based on device capabilities
      const adjustedQuality = useMemo(() => {
        if (deviceCaps.prefersReducedData || deviceCaps.hasSlowConnection) {
          return Math.min(effectiveQuality, 60);
        }
        if (deviceCaps.isLowEnd) {
          return Math.min(effectiveQuality, 70);
        }
        return effectiveQuality;
      }, [effectiveQuality, deviceCaps]);

      // Generate placeholders
      const blurPlaceholder = useMemo(() => {
        if (blurDataURL) return blurDataURL;
        if (!width || !height) return undefined;

        if (placeholder === "blur" && config.enableBlurPlaceholder) {
          return generateBlurSvg(width, height, placeholderColor);
        }
        if (placeholder === "shimmer") {
          return generateShimmerSvg(width, height, placeholderColor);
        }
        if (placeholder === "gradient") {
          return generateGradientSvg(width, height);
        }
        return undefined;
      }, [blurDataURL, placeholder, width, height, placeholderColor, config.enableBlurPlaceholder]);

      // Generate srcset
      const computedSrcSet = useMemo(() => {
        if (srcSet) return srcSet;
        if (unoptimized) return undefined;

        const allSizes = [
          ...new Set([...effectiveImageSizes, ...effectiveDeviceSizes]),
        ].sort((a, b) => a - b);

        return generateSrcSet(
          currentSrc,
          allSizes,
          adjustedQuality,
          optimalFormat,
          config.loaderFunction,
        );
      }, [
        currentSrc,
        srcSet,
        effectiveImageSizes,
        effectiveDeviceSizes,
        adjustedQuality,
        optimalFormat,
        unoptimized,
        config.loaderFunction,
      ]);

      // Compute sizes attribute
      const computedSizes = useMemo(() => {
        if (sizes) return sizes;
        return generateResponsiveSizes(effectiveDeviceSizes, width);
      }, [sizes, effectiveDeviceSizes, width]);

      // Aspect ratio calculation
      const computedAspectRatio = useMemo(() => {
        if (aspectRatio) {
          const parsed = parseAspectRatio(aspectRatio);
          if (parsed) {
            return `${parsed.width}/${parsed.height}`;
          }
        }
        if (width && height) {
          return `${width}/${height}`;
        }
        return undefined;
      }, [aspectRatio, width, height]);

      // Intersection Observer for lazy loading
      useEffect(() => {
        if (loading === "eager" || isInView) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          },
          {
            rootMargin: lazyBoundary,
            threshold,
          },
        );

        if (containerRef.current) {
          observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
      }, [loading, isInView, lazyBoundary, threshold]);

      // Preload link injection
      useEffect(() => {
        if (!preload || typeof document === "undefined") return;

        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = currentSrc;
        if (computedSrcSet) link.setAttribute("imagesrcset", computedSrcSet);
        if (computedSizes) link.setAttribute("imagesizes", computedSizes);
        document.head.appendChild(link);

        return () => {
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
        };
      }, [preload, currentSrc, computedSrcSet, computedSizes]);

      // Handle image load
      const handleLoad = useCallback(
        (event: React.SyntheticEvent<HTMLImageElement>) => {
          const loadTime = loadStartTime ? Date.now() - loadStartTime : 0;
          
          setIsLoaded(true);
          setHasError(false);
          onLoad?.(event);

          const img = event.currentTarget;
          if (onLoadingComplete && img) {
            onLoadingComplete({
              naturalWidth: img.naturalWidth,
              naturalHeight: img.naturalHeight,
              loadTime,
            });
          }

          config.onImageLoad?.(currentSrc, loadTime);
        },
        [onLoad, onLoadingComplete, currentSrc, loadStartTime, config],
      );

      // Handle image error
      const handleError = useCallback(
        (event: React.SyntheticEvent<HTMLImageElement>) => {
          setHasError(true);
          
          const error = new Error(`Failed to load image: ${currentSrc}`);
          onError?.(event);
          config.onImageError?.(currentSrc, error);

          // Retry if enabled
          if (retries < maxRetries) {
            retry();
          }
        },
        [onError, currentSrc, retries, maxRetries, retry, config],
      );

      // Handle load start
      const handleLoadStart = useCallback(() => {
        setLoadStartTime(Date.now());
        onLoadStart?.();
      }, [onLoadStart]);

      // Container styles
      const containerStyle: React.CSSProperties = useMemo(
        () => ({
          position: fill ? "absolute" : "relative",
          ...(fill ? { inset: 0 } : {}),
          ...(!fill && width ? { width: `${width}px` } : {}),
          ...(!fill && height ? { height: `${height}px` } : {}),
          ...(computedAspectRatio && !fill ? { aspectRatio: computedAspectRatio } : {}),
          ...style,
        }),
        [fill, width, height, computedAspectRatio, style],
      );

      // Image classes
      const imageClasses = useMemo(() => {
        const classes = [className];

        if (fill) {
          classes.push("absolute inset-0 w-full h-full");
        }

        classes.push(fitMap[fit]);
        classes.push(positionMap[position]);

        if (fadeIn && !deviceCaps.prefersReducedMotion) {
          if (!isLoaded && placeholder !== "empty") {
            classes.push("opacity-0");
          } else {
            classes.push("opacity-100");
          }
          classes.push(`transition-opacity duration-[${fadeDuration}ms] ease-in-out`);
        }

        return classes.filter(Boolean).join(" ");
      }, [className, fill, fit, position, isLoaded, placeholder, fadeIn, fadeDuration, deviceCaps.prefersReducedMotion]);

      // Placeholder classes
      const placeholderClasses = useMemo(() => {
        const classes = ["absolute inset-0 w-full h-full"];
        classes.push(fitMap[fit]);
        classes.push(positionMap[position]);

        if (isLoaded) {
          classes.push("opacity-0");
        } else {
          classes.push("opacity-100");
        }

        if (fadeIn && !deviceCaps.prefersReducedMotion) {
          classes.push(`transition-opacity duration-[${fadeDuration}ms] ease-in-out`);
        }

        if (placeholder === "blur") {
          classes.push("blur-2xl scale-110");
        }

        return classes.join(" ");
      }, [fit, position, isLoaded, placeholder, fadeIn, fadeDuration, deviceCaps.prefersReducedMotion]);

      return (
        <ImageErrorBoundary>
          <div
            ref={containerRef}
            style={containerStyle}
            className={`overflow-hidden ${fill ? "" : "inline-block"}`}
          >
            {/* Placeholder */}
            {placeholder !== "empty" && !isLoaded && !hasError && (
              <>
                {(placeholder === "blur" || placeholder === "shimmer" || placeholder === "gradient") &&
                blurPlaceholder ? (
                  <img
                    src={blurPlaceholder}
                    alt=""
                    aria-hidden="true"
                    className={placeholderClasses}
                  />
                ) : placeholder === "color" ? (
                  <div
                    className={placeholderClasses}
                    style={{ backgroundColor: placeholderColor }}
                    aria-hidden="true"
                  />
                ) : placeholder === "skeleton" ? (
                  <div
                    className={`${placeholderClasses} bg-gray-200 animate-pulse`}
                    aria-hidden="true"
                  />
                ) : null}
              </>
            )}

            {/* Error state */}
            {hasError && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-400"
                role="img"
                aria-label={alt}
              >
                <svg
                  className="w-12 h-12 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {retries > 0 && retries < maxRetries && (
                  <p className="text-xs mt-2">Retrying... ({retries}/{maxRetries})</p>
                )}
              </div>
            )}

            {/* Main image */}
            {isInView && !hasError && (
              <img
                ref={imgRef as React.RefObject<HTMLImageElement>}
                src={currentSrc}
                alt={alt}
                width={!fill ? width : undefined}
                height={!fill ? height : undefined}
                loading={loading}
                decoding={decoding}
                fetchPriority={fetchPriority}
                srcSet={computedSrcSet}
                sizes={computedSizes}
                className={imageClasses}
                onLoadStart={handleLoadStart}
                onLoad={handleLoad}
                onError={handleError}
                role={role}
                title={title}
                draggable={draggable}
                crossOrigin={crossOrigin}
                referrerPolicy={referrerPolicy}
              />
            )}
          </div>
        </ImageErrorBoundary>
      );
    },
  ),
);

OptimizedImage.displayName = "OptimizedImage";

// ============================================================================
// RESPONSIVE IMAGE WRAPPER
// ============================================================================

interface ResponsiveImageProps extends ImageProps {
  aspectRatio?: string;
  usePaddingAspectRatio?: boolean;
}

const ResponsiveImage = React.memo<ResponsiveImageProps>(
  ({
    aspectRatio,
    usePaddingAspectRatio = false,
    className = "",
    width,
    height,
    ...props
  }) => {
    const parsedRatio = aspectRatio ? parseAspectRatio(aspectRatio) : null;
    const ratioWidth = parsedRatio?.width ?? width;
    const ratioHeight = parsedRatio?.height ?? height;

    const paddingBottom =
      usePaddingAspectRatio && ratioWidth && ratioHeight
        ? `${(ratioHeight / ratioWidth) * 100}%`
        : undefined;

    const containerStyle: React.CSSProperties =
      usePaddingAspectRatio && paddingBottom
        ? {
            position: "relative",
            width: "100%",
            height: 0,
            paddingBottom,
          }
        : {
            aspectRatio:
              aspectRatio ??
              (ratioWidth && ratioHeight
                ? `${ratioWidth}/${ratioHeight}`
                : undefined),
          };

    return (
      <div
        className={`relative w-full overflow-hidden ${className}`}
        style={containerStyle}
      >
        <OptimizedImage
          {...props}
          width={width}
          height={height}
          fill
          className={usePaddingAspectRatio ? "absolute inset-0" : ""}
        />
      </div>
    );
  },
);

ResponsiveImage.displayName = "ResponsiveImage";

// ============================================================================
// PICTURE COMPONENT (Multiple Sources)
// ============================================================================

interface PictureSource {
  srcSet: string;
  media?: string;
  type?: string;
  sizes?: string;
}

interface PictureProps extends Omit<ImageProps, 'srcSet'> {
  sources?: PictureSource[];
}

const Picture = React.memo<PictureProps>(
  ({ sources = [], ...imageProps }) => {
    return (
      <picture>
        {sources.map((source, index) => (
          <source
            key={index}
            srcSet={source.srcSet}
            media={source.media}
            type={source.type}
            sizes={source.sizes}
          />
        ))}
        <OptimizedImage {...imageProps} />
      </picture>
    );
  },
);

Picture.displayName = "Picture";

// ============================================================================
// EXPORTS
// ============================================================================

export {
  ImageConfigProvider,
  useImageConfig,
  OptimizedImage as Image,
  ResponsiveImage,
  Picture,
};

export type {
  ImageProps,
  ResponsiveImageProps,
  PictureProps,
  ImageFit,
  ImagePosition,
  LoadingStrategy,
  FetchPriority,
  ImageFormat,
  ImageSize,
  ImageConfigContextValue,
  PlaceholderType,
};