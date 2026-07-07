import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { OptimizedImage, type ImageProps } from "./Image";

// ============================================================================
// AVATAR IMAGE WITH STATUS & RING
// ============================================================================

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
type StatusIndicator = "online" | "offline" | "away" | "busy" | "dnd";

interface AvatarImageProps {
  src: string;
  alt: string;
  size?: AvatarSize;
  fallback?: string;
  fallbackBg?: string;
  className?: string;
  ring?: boolean;
  ringColor?: string;
  ringWidth?: "thin" | "normal" | "thick";
  status?: StatusIndicator;
  statusPosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  statusSize?: "sm" | "md" | "lg";
  badge?: React.ReactNode;
  onClick?: () => void;
  loading?: "lazy" | "eager";
  group?: boolean; // For group avatar overlap
}

const avatarSizeClasses: Record<
  AvatarSize,
  { container: string; text: string; status: string }
> = {
  xs: { container: "w-6 h-6", text: "text-[8px]", status: "w-1.5 h-1.5" },
  sm: { container: "w-8 h-8", text: "text-[10px]", status: "w-2 h-2" },
  md: { container: "w-10 h-10", text: "text-xs", status: "w-2.5 h-2.5" },
  lg: { container: "w-12 h-12", text: "text-sm", status: "w-3 h-3" },
  xl: { container: "w-16 h-16", text: "text-base", status: "w-3.5 h-3.5" },
  "2xl": { container: "w-24 h-24", text: "text-xl", status: "w-4 h-4" },
  "3xl": { container: "w-32 h-32", text: "text-2xl", status: "w-5 h-5" },
};

const statusColors: Record<StatusIndicator, { bg: string; ring: string }> = {
  online: { bg: "bg-green-500", ring: "ring-green-100" },
  offline: { bg: "bg-gray-400", ring: "ring-gray-100" },
  away: { bg: "bg-yellow-500", ring: "ring-yellow-100" },
  busy: { bg: "bg-red-500", ring: "ring-red-100" },
  dnd: { bg: "bg-red-600", ring: "ring-red-100" },
};

const ringWidthClasses = {
  thin: "ring-1",
  normal: "ring-2",
  thick: "ring-4",
};

const statusPositionClasses = {
  "top-right": "top-0 right-0",
  "top-left": "top-0 left-0",
  "bottom-right": "bottom-0 right-0",
  "bottom-left": "bottom-0 left-0",
};

