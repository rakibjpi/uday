import React from "react";
import { motion, AnimatePresence } from "motion/react";
import Divider from "../Separator/Divider";

// ===== Card Component System =====
// A flexible, composable card system with header, body, and footer

// ===== Type Definitions =====

interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  description?: string;
  logoUrl?: string;
  logoAlt?: string;
  actions?: React.ReactNode; // Action buttons in header
  className?: string;
  badge?: React.ReactNode; // Badge or status indicator
  align?: "left" | "center" | "right";
}

interface CardFooterProps {
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "between" | "around";
  divider?: boolean; // Show divider above footer
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

type CardVariant = "default" | "elevated" | "outlined" | "ghost" | "glass";
type CardSize = "sm" | "md" | "lg" | "xl" | "full";

interface CardProps {
  children: React.ReactNode;
  header?: CardHeaderProps;
  footer?: CardFooterProps;
  variant?: CardVariant;
  size?: CardSize;
  className?: string;
  hoverable?: boolean; // Add hover effect
  clickable?: boolean; // Make entire card clickable
  onClick?: () => void;
  loading?: boolean; // Show loading state
  skipInitialAnimation?: boolean; // Skip animation on first render for better LCP
}

// ===== Style Utilities =====

const cardVariantStyles: Record<CardVariant, string> = {
  default: "bg-white border border-gray-200 shadow-sm",
  elevated: "bg-white shadow-lg shadow-gray-200/50 border border-gray-100",
  outlined: "bg-white border-2 border-gray-300",
  ghost: "bg-gray-50/50 border border-gray-200/50",
  glass: "bg-white/70 backdrop-blur-md border border-gray-200/50 shadow-xl",
};

const cardSizeStyles: Record<CardSize, string> = {
  sm: "w-full max-w-sm",
  md: "w-full max-w-md",
  lg: "w-full max-w-lg",
  xl: "w-full max-w-xl",
  full: "w-full",
};

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

const alignmentStyles = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
  between: "justify-between",
  around: "justify-around",
};

