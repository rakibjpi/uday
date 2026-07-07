import React, { createContext, useContext, useState } from "react";
import { Check } from "lucide-react";

// ===== Type Definitions =====

type RadioVariant = "default" | "card" | "button" | "minimal";
type RadioSize = "sm" | "md" | "lg";
type RadioOrientation = "horizontal" | "vertical";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ComponentType<any>;
  disabled?: boolean;
  badge?: React.ReactNode;
}

interface RadioButtonProps {
  value: string;
  label?: string;
  description?: string;
  icon?: React.ComponentType<any>;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  name?: string;
  variant?: RadioVariant;
  size?: RadioSize;
  className?: string;
  badge?: React.ReactNode;
}

interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: RadioOption[];
  children?: React.ReactNode;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  variant?: RadioVariant;
  size?: RadioSize;
  orientation?: RadioOrientation;
  className?: string;
}

// ===== Context for RadioGroup =====

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  variant: RadioVariant;
  size: RadioSize;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  return context;
};

// ===== Style Utilities =====

const sizeStyles: Record<
  RadioSize,
  { radio: string; label: string; description: string }
> = {
  sm: {
    radio: "w-4 h-4",
    label: "text-sm",
    description: "text-xs",
  },
  md: {
    radio: "w-5 h-5",
    label: "text-base",
    description: "text-sm",
  },
  lg: {
    radio: "w-6 h-6",
    label: "text-lg",
    description: "text-base",
  },
};

const variantStyles: Record<
  RadioVariant,
  {
    container: string;
    containerChecked: string;
    containerHover: string;
    radio: string;
    radioChecked: string;
  }
> = {
  default: {
    container:
      "flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all",
    containerChecked: "",
    containerHover: " hover:bg-gray-50",
    radio: "border-2 border-gray-300 bg-blue-50 ",
    radioChecked: "border-blue-600 bg-blue-600",
  },
  card: {
    container:
      "flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all",
    containerChecked: "border-blue-600 bg-blue-50",
    containerHover: "hover:border-gray-300 hover:bg-gray-50",
    radio: "border-2 border-gray-300 bg-blue-50 flex-shrink-0 mt-0.5",
    radioChecked: "border-blue-600 bg-blue-600",
  },
  button: {
    container:
      "flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-300 rounded-lg cursor-pointer transition-all font-medium",
    containerChecked: "border-blue-600 bg-blue-50 text-blue-700",
    containerHover: "hover:border-gray-400 hover:bg-gray-50",
    radio: "hidden",
    radioChecked: "",
  },
  minimal: {
    container: "flex items-center gap-2",
    containerChecked: "",
    containerHover: "",
    radio: "border-2 border-gray-300 bg-blue-50",
    radioChecked: "border-blue-600 bg-blue-600",
  },
};

// ===== RadioButton Component =====

