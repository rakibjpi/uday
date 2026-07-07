import React, { useState } from "react";
import {
  Input,
  SearchInput,
  EmailInput,
  PhoneInput,
  NumberInput,
} from "./Input";
import { User, Lock, Mail, Phone, CreditCard, Calendar } from "lucide-react";

// ===== Example 1: Basic Inputs =====

export function BasicInputExamples() {
  return (
    <div className="space-y-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">Basic Inputs</h2>

      {/* Default Input */}
      <Input label="Full Name" placeholder="John Doe" />

      {/* With Icon */}
      <Input label="Username" placeholder="Enter username" leftIcon={User} />

      {/* Required Field */}
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        required
        leftIcon={Mail}
      />

      {/* Password Input */}
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        helperText="Must be at least 8 characters"
      />

      {/* Disabled Input */}
      <Input
        label="Disabled Field"
        placeholder="Cannot edit this"
        disabled
        defaultValue="Read-only value"
      />

      {/* Read-only Input */}
      <Input
        label="Read-only Field"
        placeholder="Cannot edit this"
        readOnly
        defaultValue="Fixed value"
      />
    </div>
  );
}

// ===== Example 2: Input Variants =====

export function InputVariants() {
  return (
    <div className="space-y-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">Input Variants</h2>

      <Input
        variant="default"
        label="Default Variant"
        placeholder="Standard border with shadow"
      />

      <Input
        variant="filled"
        label="Filled Variant"
        placeholder="Filled background"
      />

      <Input
        variant="outlined"
        label="Outlined Variant"
        placeholder="Thicker border"
      />

      <Input
        variant="ghost"
        label="Ghost Variant"
        placeholder="Minimal appearance"
      />

      <Input
        variant="underlined"
        label="Underlined Variant"
        placeholder="Bottom border only"
      />
    </div>
  );
}

// ===== Example 3: Input Sizes =====

export function InputSizes() {
  return (
    <div className="space-y-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">Input Sizes</h2>

      <Input
        size="sm"
        label="Small Input"
        placeholder="Compact size"
        leftIcon={User}
      />

      <Input
        size="md"
        label="Medium Input (Default)"
        placeholder="Standard size"
        leftIcon={User}
      />

      <Input
        size="lg"
        label="Large Input"
        placeholder="Larger size"
        leftIcon={User}
      />
    </div>
  );
}

// ===== Example 4: Validation States =====

export function ValidationStates() {
  return (
    <div className="space-y-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">Validation States</h2>

      <Input
        label="Default State"
        placeholder="No validation"
        helperText="This is a helper text"
      />

      <Input
        label="Success State"
        placeholder="Valid input"
        success="Email is available!"
        defaultValue="john@example.com"
        leftIcon={Mail}
      />

      <Input
        label="Error State"
        placeholder="Invalid input"
        error="This field is required"
        leftIcon={User}
      />

      <Input
        label="Warning State"
        placeholder="Warning input"
        warning="Password strength is weak"
        type="password"
      />

      {/* Boolean validation */}
      <Input label="Boolean Error" error={true} defaultValue="Invalid value" />

      <Input
        label="Boolean Success"
        success={true}
        defaultValue="Valid value"
      />
    </div>
  );
}

// ===== Example 5: Advanced Features =====

export function AdvancedFeatures() {
  const [text, setText] = useState("Sample text");
  const [clearableValue, setClearableValue] = useState("Clear me!");

  return (
    <div className="space-y-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">Advanced Features</h2>

      {/* Character Counter */}
      <Input
        label="Bio"
        placeholder="Tell us about yourself"
        maxLength={100}
        showCharCount
        value={text}
        onChange={(e) => setText(e.target.value)}
        helperText="Keep it short and sweet"
      />

      {/* Clearable Input */}
      <Input
        label="Clearable Input"
        placeholder="Type something..."
        clearable
        value={clearableValue}
        onChange={(e) => setClearableValue(e.target.value)}
        onClear={() => setClearableValue("")}
      />

      {/* With Prefix */}
      <Input label="Website" placeholder="example.com" prefix="https://" />

      {/* With Suffix */}
      <Input label="Price" placeholder="0.00" suffix="USD" type="number" />

      {/* Both Prefix and Suffix */}
      <Input
        label="Amount"
        placeholder="0.00"
        prefix="$"
        suffix="USD"
        type="number"
      />
    </div>
  );
}

