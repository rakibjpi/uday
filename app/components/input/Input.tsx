import React, { useState, useRef } from "react";
import { Eye, EyeOff, Check, X, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ===== Type Definitions =====

type InputVariant = "default" | "filled" | "outlined" | "ghost" | "underlined";
type InputSize = "sm" | "md" | "lg";
type InputState =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading";

interface InputProps {
  // Basic props
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;

  // Input attributes
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  name?: string;
  id?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;

  // Validation
  error?: string | boolean;
  success?: string | boolean;
  warning?: string | boolean;
  info?: string | boolean;
  loading?: string | boolean;
  helperText?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;

  // Styling
  variant?: InputVariant;
  size?: InputSize;
  className?: string;
  inputClassName?: string;

  // Icons
  leftIcon?: React.ComponentType<any>;
  rightIcon?: React.ComponentType<any>;

  // Additional features
  showCharCount?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  prefix?: string;
  suffix?: string;

  // Legacy support (for backward compatibility)
  fieldset?: {
    field?: string;
    inputType?: React.InputHTMLAttributes<HTMLInputElement>["type"];
    icon?: React.ComponentType<any>;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
  };
}

// ===== Animation Variants =====

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
};

const labelVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
  },
};

const messageVariants = {
  hidden: { opacity: 0, y: -5, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto" as const,
  },
  exit: {
    opacity: 0,
    y: -5,
    height: 0,
  },
};

const focusRingVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
  },
};

// Transition configurations
const containerTransition = {
  duration: 0.3,
};

const labelTransition = {
  duration: 0.2,
  delay: 0.1,
};

const iconTransition = {
  type: "spring" as const,
  stiffness: 500,
  damping: 25,
};

const messageTransition = {
  duration: 0.2,
};

const focusRingTransition = {
  duration: 0.2,
};

// ===== Style Utilities =====

const variantStyles: Record<InputVariant, string> = {
  default:
    "border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
  filled:
    "border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/20",
  outlined: "border-2 border-gray-300 bg-white focus:border-blue-500",
  ghost:
    "border-0 bg-transparent hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500/20",
  underlined:
    "border-0 border-b-2 border-gray-300 bg-transparent rounded-none focus:border-blue-500 px-0",
};

const sizeStyles: Record<
  InputSize,
  { input: string; icon: string; label: string }
> = {
  sm: {
    input: "px-3 py-1.5 text-sm",
    icon: "w-4 h-4",
    label: "text-xs",
  },
  md: {
    input: "px-4 py-2.5 text-sm",
    icon: "w-5 h-5",
    label: "text-sm",
  },
  lg: {
    input: "px-5 py-3 text-base",
    icon: "w-6 h-6",
    label: "text-base",
  },
};

const stateStyles: Record<
  InputState,
  { border: string; ring: string; icon: string }
> = {
  default: {
    border: "border-gray-300",
    ring: "focus:ring-blue-500/20 focus:border-blue-500",
    icon: "text-gray-400",
  },
  success: {
    border: "border-green-500",
    ring: "focus:ring-green-500/20 focus:border-green-600",
    icon: "text-green-500",
  },
  error: {
    border: "border-red-500",
    ring: "focus:ring-red-500/20 focus:border-red-600",
    icon: "text-red-500",
  },
  warning: {
    border: "border-yellow-500",
    ring: "focus:ring-yellow-500/20 focus:border-yellow-600",
    icon: "text-yellow-500",
  },
  info: {
    border: "border-blue-500",
    ring: "focus:ring-blue-500/20 focus:border-blue-600",
    icon: "text-blue-500",
  },
  loading: {
    border: "border-gray-300",
    ring: "focus:ring-gray-500/20 focus:border-gray-600",
    icon: "text-gray-500 animate-spin",
  },
};

// ===== Main Input Component =====