function RadioButton({
  value,
  label,
  description,
  icon: Icon,
  checked: checkedProp,
  disabled: disabledProp,
  onChange: onChangeProp,
  name: nameProp,
  variant: variantProp = "default",
  size: sizeProp = "md",
  className = "",
  badge,
}: RadioButtonProps) {
  // Get values from RadioGroup context if available
  const groupContext = useRadioGroup();

  const name = nameProp || groupContext?.name || "";
  const checked = checkedProp ?? groupContext?.value === value;
  const disabled = disabledProp ?? groupContext?.disabled ?? false;
  const variant = variantProp || groupContext?.variant || "default";
  const size = sizeProp || groupContext?.size || "md";
  const onChange = onChangeProp || groupContext?.onChange;

  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  const sizeStyle = sizeStyles[size];
  const variantStyle = variantStyles[variant];

  // Container classes - FIXED: Separated checked state
  const containerClasses = `
    ${variantStyle.container}
    ${checked ? variantStyle.containerChecked : ""}
    ${!disabled && !checked ? variantStyle.containerHover : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  // Radio circle classes - FIXED: Only the circle changes, not the whole row
  const radioClasses = `
    ${sizeStyle.radio}
    ${variantStyle.radio}
    ${checked ? variantStyle.radioChecked : ""}
    rounded-full
    flex items-center justify-center
    transition-all duration-200
    flex-shrink-0
    ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
    ${!disabled && !checked ? "hover:border-gray-400" : ""}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <label className={containerClasses}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
        aria-describedby={
          description ? `${name}-${value}-description` : undefined
        }
      />

      {/* Radio Circle - FIXED: Now always visible */}
      {variant !== "button" && (
        <div className={radioClasses}>
          {checked && (
            <div className="w-2 h-2 bg-white rounded-full animate-scale-in" />
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {Icon && variant !== "button" && (
            <Icon
              className={`${sizeStyle.radio} ${checked ? "text-blue-600" : "text-gray-600"} shrink-0`}
            />
          )}

          {variant === "button" && Icon && (
            <Icon
              className={`${sizeStyle.radio} ${checked ? "text-blue-600" : "text-gray-600"}`}
            />
          )}

          {label && (
            <span
              className={`${sizeStyle.label} font-medium ${
                checked && (variant === "button" || variant === "card")
                  ? "text-blue-700"
                  : "text-gray-900"
              } ${disabled ? "text-gray-400" : ""}`}
            >
              {label}
            </span>
          )}

          {badge && <span className="ml-auto">{badge}</span>}
        </div>

        {description && (
          <p
            id={`${name}-${value}-description`}
            className={`${sizeStyle.description} text-gray-600 mt-1 ${
              disabled ? "text-gray-400" : ""
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </label>
  );
}

// ===== RadioGroup Component =====

function RadioGroup({
  name,
  value: valueProp,
  defaultValue,
  onChange,
  options = [],
  children,
  label,
  description,
  error,
  required = false,
  disabled = false,
  variant = "default",
  size = "md",
  orientation = "vertical",
  className = "",
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = valueProp !== undefined;
  const currentValue = isControlled ? valueProp : internalValue;

  const handleChange = (value: string) => {
    if (!isControlled) {
      setInternalValue(value);
    }
    onChange?.(value);
  };

  const contextValue: RadioGroupContextValue = {
    name,
    value: currentValue,
    onChange: handleChange,
    disabled,
    variant,
    size,
  };

  const orientationClass =
    orientation === "horizontal"
      ? "flex flex-wrap gap-3"
      : "flex flex-col gap-3";

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={`w-full ${className}`}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 mb-3">{description}</p>
        )}

        {/* Radio Options */}
        <div className={orientationClass} role="radiogroup" aria-label={label}>
          {children ||
            options.map((option) => (
              <RadioButton
                key={option.value}
                value={option.value}
                label={option.label}
                description={option.description}
                icon={option.icon}
                disabled={option.disabled}
                badge={option.badge}
              />
            ))}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    </RadioGroupContext.Provider>
  );
}

// ===== Specialized Radio Components =====

// Color Radio - For color selection
function ColorRadio({
  value,
  color,
  label,
  checked,
  onChange,
  size = "md",
  disabled = false,
}: {
  value: string;
  color: string;
  label?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  size?: RadioSize;
  disabled?: boolean;
}) {
  const groupContext = useRadioGroup();
  const isChecked = checked ?? groupContext?.value === value;
  const isDisabled = disabled ?? groupContext?.disabled ?? false;
  const name = groupContext?.name || "color";

  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <label className="flex flex-col items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={() =>
          !isDisabled && (onChange || groupContext?.onChange)?.(value)
        }
        disabled={isDisabled}
        className="sr-only"
      />
      <div
        className={`
          ${sizeMap[size]}
          rounded-full
          border-4
          ${isChecked ? "border-gray-900 shadow-lg" : "border-gray-200"}
          ${!isDisabled ? "hover:border-gray-400" : "opacity-50 cursor-not-allowed"}
          transition-all
          flex items-center justify-center
        `}
        style={{ backgroundColor: color }}
      >
        {isChecked && <Check className="w-5 h-5 text-white drop-shadow-lg" />}
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}
    </label>
  );
}

// Image Radio - For image selection
function ImageRadio({
  value,
  imageSrc,
  label,
  checked,
  onChange,
  disabled = false,
}: {
  value: string;
  imageSrc: string;
  label?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
}) {
  const groupContext = useRadioGroup();
  const isChecked = checked ?? groupContext?.value === value;
  const isDisabled = disabled ?? groupContext?.disabled ?? false;
  const name = groupContext?.name || "image";

  return (
    <label className="flex flex-col gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={() =>
          !isDisabled && (onChange || groupContext?.onChange)?.(value)
        }
        disabled={isDisabled}
        className="sr-only"
      />
      <div
        className={`
          relative
          rounded-lg
          overflow-hidden
          border-4
          ${isChecked ? "border-blue-600 shadow-lg shadow-blue-500/30" : "border-gray-200"}
          ${!isDisabled ? "hover:border-gray-300" : "opacity-50 cursor-not-allowed"}
          transition-all
        `}
      >
        <img
          src={imageSrc}
          alt={label || value}
          className="w-full h-32 object-cover"
        />
        {isChecked && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-700 text-center">
          {label}
        </span>
      )}
    </label>
  );
}

// Rating Radio - For ratings (stars, thumbs, etc.)
function RatingRadio({
  name,
  value,
  defaultValue,
  onChange,
  max = 5,
  icon = "star",
  size = "md",
  labels,
}: {
  name: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  icon?: "star" | "heart" | "thumbs";
  size?: RadioSize;
  labels?: string[];
}) {
  const [internalValue, setInternalValue] = useState(defaultValue || 0);
  const [hoverValue, setHoverValue] = useState(0);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleClick = (rating: number) => {
    if (!isControlled) {
      setInternalValue(rating);
    }
    onChange?.(rating);
  };

  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const icons = {
    star: "⭐",
    heart: "❤️",
    thumbs: "👍",
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        {Array.from({ length: max }, (_, i) => i + 1).map((rating) => {
          const isFilled = rating <= (hoverValue || currentValue);
          return (
            <button
              key={rating}
              type="button"
              onClick={() => handleClick(rating)}
              onMouseEnter={() => setHoverValue(rating)}
              onMouseLeave={() => setHoverValue(0)}
              className={`
                ${sizeMap[size]}
                flex items-center justify-center
                transition-all
                ${isFilled ? "scale-110" : "scale-100 opacity-50"}
                hover:scale-125
              `}
              aria-label={`Rate ${rating} out of ${max}`}
            >
              <span className="text-2xl">{icons[icon]}</span>
            </button>
          );
        })}
      </div>
      {labels && labels[currentValue - 1] && (
        <p className="text-sm text-gray-600 text-center">
          {labels[currentValue - 1]}
        </p>
      )}
    </div>
  );
}

//  all components

export { RadioButton, RadioGroup, ColorRadio, ImageRadio, RatingRadio };

// Add animation styles
const styles = `
@keyframes scale-in {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.15s ease-out;
}
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