// ===== Example 6: Specialized Inputs =====

export function SpecializedInputs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [quantity, setQuantity] = useState("1");

  return (
    <div className="space-y-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">Specialized Inputs</h2>

      {/* Search Input */}
      <SearchInput
        label="Search"
        placeholder="Search products..."
        onSearch={(value) => console.log("Searching:", value)}
      />

      {/* Email Input with Validation */}
      <EmailInput label="Email Address" placeholder="you@example.com" />

      {/* Phone Input */}
      <PhoneInput label="Phone Number" placeholder="+1 (555) 123-4567" />

      {/* Number Input with Controls */}
      <NumberInput
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min={1}
        max={99}
        step={1}
      />
    </div>
  );
}

// ===== Example 7: Form Example =====

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          leftIcon={Mail}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={errors.password}
          leftIcon={Lock}
          required
        />

        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

// ===== Example 8: Payment Form =====

export function PaymentForm() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Payment Information</h2>

      <form className="space-y-4">
        <Input
          label="Cardholder Name"
          placeholder="John Doe"
          leftIcon={User}
          required
        />

        <Input
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          leftIcon={CreditCard}
          maxLength={16}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiry Date"
            placeholder="MM/YY"
            leftIcon={Calendar}
            required
          />

          <Input
            label="CVV"
            placeholder="123"
            type="password"
            maxLength={3}
            required
          />
        </div>

        <Input
          label="Amount"
          type="number"
          placeholder="0.00"
          prefix="$"
          suffix="USD"
          required
        />

        <button
          type="submit"
          className="w-full py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}

// ===== Example 9: All Features Showcase =====

export function CompleteShowcase() {
  const [value, setValue] = useState("");

  return (
    <div className="max-w-md mx-auto space-y-8 p-6">
      <h1 className="text-3xl font-bold mb-8">Input Component Showcase</h1>

      {/* All variants */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Variants</h3>
        <div className="space-y-4">
          {(
            ["default", "filled", "outlined", "ghost", "underlined"] as const
          ).map((variant) => (
            <Input
              key={variant}
              variant={variant}
              label={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`}
              placeholder={`${variant} style`}
              leftIcon={User}
            />
          ))}
        </div>
      </section>

      {/* All sizes */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="space-y-4">
          <Input size="sm" label="Small" placeholder="sm" leftIcon={User} />
          <Input size="md" label="Medium" placeholder="md" leftIcon={User} />
          <Input size="lg" label="Large" placeholder="lg" leftIcon={User} />
        </div>
      </section>

      {/* All states */}
      <section>
        <h3 className="text-lg font-semibold mb-4">States</h3>
        <div className="space-y-4">
          <Input label="Default" placeholder="default" />
          <Input label="Success" success="Looks good!" defaultValue="valid" />
          <Input
            label="Error"
            error="Something's wrong"
            defaultValue="invalid"
          />
          <Input label="Warning" warning="Be careful!" defaultValue="risky" />
        </div>
      </section>

      {/* Specialized */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Specialized</h3>
        <div className="space-y-4">
          <SearchInput placeholder="Search..." />
          <EmailInput label="Email" placeholder="you@example.com" />
          <PhoneInput label="Phone" placeholder="+1 (555) 123-4567" />
          <NumberInput
            label="Quantity"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            min={0}
            max={10}
          />
        </div>
      </section>
    </div>
  );
}

// Export all examples
export default {
  BasicInputExamples,
  InputVariants,
  InputSizes,
  ValidationStates,
  AdvancedFeatures,
  SpecializedInputs,
  LoginForm,
  PaymentForm,
  CompleteShowcase,
};