function Input({
  // Basic props
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,

  // Input attributes
  type = "text",
  name,
  id,
  autoComplete,
  autoFocus,
  disabled = false,
  readOnly = false,
  required = false,

  // Validation
  error,
  success,
  warning,
  info,
  loading,
  helperText,
  maxLength,
  minLength,
  pattern,

  // Styling
  variant = "default",
  size = "md",
  className = "",
  inputClassName = "",

  // Icons
  leftIcon: LeftIconProp,
  rightIcon: RightIconProp,

  // Additional features
  showCharCount = false,
  clearable = false,
  onClear,
  prefix,
  suffix,

  // Legacy support
  fieldset,
}: InputProps) {
  // State
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Legacy fieldset support
  const finalType = fieldset?.inputType || type;
  const finalPlaceholder = fieldset?.placeholder || placeholder;
  const finalRequired = fieldset?.required ?? required;
  const finalDisabled = fieldset?.disabled ?? disabled;
  const finalName = fieldset?.field || name;
  const LeftIcon = fieldset?.icon || LeftIconProp;
  const RightIcon = RightIconProp;

  // Generate ID
  const inputId =
    id ||
    fieldset?.field ||
    label?.toLowerCase().replace(/\s+/g, "-") ||
    `input-${Math.random()}`;

  // Determine current state
  const currentState: InputState = error
    ? "error"
    : success
      ? "success"
      : warning
        ? "warning"
        : info
          ? "info"
          : loading
            ? "loading"
            : "default";

  // Get state icon
  const StateIcon =
    currentState === "error"
      ? AlertCircle
      : currentState === "success"
        ? Check
        : currentState === "warning"
          ? AlertCircle
          : currentState === "info"
            ? Info
            : currentState === "loading"
              ? Info
              : null;

  // Get message
  const message =
    typeof error === "string"
      ? error
      : typeof success === "string"
        ? success
        : typeof warning === "string"
          ? warning
          : typeof info === "string"
            ? info
            : typeof loading === "string"
              ? loading
              : helperText;

  // Handle clear
  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      const event = new Event("input", { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
    onClear?.();
  };

  // Get styles
  const sizeStyle = sizeStyles[size];
  const stateStyle = stateStyles[currentState];

  // Build input classes
  const inputClasses = `
    w-full
    ${sizeStyle.input}
    ${variant === "default" || variant === "filled" || variant === "outlined" ? "rounded-lg" : ""}
    ${variant === "underlined" ? "rounded-none" : ""}
    ${variantStyles[variant]}
    ${currentState !== "default" ? stateStyle.border : ""}
    ${currentState !== "default" ? stateStyle.ring : ""}
    font-medium
    outline-none
    transition-all
    duration-200
    placeholder:text-gray-400
    disabled:bg-gray-100
    disabled:cursor-not-allowed
    disabled:text-gray-500
    read-only:bg-gray-50
    read-only:cursor-default
    ${LeftIcon || prefix ? "pl-10" : ""}
    ${RightIcon || StateIcon || suffix || clearable || finalType === "password" ? "pr-10" : ""}
    ${inputClassName}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <motion.div
      className={`flex w-full flex-col ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={containerTransition}
    >
      {/* Label */}
      <AnimatePresence mode="wait">
        {label && (
          <motion.label
            htmlFor={inputId}
            variants={labelVariants}
            initial="hidden"
            animate="visible"
            transition={labelTransition}
            className={`block font-semibold text-gray-700 mb-2 ${sizeStyle.label} ${
              finalRequired
                ? "after:content-['*'] after:ml-1 after:text-red-500"
                : ""
            }`}
          >
            {label}
          </motion.label>
        )}
      </AnimatePresence>

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon or Prefix */}
        <AnimatePresence mode="wait">
          {(LeftIcon || prefix) && (
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={iconTransition}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                prefix ? "text-gray-600 font-medium text-sm" : stateStyle.icon
              } pointer-events-none`}
            >
              {prefix ? (
                <span>{prefix}</span>
              ) : LeftIcon ? (
                <LeftIcon className={sizeStyle.icon} />
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input */}
        <motion.input
          ref={inputRef}
          type={finalType === "password" && showPassword ? "text" : finalType}
          id={inputId}
          name={finalName}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          placeholder={finalPlaceholder}
          disabled={finalDisabled}
          readOnly={readOnly}
          required={finalRequired}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          className={inputClasses}
          aria-invalid={currentState === "error"}
          aria-describedby={message ? `${inputId}-message` : undefined}
          whileFocus={{ scale: 1.005 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />

        {/* Right Icons/Actions */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {/* Suffix */}
          <AnimatePresence mode="wait">
            {suffix && !RightIcon && !StateIcon && finalType !== "password" && (
              <motion.span
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={iconTransition}
                className="text-gray-600 font-medium text-sm pointer-events-none"
              >
                {suffix}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Clear Button */}
          <AnimatePresence mode="wait">
            {clearable && value && !finalDisabled && !readOnly && (
              <motion.button
                type="button"
                onClick={handleClear}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={iconTransition}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear input"
              >
                <X className={sizeStyle.icon} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* State Icon */}
          <AnimatePresence mode="wait">
            {StateIcon && currentState !== "default" && (
              <motion.div
                key={currentState}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={iconTransition}
              >
                <StateIcon className={`${sizeStyle.icon} ${stateStyle.icon}`} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Icon */}
          <AnimatePresence mode="wait">
            {RightIcon && finalType !== "password" && (
              <motion.div
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={iconTransition}
              >
                <RightIcon className={`${sizeStyle.icon} ${stateStyle.icon}`} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Password Toggle */}
          <AnimatePresence mode="wait">
            {finalType === "password" && (
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={iconTransition}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <AnimatePresence mode="wait">
                  {showPassword ? (
                    <motion.div
                      key="eyeoff"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <EyeOff className={sizeStyle.icon} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="eye"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Eye className={sizeStyle.icon} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Focus Ring Animation */}
        <AnimatePresence mode="wait">
          {isFocused && variant !== "underlined" && (
            <motion.div
              variants={focusRingVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={focusRingTransition}
              className={`absolute inset-0 rounded-lg pointer-events-none ${
                currentState === "error"
                  ? "ring-2 ring-red-500/20"
                  : currentState === "success"
                    ? "ring-2 ring-green-500/20"
                    : currentState === "warning"
                      ? "ring-2 ring-yellow-500/20"
                      : "ring-2 ring-blue-500/20"
              }`}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Helper Text / Error / Success Message */}
      <div className="flex items-start justify-between mt-1">
        <AnimatePresence mode="wait">
          {message && (
            <motion.p
              key={message}
              id={`${inputId}-message`}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={messageTransition}
              className={`text-xs ${
                currentState === "error"
                  ? "text-red-600"
                  : currentState === "success"
                    ? "text-green-600"
                    : currentState === "warning"
                      ? "text-yellow-600"
                      : "text-gray-600"
              }`}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Character Count */}
        <AnimatePresence mode="wait">
          {showCharCount && maxLength && (
            <motion.p
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={messageTransition}
              className="text-xs text-gray-500 ml-auto"
            >
              {value?.length || 0}/{maxLength}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ===== Specialized Input Components =====

// Search Input
function SearchInput({
  placeholder = "Search...",
  onSearch,
  ...props
}: Omit<InputProps, "type"> & { onSearch?: (value: string) => void }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
    props.onChange?.(e);
  };

  return (
    <Input
      {...props}
      type="search"
      placeholder={placeholder}
      value={searchValue}
      onChange={handleSearch}
      leftIcon={(props) => (
        <svg
          className={props.className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      )}
      clearable
      onClear={() => {
        setSearchValue("");
        onSearch?.("");
      }}
    />
  );
}

// Email Input (with validation)
function EmailInput(props: Omit<InputProps, "type">) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setIsValid(emailPattern.test(value));
    }
    props.onBlur?.(e);
  };

  return (
    <Input
      {...props}
      type="email"
      autoComplete="email"
      onBlur={handleBlur}
      error={
        isValid === false ? "Please enter a valid email address" : props.error
      }
      success={isValid === true ? "Email is valid" : props.success}
      leftIcon={(iconProps) => (
        <svg
          className={iconProps.className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      )}
    />
  );
}

// Phone Input
function PhoneInput(props: Omit<InputProps, "type">) {
  return (
    <Input
      {...props}
      type="tel"
      autoComplete="tel"
      leftIcon={(iconProps) => (
        <svg
          className={iconProps.className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      )}
    />
  );
}

// Number Input with increment/decrement
function NumberInput({
  min,
  max,
  step = 1,
  value,
  onChange,
  ...props
}: Omit<InputProps, "type"> & {
  min?: number;
  max?: number;
  step?: number;
}) {
  const handleIncrement = () => {
    const currentValue = Number(value) || 0;
    const newValue = currentValue + step;
    if (max === undefined || newValue <= max) {
      const event = {
        target: { value: newValue.toString() },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(event);
    }
  };

  const handleDecrement = () => {
    const currentValue = Number(value) || 0;
    const newValue = currentValue - step;
    if (min === undefined || newValue >= min) {
      const event = {
        target: { value: newValue.toString() },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(event);
    }
  };

  return (
    <div className="relative">
      <Input
        {...props}
        type="number"
        value={value}
        onChange={onChange}
        className="pr-16"
      />
      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
        <motion.button
          type="button"
          onClick={handleIncrement}
          whileHover={{ scale: 1.1, backgroundColor: "rgb(243 244 246)" }}
          whileTap={{ scale: 0.95 }}
          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
          aria-label="Increment"
        >
          ▲
        </motion.button>
        <motion.button
          type="button"
          onClick={handleDecrement}
          whileHover={{ scale: 1.1, backgroundColor: "rgb(243 244 246)" }}
          whileTap={{ scale: 0.95 }}
          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
          aria-label="Decrement"
        >
          ▼
        </motion.button>
      </div>
    </div>
  );
}

// Export all components
export { Input, SearchInput, EmailInput, PhoneInput, NumberInput };