export function AvatarImage({
  src,
  alt,
  size = "md",
  fallback,
  fallbackBg = "bg-gradient-to-br from-blue-500 to-purple-600",
  className = "",
  ring = false,
  ringColor = "ring-white dark:ring-slate-800",
  ringWidth = "normal",
  status,
  statusPosition = "bottom-right",
  statusSize = "md",
  badge,
  onClick,
  loading = "lazy",
  group = false,
}: AvatarImageProps) {
  const [hasError, setHasError] = useState(false);
  const sizeConfig = avatarSizeClasses[size];
  const ringClass = ring ? `${ringWidthClasses[ringWidth]} ${ringColor}` : "";

  const initials = useMemo(() => {
    if (fallback) return fallback;
    return alt
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [alt, fallback]);

  return (
    <div
      className={`relative inline-block ${sizeConfig.container} ${group ? "-ml-2 first:ml-0" : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {hasError ? (
        <div
          className={`${sizeConfig.container} ${ringClass} rounded-full ${fallbackBg} flex items-center justify-center text-white font-semibold shadow-sm ${className}`}
        >
          <span className={sizeConfig.text}>{initials}</span>
        </div>
      ) : (
        <OptimizedImage
          src={src}
          alt={alt}
          fill
          fit="cover"
          position="center"
          className={`rounded-full ${ringClass} ${className}`}
          placeholder="color"
          placeholderColor="#e5e7eb"
          onError={() => setHasError(true)}
          loading={loading}
        />
      )}

      {/* Status indicator */}
      {status && (
        <>
          <span
            className={`absolute ${statusPositionClasses[statusPosition]} block ${sizeConfig.status} rounded-full ${statusColors[status].bg} ring-2 ${statusColors[status].ring} ${ringColor}`}
            aria-hidden="true"
          />
          <span className="sr-only">Status: {status}</span>
        </>
      )}

      {/* Badge overlay */}
      {badge && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center">
          {badge}
        </span>
      )}
    </div>
  );
}

// ============================================================================
// AVATAR GROUP
// ============================================================================

interface AvatarGroupProps {
  avatars: Array<{ src: string; alt: string }>;
  max?: number;
  size?: AvatarSize;
  ring?: boolean;
  className?: string;
  onOverflowClick?: () => void;
}

export function AvatarGroup({
  avatars,
  max = 5,
  size = "md",
  ring = true,
  className = "",
  onOverflowClick,
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const overflow = avatars.length - max;
  const sizeConfig = avatarSizeClasses[size];

  return (
    <div className={`flex items-center ${className}`}>
      {visibleAvatars.map((avatar, index) => (
        <AvatarImage
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          size={size}
          ring={ring}
          group
        />
      ))}

      {overflow > 0 && (
        <div
          className={`${sizeConfig.container} -ml-2 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium ring-2 ring-white dark:ring-slate-800 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors`}
          onClick={onOverflowClick}
          role="button"
          tabIndex={0}
        >
          <span className={sizeConfig.text}>+{overflow}</span>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// BACKGROUND IMAGE WITH OVERLAY & PARALLAX
// ============================================================================

interface BackgroundImageProps {
  src: string;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  overlayGradient?: "to-t" | "to-b" | "to-l" | "to-r" | "radial";
  blur?: number;
  parallax?: boolean;
  parallaxSpeed?: number;
  fit?: "contain" | "cover" | "fill";
  position?: "center" | "top" | "bottom";
  fixed?: boolean;
  minHeight?: string;
}

export function BackgroundImage({
  src,
  alt = "",
  children,
  className = "",
  overlay = false,
  overlayColor = "#000000",
  overlayOpacity = 0.5,
  overlayGradient,
  blur = 0,
  parallax = false,
  parallaxSpeed = 0.5,
  fit = "cover",
  position = "center",
  fixed = false,
  minHeight = "400px",
}: BackgroundImageProps) {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallax) return;

    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const offset = window.scrollY - (window.scrollY - rect.top);
        setScrollY(offset);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parallax]);

  const parallaxTransform = parallax
    ? `translateY(${scrollY * parallaxSpeed}px)`
    : undefined;
  const blurFilter = blur > 0 ? `blur(${blur}px)` : undefined;
  const scale = blur > 0 ? 1.1 : 1;

  const gradientOverlays = {
    "to-t": `linear-gradient(to top, ${overlayColor}00, ${overlayColor})`,
    "to-b": `linear-gradient(to bottom, ${overlayColor}00, ${overlayColor})`,
    "to-l": `linear-gradient(to left, ${overlayColor}00, ${overlayColor})`,
    "to-r": `linear-gradient(to right, ${overlayColor}00, ${overlayColor})`,
    radial: `radial-gradient(circle, ${overlayColor}00, ${overlayColor})`,
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      {/* Background image layer */}
      <div
        className={`absolute inset-0 ${fixed ? "fixed" : ""}`}
        style={{
          transform: parallaxTransform,
          filter: blurFilter,
          scale: scale.toString(),
        }}
      >
        <OptimizedImage
          src={src}
          alt={alt}
          fill
          fit={fit}
          position={position}
          loading="eager"
          fetchPriority="high"
          placeholder="color"
        />
      </div>

      {/* Overlay layer */}
      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            background: overlayGradient
              ? gradientOverlays[overlayGradient]
              : overlayColor,
            opacity: overlayGradient ? 1 : overlayOpacity,
          }}
        />
      )}

      {/* Content layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// GALLERY IMAGE WITH LIGHTBOX
// ============================================================================

interface GalleryImageProps extends Omit<ImageProps, "fill"> {
  lightbox?: boolean;
  group?: string;
  caption?: string;
  thumbnail?: boolean;
  index?: number;
  onLightboxOpen?: (index: number) => void;
}

export function GalleryImage({
  lightbox = true,
  group,
  caption,
  thumbnail = false,
  index = 0,
  onLightboxOpen,
  className = "",
  ...props
}: GalleryImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (lightbox) {
      setIsOpen(true);
      onLightboxOpen?.(index);
    }
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose],
  );

  return (
    <>
      <div
        className={`group relative overflow-hidden rounded-lg ${
          lightbox ? "cursor-zoom-in" : ""
        } ${className}`}
        onClick={handleClick}
        role={lightbox ? "button" : undefined}
        tabIndex={lightbox ? 0 : undefined}
        onKeyDown={(e) => {
          if (lightbox && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <OptimizedImage
          {...props}
          className={`transition-transform duration-300 ${
            lightbox ? "group-hover:scale-105" : ""
          }`}
        />

        {/* Hover overlay */}
        {lightbox && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
        )}

        {caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4">
            <p className="text-white text-sm font-medium">{caption}</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={handleClose}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label={props.alt}
          tabIndex={-1}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10 p-2 rounded-full hover:bg-white/10"
            onClick={handleClose}
            aria-label="Close lightbox"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image container */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <OptimizedImage
              {...props}
              width={undefined}
              height={undefined}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              loading="eager"
              fetchPriority="high"
            />
            {caption && (
              <p className="mt-4 text-white text-center max-w-2xl">{caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================================
// PRODUCT IMAGE WITH ZOOM
// ============================================================================

interface ProductImageProps extends Omit<ImageProps, "fill"> {
  zoomScale?: number;
  zoomOnHover?: boolean;
  showZoomIndicator?: boolean;
}

export function ProductImage({
  zoomScale = 2,
  zoomOnHover = true,
  showZoomIndicator = true,
  className = "",
  ...props
}: ProductImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Throttle zoom position updates to RAF
  const zoomRafRef = useRef<number | null>(null);
  const pendingZoomPos = useRef<{ x: number; y: number } | null>(null);

  const scheduleZoomUpdate = (x: number, y: number) => {
    pendingZoomPos.current = { x, y };
    if (zoomRafRef.current == null) {
      zoomRafRef.current = requestAnimationFrame(() => {
        if (pendingZoomPos.current) {
          setPosition(pendingZoomPos.current);
          pendingZoomPos.current = null;
        }
        zoomRafRef.current = null;
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomOnHover || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    scheduleZoomUpdate(x, y);
  };

  useEffect(() => {
    return () => {
      if (zoomRafRef.current != null) cancelAnimationFrame(zoomRafRef.current);
      pendingZoomPos.current = null;
    };
  }, []);

  const handleMouseEnter = () => {
    if (zoomOnHover) setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    if (zoomOnHover) setIsZoomed(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <OptimizedImage
        {...props}
        className={`transition-transform duration-300 ${
          isZoomed ? `scale-${zoomScale * 100}` : "scale-100"
        }`}
        style={{
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />

      {showZoomIndicator && !isZoomed && zoomOnHover && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
          Hover to zoom
        </div>
      )}
    </div>
  );
}

// ============================================================================
// COMPARISON SLIDER IMAGE
// ============================================================================

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
  className?: string;
  defaultPosition?: number;
  showLabels?: boolean;
  beforeLabel?: string;
  afterLabel?: string;
}

export function ComparisonSlider({
  beforeImage,
  afterImage,
  alt,
  className = "",
  defaultPosition = 50,
  showLabels = true,
  beforeLabel = "Before",
  afterLabel = "After",
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  }, []);

  // Throttle slider updates via requestAnimationFrame to avoid jank
  const sliderRafRef = useRef<number | null>(null);
  const pendingSliderPos = useRef<number | null>(null);

  const scheduleSliderUpdate = useCallback((percentage: number) => {
    pendingSliderPos.current = Math.max(0, Math.min(100, percentage));
    if (sliderRafRef.current == null) {
      sliderRafRef.current = requestAnimationFrame(() => {
        if (pendingSliderPos.current != null) {
          setSliderPosition(pendingSliderPos.current);
          pendingSliderPos.current = null;
        }
        sliderRafRef.current = null;
      });
    }
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches[0]) {
      // Use RAF-scheduled updates for touch to reduce main-thread pressure
      scheduleSliderUpdate(
        ((e.touches[0].clientX - (containerRef.current?.getBoundingClientRect().left || 0)) /
          (containerRef.current?.getBoundingClientRect().width || 1)) * 100,
      );
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  useEffect(() => {
    return () => {
      if (sliderRafRef.current != null) cancelAnimationFrame(sliderRafRef.current);
      pendingSliderPos.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-lg ${className}`}
      onMouseMove={(e) => {
        if (isDragging)
          scheduleSliderUpdate(
            ((e.clientX - (containerRef.current?.getBoundingClientRect().left || 0)) /
              (containerRef.current?.getBoundingClientRect().width || 1)) * 100,
          );
      }}
      onTouchMove={handleTouchMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      style={{ touchAction: "pan-y" }}
    >
      {/* After image (full) */}
      <OptimizedImage
        src={afterImage}
        alt={`${alt} - after`}
        fill
        fit="cover"
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <OptimizedImage
          src={beforeImage}
          alt={`${alt} - before`}
          fill
          fit="cover"
        />
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-lg"
        style={{ left: `${sliderPosition}%`, touchAction: "pan-y" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
        </div>
      </div>

      {/* Labels */}
      {showLabels && (
        <>
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm font-medium">
            {beforeLabel}
          </div>
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm font-medium">
            {afterLabel}
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================================
// PROGRESSIVE IMAGE LOADER
// ============================================================================

interface ProgressiveImageProps extends ImageProps {
  lowQualitySrc?: string;
  showProgress?: boolean;
}

export function ProgressiveImage({
  lowQualitySrc,
  showProgress = true,
  ...props
}: ProgressiveImageProps) {
  const [progress, setProgress] = useState(0);
  const [isLowQualityLoaded, setIsLowQualityLoaded] = useState(false);

  useEffect(() => {
    if (!showProgress) return;

    const img = new Image();
    img.src = props.src;

    const handleProgress = (e: ProgressEvent) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        setProgress(percentComplete);
      }
    };

    // Note: Progress events don't work for all image sources
    // This is a simplified implementation
    img.onload = () => setProgress(100);

    return () => {
      img.onload = null;
    };
  }, [props.src, showProgress]);

  return (
    <div className="relative">
      {lowQualitySrc && !isLowQualityLoaded && (
        <OptimizedImage
          {...props}
          src={lowQualitySrc}
          className={`${props.className} blur-sm`}
          onLoad={() => setIsLowQualityLoaded(true)}
        />
      )}

      <OptimizedImage {...props} />

      {showProgress && progress < 100 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  AvatarImageProps,
  AvatarGroupProps,
  BackgroundImageProps,
  GalleryImageProps,
  ProductImageProps,
  ComparisonSliderProps,
  ProgressiveImageProps,
};
