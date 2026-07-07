import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  name?: string;
}

// ===== Animation Variants =====

const containerVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 20,
  },
};

const checkboxVariants = {
  unchecked: {
    scale: 1,
    borderColor: "rgb(209 213 219)", // gray-300
  },
  checked: {
    scale: [1, 1.2, 1],
    borderColor: "rgb(79 70 229)", // indigo-600
    backgroundColor: "rgb(79 70 229)", // indigo-600
  },
  indeterminate: {
    scale: [1, 1.2, 1],
    borderColor: "rgb(79 70 229)", // indigo-600
    backgroundColor: "rgb(79 70 229)", // indigo-600
  },
};

const checkmarkVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
  },
};

const indeterminateVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
  },
};

const labelVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
  },
  exit: {
    opacity: 0,
    height: 0,
  },
};

// ===== Transition Configurations =====

const containerTransition = {
  duration: 0.3,
  ease: [0.4, 0.0, 0.2, 1] as const,
};

const checkboxTransition = {
  duration: 0.3,
  ease: [0.4, 0.0, 0.2, 1] as const,
};

const checkmarkTransition = {
  duration: 0.3,
  ease: [0.4, 0.0, 0.2, 1] as const,
};

const labelTransition = {
  duration: 0.2,
  delay: 0.05,
};

const subtitleTransition = {
  duration: 0.2,
};