// ===== Animation Variants =====

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const bodyVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const footerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const cardTransition = {
  duration: 0.3,
  ease: [0.4, 0.0, 0.2, 1] as const,
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// ===== CardHeader Component =====

function CardHeader({
  title,
  subtitle,
  description,
  logoUrl,
  logoAlt,
  actions,
  className = "",
  badge,
  align = "center",
}: CardHeaderProps) {
  const alignClass = alignmentStyles[align];

  return (
    <motion.div
      className={`flex flex-col w-full ${alignClass} gap-2 ${className}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      transition={cardTransition}
    >
      {/* Top row: Logo/Badge and Actions */}
      <div className="flex flex-col items-center justify-between w-full gap-4">
        <div className={`flex items-center gap-3 ${alignmentStyles[align]}`}>
          {logoUrl && (
            <motion.img
              src={logoUrl}
              alt={logoAlt || title || "Logo"}
              className="h-10 w-10 rounded-lg object-cover mb-1 shrink-0 ring-2 ring-gray-100"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
          )}
          <div className={`flex flex-col ${alignmentStyles[align]} gap-1`}>
            {badge && (
              <motion.div
                className="mb-1"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.15 }}
              >
                {badge}
              </motion.div>
            )}
            {title && (
              <motion.h3
                className="text-lg font-semibold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {title}
              </motion.h3>
            )}
            {subtitle && (
              <motion.p
                className="text-sm font-medium text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.15 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
        {actions && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            {actions}
          </motion.div>
        )}
      </div>

      {/* Description */}
      {description && (
        <motion.p
          className="text-sm text-gray-600 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

// ===== Static CardHeader (No Animation - for better LCP) =====

function CardHeaderStatic({
  title,
  subtitle,
  description,
  logoUrl,
  logoAlt,
  actions,
  className = "",
  badge,
  align = "center",
}: CardHeaderProps) {
  const alignClass = alignmentStyles[align];

  return (
    <div className={`flex flex-col w-full ${alignClass} gap-2 ${className}`}>
      <div className="flex flex-col items-center justify-between w-full gap-4">
        <div className={`flex items-center gap-3 ${alignmentStyles[align]}`}>
          {logoUrl && (
            <img
              src={logoUrl}
              alt={logoAlt || title || "Logo"}
              className="h-10 w-10 rounded-lg object-cover mb-1 shrink-0 ring-2 ring-gray-100"
            />
          )}
          <div className={`flex flex-col ${alignmentStyles[align]} gap-1`}>
            {badge && <div className="mb-1">{badge}</div>}
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm font-medium text-gray-600">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {description && (
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      )}
    </div>
  );
}

// ===== CardBody Component =====

function CardBody({ children, className = "", padding = "md" }: CardBodyProps) {
  return (
    <div className={`w-full ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
}

// ===== CardFooter Component =====

function CardFooter({
  children,
  className = "",
  align = "right",
  divider = true,
}: CardFooterProps) {
  const alignClass =
    align === "between" || align === "around"
      ? `flex ${alignmentStyles[align]}`
      : `flex ${alignmentStyles[align]}`;

  return (
    <motion.div
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.2, delay: 0.2 }}
    >
      {divider && <Divider title={false} className="mb-2.5" />}
      <div className={`${alignClass} gap-3 ${className}`}>{children}</div>
    </motion.div>
  );
}

// ===== Static CardFooter (No Animation - for better LCP) =====

function CardFooterStatic({
  children,
  className = "",
  align = "right",
  divider = true,
}: CardFooterProps) {
  const alignClass =
    align === "between" || align === "around"
      ? `flex ${alignmentStyles[align]}`
      : `flex ${alignmentStyles[align]}`;

  return (
    <div>
      {divider && <Divider title={false} className="mb-2.5" />}
      <div className={`${alignClass} gap-3 ${className}`}>{children}</div>
    </div>
  );
}

// ===== CardSection Component (for dividing body content) =====

function CardSection({
  children,
  title,
  className = "",
  divider = false,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
  divider?: boolean;
}) {
  return (
    <div className={`${className}`}>
      {divider && <div className="border-t border-gray-200 my-4" />}
      {title && (
        <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
      )}
      {children}
    </div>
  );
}

// ===== Main Card Component =====

function Card({
  children,
  header,
  footer,
  variant = "default",
  size = "md",
  className = "",
  hoverable = false,
  clickable = false,
  onClick,
  loading = false,
  skipInitialAnimation = true, // Default to true for better LCP
}: CardProps) {
  const [isFirstRender, setIsFirstRender] = React.useState(true);

  React.useEffect(() => {
    // Mark first render complete after mount
    setIsFirstRender(false);
  }, []);

  const variantClass = cardVariantStyles[variant];
  const sizeClass = cardSizeStyles[size];

  const hoverClass =
    hoverable || clickable
      ? "transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
      : "";

  const clickableClass = clickable ? "cursor-pointer active:scale-[0.98]" : "";

  const combinedClasses = `
    rounded-xl overflow-hidden
    ${variantClass}
    ${sizeClass}
    ${hoverClass}
    ${clickableClass}
    ${className}
  `.trim();

  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  // Skip animation on first render for better LCP
  const shouldSkipAnimation = skipInitialAnimation && isFirstRender;

  if (shouldSkipAnimation) {
    return (
      <div className={combinedClasses} onClick={handleClick}>
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-600 font-medium">Loading...</p>
            </div>
          </div>
        )}

        {header && (
          <div className="p-6 pb-4">
            <CardHeaderStatic {...header} />
          </div>
        )}

        <div className="relative">{children}</div>

        {footer && (
          <div className="px-6 pb-6 pt-2">
            <CardFooterStatic
              className="flex justify-center items-center"
              {...footer}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className={combinedClasses}
      onClick={handleClick}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={cardTransition}
      whileHover={
        hoverable || clickable ? { y: -2, transition: { duration: 0.2 } } : {}
      }
      whileTap={clickable ? { scale: 0.98 } : {}}
    >
      <AnimatePresence>
        {loading && (
          <motion.div
            className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center gap-3">
              <motion.div
                className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-sm text-gray-600 font-medium">Loading...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {header && (
        <div className="p-6 pb-4">
          <CardHeader {...header} />
        </div>
      )}

      <div className="relative">{children}</div>

      {footer && (
        <div className="px-6 pb-6 pt-2">
          <CardFooter
            className="flex justify-center items-center"
            {...footer}
          />
        </div>
      )}
    </motion.div>
  );
}

// ===== Specialized Card Variants =====

// Simple card with just content
function SimpleCard({
  children,
  className = "",
  padding = "md",
}: {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}) {
  return (
    <Card className={className}>
      <CardBody padding={padding}>{children}</CardBody>
    </Card>
  );
}

// List card for displaying items
function ListCard({
  title,
  items,
  renderItem,
  emptyMessage = "No items found",
  className = "",
}: {
  title?: string;
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
}) {
  return (
    <Card header={title ? { title } : undefined} className={className}>
      <CardBody padding="none">
        {items.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            {emptyMessage}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <div key={index} className="px-6 py-4">
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}

// Stats card for displaying metrics
function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className = "",
}: {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}) {
  const trendColors = {
    up: "text-green-600 bg-green-50",
    down: "text-red-600 bg-red-50",
    neutral: "text-gray-600 bg-gray-50",
  };

  return (
    <Card variant="elevated" className={className}>
      <CardBody>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
          {icon && (
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              {icon}
            </div>
          )}
        </div>
        {trend && trendValue && (
          <div
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium mt-3 ${trendColors[trend]}`}
          >
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trend === "neutral" && "→"}
            {trendValue}
          </div>
        )}
      </CardBody>
    </Card>
  );
}

//  all components
export {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardSection,
  SimpleCard,
  ListCard,
  StatsCard,
};
