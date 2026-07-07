import { Link } from "react-router";
import { Image } from "../image/Image";
import { motion } from "motion/react";
import {
  getButtonStyles,
  getIconStyles,
  getImageStyles,
  type sizeType,
  type variantType,
} from "./button-styles";

// ===== Button Component =====
interface ButtonProps {
  title?: string;
  icon?: React.ComponentType<any>;
  imageSrc?: string;
  className?: string;
  onClick?: () => void;
  link?: string;
  variant?: variantType;
  underline?: boolean;
  size?: sizeType;
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  fullWidth?: boolean;
}

export default function Button({
  title,
  className = "",
  onClick,
  icon: Icon,
  imageSrc,
  link,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  fullWidth = false,
  underline = false,
}: ButtonProps) {
  // Get base button styles with fullWidth and underline included
  const baseButtonStyles = getButtonStyles({
    variant,
    sizeType: size,
    fullWidth,
    underline,
  });

  // Combine with custom className
  const buttonStyles = `${baseButtonStyles} ${className}`.trim();

  const imageClass = getImageStyles({ variant });
  const iconClass = getIconStyles({ variant });

  // Animation variants
  const buttonVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: 10,
    },
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  // Transition configuration
  const springTransition = {
    type: "spring" as const,
    stiffness: 400,
    damping: 17,
  };

  const contentTransition = {
    delay: 0.1,
    duration: 0.2,
  };

  // Content to render (icon or image + title)
  const content = (
    <motion.span
      variants={contentVariants}
      transition={contentTransition}
      className="flex items-center gap-2"
    >
      {imageSrc && (
        <Image src={imageSrc} alt={title ?? ""} className={imageClass} />
      )}
      {Icon && !imageSrc && <Icon className={iconClass} />}
      {title && <span>{title}</span>}
    </motion.span>
  );

  // If link is provided, render as a Link with motion wrapper
  if (link) {
    return (
      <motion.span
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        whileHover={disabled ? undefined : { scale: 1.02 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        transition={springTransition}
        className="inline-block"
      >
        <Link
          to={link}
          className={buttonStyles}
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              return;
            }
            if (onClick) {
              onClick();
            }
          }}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : undefined}
        >
          {content}
        </Link>
      </motion.span>
    );
  }

  // Render as motion button with proper animations
  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={springTransition}
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </motion.button>
  );
}
