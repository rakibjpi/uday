import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import {
  X,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Divider from "../Separator/Divider";

// ===== Type Definitions =====

type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
type ModalVariant = "default" | "centered" | "drawer" | "fullscreen";
type ModalAnimation = "fade" | "slide" | "zoom" | "slideUp";
type AlertType = "info" | "success" | "warning" | "error";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  size?: ModalSize;
  variant?: ModalVariant;
  animation?: ModalAnimation;
  className?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  preventScroll?: boolean;
  header?: { content?: React.ReactNode; divider?: boolean };
  footer?: { content?: React.ReactNode; divider?: boolean };
  persistent?: boolean;
  loading?: boolean;
  icon?: React.ComponentType<any>;
  alertType?: AlertType;
}

interface ModalHeaderProps {
  title?: string;
  description?: string;
  icon?: React.ComponentType<any>;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
  alertType?: AlertType;
  divider?: boolean;
}

interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "between";
  divider?: boolean;
}

// ===== Context =====

interface ModalContextValue {
  onClose: () => void;
}

// ===== Context =====

interface ModalContextValue {
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within a Modal");
  }
  return context;
};

// ===== Style Utilities =====

const sizeStyles: Record<ModalSize, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full mx-4",
};

const variantStyles: Record<
  ModalVariant,
  { container: string; content: string }
> = {
  default: {
    container: "flex items-center justify-center p-4",
    content: "rounded-xl",
  },
  centered: {
    container: "flex items-center justify-center p-4",
    content: "rounded-xl",
  },
  drawer: {
    container: "flex items-center justify-end",
    content: "h-full rounded-l-xl max-w-md",
  },
  fullscreen: {
    container: "flex items-center justify-center",
    content: "rounded-none h-screen w-screen",
  },
};

const animationVariants: Record<ModalAnimation, any> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  slide: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    transition: { type: "spring", damping: 25, stiffness: 300 },
  },
  zoom: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: { duration: 0.2 },
  },
  slideUp: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
    transition: { type: "spring", damping: 25, stiffness: 300 },
  },
};

const alertTypeStyles: Record<
  AlertType,
  { icon: React.ComponentType<any>; color: string; bg: string }
> = {
  info: { icon: Info, color: "text-blue-600", bg: "bg-blue-50" },
  success: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  error: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

// ===== ModalHeader Component =====

function ModalHeader({
  title,
  description,
  icon: Icon,
  onClose,
  showCloseButton = true,
  className = "",
  alertType,
  divider = false,
}: ModalHeaderProps) {
  const AlertIcon = alertType ? alertTypeStyles[alertType].icon : Icon;
  const alertColor = alertType ? alertTypeStyles[alertType].color : "";
  const alertBg = alertType ? alertTypeStyles[alertType].bg : "";

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          {AlertIcon && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className={`${alertBg} p-2 rounded-lg ${alertColor}`}
            >
              <AlertIcon className="w-5 h-5" />
            </motion.div>
          )}
          <div className="flex-1">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-semibold text-gray-900 leading-tight"
              >
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-sm text-gray-600 mt-1 leading-relaxed"
              >
                {description}
              </motion.p>
            )}
          </div>
        </div>
        {showCloseButton && onClose && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </div>
      {divider && <Divider title={false} className="my-3" />}
    </div>
  );
}

// ===== ModalBody Component =====

function ModalBody({
  children,
  className = "",
  padding = "md",
}: ModalBodyProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={`${paddingStyles[padding]} ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ===== ModalFooter Component =====

function ModalFooter({
  children,
  className = "",
  align = "right",
  divider = true,
}: ModalFooterProps) {
  const alignStyles = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between",
  };

  return (
    <>
      {divider && <Divider title={false} className="py-3" />}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className={`flex items-center py-3 px-6 gap-3 ${alignStyles[align]} ${className}`}
      >
        {children}
      </motion.div>
    </>
  );
}

// ===== Main Modal Component =====

function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = "md",
  variant = "default",
  animation = "fade",
  className = "",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  preventScroll = true,
  header,
  footer,
  persistent = false,
  loading = false,
  icon,
  alertType,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !closeOnEscape || persistent) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEscape, onClose, persistent]);

  useEffect(() => {
    if (!preventScroll) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, preventScroll]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (persistent) return;
    if (closeOnOverlayClick && e.target === e.currentTarget) onClose();
  };

  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const animationConfig = animationVariants[animation];
  const contextValue: ModalContextValue = { onClose };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalContext.Provider value={contextValue}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleOverlayClick}
          >
            <div
              className={`fixed inset-0 overflow-y-auto ${variantStyle.container}`}
            >
              <motion.div
                ref={modalRef}
                initial={animationConfig.initial}
                animate={animationConfig.animate}
                exit={animationConfig.exit}
                transition={animationConfig.transition}
                className={`relative bg-white shadow-2xl ${variantStyle.content} ${variant !== "fullscreen" ? sizeStyle : ""} ${className} w-full`}
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence>
                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                        <p className="text-sm text-gray-600 font-medium">
                          Loading...
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {(header?.content || title || description) && (
                  <div className="p-6 pb-4">
                    {header?.content || (
                      <ModalHeader
                        title={title}
                        description={description}
                        icon={icon}
                        onClose={onClose}
                        showCloseButton={showCloseButton}
                        alertType={alertType}
                        divider={header?.divider}
                      />
                    )}
                  </div>
                )}

                <div className="relative">{children}</div>

                {footer?.content && (
                  <div className={`p-6 pt-4`}>
                    {footer?.divider && (
                      <Divider title={false} className="py-3" />
                    )}

                    {footer.content}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </ModalContext.Provider>
      )}
    </AnimatePresence>
  );
}

// ===== Specialized Modals =====

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "warning",
  loading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: AlertType;
  loading?: boolean;
}) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await onConfirm();
    } finally {
      setIsConfirming(false);
    }
  };

  const variantColors = {
    info: "bg-blue-600 hover:bg-blue-700",
    success: "bg-green-600 hover:bg-green-700",
    warning: "bg-yellow-600 hover:bg-yellow-700",
    error: "bg-red-600 hover:bg-red-700",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      title={title}
      alertType={variant}
      loading={loading}
      animation="zoom"
    >
      <ModalBody>
        <p className="text-gray-700">{message}</p>
      </ModalBody>
      <ModalFooter align="right">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          disabled={isConfirming}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
        >
          {cancelText}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConfirm}
          disabled={isConfirming}
          className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 ${variantColors[variant]}`}
        >
          {isConfirming && <Loader2 className="w-4 h-4 animate-spin" />}
          {isConfirming ? "Processing..." : confirmText}
        </motion.button>
      </ModalFooter>
    </Modal>
  );
}

function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  buttonText = "OK",
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: AlertType;
  buttonText?: string;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      title={title}
      alertType={type}
      showCloseButton={false}
      animation="zoom"
    >
      <ModalBody>
        <p className="text-gray-700">{message}</p>
      </ModalBody>
      <ModalFooter align="center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          {buttonText}
        </motion.button>
      </ModalFooter>
    </Modal>
  );
}

export { Modal, ModalHeader, ModalBody, ModalFooter, ConfirmModal, AlertModal };