function Checkbox({
  title,
  subtitle,
  className = "",
  defaultChecked = false,
  disabled = false,
  indeterminate = false,
  onChange,
  id,
  name,
}: Props) {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const [isHovered, setIsHovered] = useState(false);

  const checkboxId =
    id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    onChange?.(checked);
  };

  // Determine current state for animation
  const currentState = indeterminate
    ? "indeterminate"
    : isChecked
      ? "checked"
      : "unchecked";

  return (
    <motion.div
      className={`${className} mt-2`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={containerTransition}
    >
      <div className="flex gap-3">
        {/* Checkbox Container */}
        <div className="flex h-6 shrink-0 items-center">
          <motion.div
            className="group grid size-4 grid-cols-1 cursor-pointer"
            onHoverStart={() => !disabled && setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={!disabled ? { scale: 1.1 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Hidden Native Checkbox */}
            <input
              checked={isChecked}
              onChange={handleChange}
              id={checkboxId}
              name={name || checkboxId}
              type="checkbox"
              disabled={disabled}
              aria-describedby={
                subtitle ? `${checkboxId}-description` : undefined
              }
              className="sr-only"
            />

            {/* Custom Checkbox Visual */}
            <motion.div
              className="col-start-1 row-start-1 size-4 rounded-sm border-2 relative overflow-hidden"
              variants={checkboxVariants}
              animate={currentState}
              transition={checkboxTransition}
              style={{
                backgroundColor:
                  isChecked || indeterminate ? "rgb(79 70 229)" : "white",
              }}
            >
              {/* Ripple Effect on Click */}
              <AnimatePresence>
                {isHovered && !disabled && (
                  <motion.div
                    className="absolute inset-0 bg-indigo-600/10 rounded-sm"
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>

            {/* Checkmark Icon */}
            <AnimatePresence mode="wait">
              {isChecked && !indeterminate && (
                <motion.div
                  key="checkmark"
                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={checkmarkTransition}
                >
                  <Check
                    className="size-3"
                    strokeWidth={3}
                    color={disabled ? "rgb(156 163 175)" : "white"}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Indeterminate Line */}
            <AnimatePresence mode="wait">
              {indeterminate && (
                <motion.div
                  key="indeterminate"
                  className="pointer-events-none col-start-1 row-start-1 self-center justify-self-center w-2 h-0.5 rounded-full"
                  style={{
                    backgroundColor: disabled ? "rgb(156 163 175)" : "white",
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={checkmarkTransition}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Label and Subtitle */}
        <div className="text-sm/6 flex-1">
          <motion.label
            htmlFor={checkboxId}
            variants={labelVariants}
            initial="hidden"
            animate="visible"
            transition={labelTransition}
            className={`font-medium cursor-pointer select-none ${
              disabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-900 hover:text-indigo-600"
            } transition-colors duration-200`}
            whileHover={!disabled ? { x: 2 } : {}}
          >
            {title}
          </motion.label>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            {subtitle && (
              <motion.p
                id={`${checkboxId}-description`}
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={subtitleTransition}
                className={`${
                  disabled ? "text-gray-400" : "text-gray-500"
                } mt-0.5`}
              >
                {subtitle}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ===== Checkbox Group Component =====

interface CheckboxGroupProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  description?: string;
}

function CheckboxGroup({
  children,
  className = "",
  label,
  description,
}: CheckboxGroupProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <motion.h3
          className="text-base font-semibold text-gray-900 mb-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          {label}
        </motion.h3>
      )}
      {description && (
        <motion.p
          className="text-sm text-gray-500 mb-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}
        >
          {description}
        </motion.p>
      )}
      <div className="space-y-2">{children}</div>
    </motion.div>
  );
}

// ===== Toggle Checkbox Variant =====

interface ToggleCheckboxProps extends Props {
  size?: "sm" | "md" | "lg";
}

function ToggleCheckbox({
  title,
  subtitle,
  className = "",
  defaultChecked = false,
  disabled = false,
  onChange,
  id,
  name,
  size = "md",
}: ToggleCheckboxProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const checkboxId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    onChange?.(checked);
  };

  const sizes = {
    sm: { track: "w-8 h-4", thumb: "size-3", translate: "translate-x-4" },
    md: { track: "w-11 h-6", thumb: "size-5", translate: "translate-x-5" },
    lg: { track: "w-14 h-7", thumb: "size-6", translate: "translate-x-7" },
  };

  const sizeConfig = sizes[size];

  return (
    <motion.div
      className={`${className} flex items-center justify-between gap-4 py-2`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={containerTransition}
    >
      <div className="flex-1">
        <motion.label
          htmlFor={checkboxId}
          variants={labelVariants}
          initial="hidden"
          animate="visible"
          transition={labelTransition}
          className={`font-medium cursor-pointer select-none block ${
            disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-900"
          }`}
        >
          {title}
        </motion.label>
        {subtitle && (
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            transition={subtitleTransition}
            className={`text-sm ${
              disabled ? "text-gray-400" : "text-gray-500"
            } mt-0.5`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <input
        type="checkbox"
        id={checkboxId}
        name={name || checkboxId}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
      />

      <motion.button
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={() =>
          !disabled && handleChange({ target: { checked: !isChecked } } as any)
        }
        className={`${sizeConfig.track} relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
        animate={{
          backgroundColor: isChecked ? "rgb(79 70 229)" : "rgb(229 231 235)",
        }}
        transition={{ duration: 0.2 }}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        <motion.span
          className={`${sizeConfig.thumb} inline-block transform rounded-full bg-white shadow-lg ring-0`}
          animate={{
            x: isChecked ? sizeConfig.translate : "0px",
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </motion.button>
    </motion.div>
  );
}

function ProCheckbox({
  title,
  subtitle,
  className = "",
  defaultChecked = false,
  disabled = false,
  onChange,
  id,
  name,
}: ToggleCheckboxProps) {
  const [isChecked, setIsChecked] = React.useState(defaultChecked);

  const checkboxId =
    id || `pro-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <motion.div
      className={`flex items-stretch ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={containerTransition}
    >
      <div className="flex items-center h-5 shrink-0">
        <motion.div
          className="relative flex size-4 cursor-pointer"
          whileHover={!disabled ? { scale: 1.1 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <input
            checked={isChecked}
            onChange={handleChange}
            id={checkboxId}
            name={name || checkboxId}
            type="checkbox"
            disabled={disabled}
            aria-describedby={
              subtitle ? `${checkboxId}-description` : undefined
            }
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 border-gray-300 rounded bg-white cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          />
        </motion.div>
      </div>
      <div className="ml-2 text-sm">
        <motion.label
          htmlFor={checkboxId}
          variants={labelVariants}
          initial="hidden"
          animate="visible"
          transition={labelTransition}
          className={`block font-medium cursor-pointer select-none ${
            disabled
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-900 hover:text-indigo-600"
          } transition-colors`}
          whileHover={!disabled ? { x: 2 } : {}}
        >
          {title}
        </motion.label>
        <AnimatePresence mode="wait">
          {subtitle && (
            <motion.p
              id={`${checkboxId}-description`}
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={subtitleTransition}
              className={`${disabled ? "text-gray-400" : "text-gray-500"} mt-0.5`}
            >
              {subtitle}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export { Checkbox, CheckboxGroup, ToggleCheckbox, ProCheckbox };
