import React, { useState } from "react";
import {
  RadioButton,
  RadioGroup,
  ColorRadio,
  ImageRadio,
  RatingRadio,
} from "./RadioButton";
import { CreditCard, Truck, Package, Heart, Star, Users } from "lucide-react";

// ===== Example 1: Basic Radio Buttons =====

export function BasicRadioExample() {
  const [selected, setSelected] = useState("option1");

  return (
    <div className="max-w-md space-y-4">
      <h2 className="text-xl font-bold">Basic Radio Buttons</h2>
      
      <RadioGroup
        name="basic"
        value={selected}
        onChange={setSelected}
        label="Choose an option"
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" },
        ]}
      />

      <p className="text-sm text-gray-600">Selected: {selected}</p>
    </div>
  );
}

// ===== Example 2: Radio Variants =====

export function RadioVariants() {
  const [variant1, setVariant1] = useState("a");
  const [variant2, setVariant2] = useState("a");
  const [variant3, setVariant3] = useState("a");
  const [variant4, setVariant4] = useState("a");

  const options = [
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
    { value: "c", label: "Option C" },
  ];

  return (
    <div className="space-y-8 max-w-2xl">
      <h2 className="text-xl font-bold">Radio Variants</h2>

      {/* Default Variant */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Default</h3>
        <RadioGroup
          name="default"
          variant="default"
          value={variant1}
          onChange={setVariant1}
          options={options}
        />
      </div>

      {/* Card Variant */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Card</h3>
        <RadioGroup
          name="card"
          variant="card"
          value={variant2}
          onChange={setVariant2}
          options={options}
        />
      </div>

      {/* Button Variant */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Button</h3>
        <RadioGroup
          name="button"
          variant="button"
          value={variant3}
          onChange={setVariant3}
          options={options}
          orientation="horizontal"
        />
      </div>

      {/* Minimal Variant */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Minimal</h3>
        <RadioGroup
          name="minimal"
          variant="minimal"
          value={variant4}
          onChange={setVariant4}
          options={options}
        />
      </div>
    </div>
  );
}

// ===== Example 3: With Icons & Descriptions =====

export function RadioWithIconsAndDescriptions() {
  const [payment, setPayment] = useState("card");

  return (
    <div className="max-w-2xl">
      <RadioGroup
        name="payment"
        value={payment}
        onChange={setPayment}
        label="Payment Method"
        description="Choose how you'd like to pay"
        variant="card"
        options={[
          {
            value: "card",
            label: "Credit Card",
            description: "Pay with Visa, Mastercard, or Amex",
            icon: CreditCard,
          },
          {
            value: "paypal",
            label: "PayPal",
            description: "Fast and secure payment",
            icon: Package,
          },
          {
            value: "bank",
            label: "Bank Transfer",
            description: "Direct transfer from your bank",
            icon: Truck,
          },
        ]}
      />
    </div>
  );
}

// ===== Example 4: Different Sizes =====

export function RadioSizes() {
  const [size1, setSize1] = useState("a");
  const [size2, setSize2] = useState("a");
  const [size3, setSize3] = useState("a");

  return (
    <div className="space-y-6 max-w-md">
      <h2 className="text-xl font-bold">Radio Sizes</h2>

      <RadioGroup
        name="small"
        size="sm"
        value={size1}
        onChange={setSize1}
        label="Small Size"
        options={[
          { value: "a", label: "Small A" },
          { value: "b", label: "Small B" },
        ]}
      />

      <RadioGroup
        name="medium"
        size="md"
        value={size2}
        onChange={setSize2}
        label="Medium Size (Default)"
        options={[
          { value: "a", label: "Medium A" },
          { value: "b", label: "Medium B" },
        ]}
      />

      <RadioGroup
        name="large"
        size="lg"
        value={size3}
        onChange={setSize3}
        label="Large Size"
        options={[
          { value: "a", label: "Large A" },
          { value: "b", label: "Large B" },
        ]}
      />
    </div>
  );
}

// ===== Example 5: Horizontal vs Vertical =====

export function RadioOrientation() {
  const [horizontal, setHorizontal] = useState("option1");
  const [vertical, setVertical] = useState("option1");

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div className="space-y-8 max-w-2xl">
      <h2 className="text-xl font-bold">Orientation</h2>

      <RadioGroup
        name="horizontal"
        label="Horizontal Layout"
        orientation="horizontal"
        variant="button"
        value={horizontal}
        onChange={setHorizontal}
        options={options}
      />

      <RadioGroup
        name="vertical"
        label="Vertical Layout"
        orientation="vertical"
        value={vertical}
        onChange={setVertical}
        options={options}
      />
    </div>
  );
}

// ===== Example 6: With Validation =====

export function RadioWithValidation() {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) {
      setError("Please select an option");
    } else {
      setError("");
      alert(`Selected: ${selected}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <RadioGroup
        name="validation"
        value={selected}
        onChange={(value) => {
          setSelected(value);
          setError("");
        }}
        label="Required Selection"
        description="You must choose one option"
        error={error}
        required
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "maybe", label: "Maybe" },
        ]}
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}

// ===== Example 7: Disabled Options =====

export function RadioWithDisabled() {
  const [selected, setSelected] = useState("available1");

  return (
    <div className="max-w-md">
      <RadioGroup
        name="availability"
        value={selected}
        onChange={setSelected}
        label="Product Availability"
        variant="card"
        options={[
          {
            value: "available1",
            label: "In Stock",
            description: "Ships within 24 hours",
          },
          {
            value: "available2",
            label: "Low Stock",
            description: "Only 3 left",
            badge: <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Low</span>,
          },
          {
            value: "unavailable",
            label: "Out of Stock",
            description: "Expected back in 2 weeks",
            disabled: true,
          },
        ]}
      />
    </div>
  );
}

// ===== Example 8: Pricing Plans =====

export function PricingPlans() {
  const [plan, setPlan] = useState("pro");

  return (
    <div className="max-w-3xl">
      <RadioGroup
        name="pricing"
        value={plan}
        onChange={setPlan}
        label="Choose Your Plan"
        description="Select the plan that works best for you"
        variant="card"
        options={[
          {
            value: "free",
            label: "Free",
            description: "Perfect for trying out",
            badge: (
              <div className="text-right">
                <p className="text-2xl font-bold">$0</p>
                <p className="text-xs text-gray-500">per month</p>
              </div>
            ),
          },
          {
            value: "pro",
            label: "Pro",
            description: "Best for professionals",
            badge: (
              <div className="text-right">
                <p className="text-2xl font-bold">$29</p>
                <p className="text-xs text-gray-500">per month</p>
              </div>
            ),
          },
          {
            value: "enterprise",
            label: "Enterprise",
            description: "For large teams",
            badge: (
              <div className="text-right">
                <p className="text-2xl font-bold">$99</p>
                <p className="text-xs text-gray-500">per month</p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

// ===== Example 9: Color Radio =====

export function ColorRadioExample() {
  const [color, setColor] = useState("#3B82F6");

  const colors = [
    { value: "#EF4444", label: "Red" },
    { value: "#3B82F6", label: "Blue" },
    { value: "#10B981", label: "Green" },
    { value: "#F59E0B", label: "Orange" },
    { value: "#8B5CF6", label: "Purple" },
    { value: "#EC4899", label: "Pink" },
  ];

  return (
    <div className="max-w-md space-y-4">
      <h3 className="text-lg font-semibold">Choose a Color</h3>
      <RadioGroup name="color" value={color} onChange={setColor}>
        <div className="flex gap-3">
          {colors.map((c) => (
            <ColorRadio
              key={c.value}
              value={c.value}
              color={c.value}
              label={c.label}
            />
          ))}
        </div>
      </RadioGroup>
      <p className="text-sm text-gray-600">Selected: {color}</p>
    </div>
  );
}

// ===== Example 10: Image Radio =====

export function ImageRadioExample() {
  const [theme, setTheme] = useState("light");

  const themes = [
    {
      value: "light",
      label: "Light",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=300&h=200&fit=crop",
    },
    {
      value: "dark",
      label: "Dark",
      image: "https://images.unsplash.com/photo-1557683316-973673baf926?w=300&h=200&fit=crop",
    },
    {
      value: "auto",
      label: "Auto",
      image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300&h=200&fit=crop",
    },
  ];

  return (
    <div className="max-w-2xl space-y-4">
      <h3 className="text-lg font-semibold">Choose Theme</h3>
      <RadioGroup name="theme" value={theme} onChange={setTheme}>
        <div className="grid grid-cols-3 gap-4">
          {themes.map((t) => (
            <ImageRadio
              key={t.value}
              value={t.value}
              imageSrc={t.image}
              label={t.label}
            />
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

// ===== Example 11: Rating Radio =====

export function RatingRadioExample() {
  const [rating, setRating] = useState(0);

  return (
    <div className="max-w-md space-y-4">
      <h3 className="text-lg font-semibold">Rate Your Experience</h3>
      <RatingRadio
        name="rating"
        value={rating}
        onChange={setRating}
        max={5}
        icon="star"
        labels={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
      />
      {rating > 0 && (
        <p className="text-sm text-gray-600">You rated: {rating} stars</p>
      )}
    </div>
  );
}

// ===== Example 12: Custom Radio with Children =====

export function CustomRadioWithChildren() {
  const [selected, setSelected] = useState("standard");

  return (
    <div className="max-w-2xl">
      <RadioGroup
        name="shipping"
        value={selected}
        onChange={setSelected}
        label="Shipping Method"
        variant="card"
      >
        <RadioButton
          value="standard"
          label="Standard Shipping"
          description="5-7 business days"
          icon={Truck}
          badge={<span className="text-sm font-semibold">Free</span>}
        />
        <RadioButton
          value="express"
          label="Express Shipping"
          description="2-3 business days"
          icon={Package}
          badge={<span className="text-sm font-semibold">$9.99</span>}
        />
        <RadioButton
          value="overnight"
          label="Overnight Shipping"
          description="Next business day"
          icon={CreditCard}
          badge={<span className="text-sm font-semibold">$24.99</span>}
        />
      </RadioGroup>
    </div>
  );
}

// ===== Example 13: Complete Form =====

export function CompleteFormExample() {
  const [formData, setFormData] = useState({
    plan: "",
    billing: "",
    payment: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.plan) newErrors.plan = "Please select a plan";
    if (!formData.billing) newErrors.billing = "Please select billing cycle";
    if (!formData.payment) newErrors.payment = "Please select payment method";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
      console.log(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      <h2 className="text-2xl font-bold">Subscription Form</h2>

      <RadioGroup
        name="plan"
        label="Select Plan"
        required
        error={errors.plan}
        value={formData.plan}
        onChange={(value) => {
          setFormData({ ...formData, plan: value });
          setErrors({ ...errors, plan: "" });
        }}
        variant="card"
        options={[
          { value: "basic", label: "Basic", description: "$9/month" },
          { value: "pro", label: "Pro", description: "$29/month" },
          { value: "enterprise", label: "Enterprise", description: "$99/month" },
        ]}
      />

      <RadioGroup
        name="billing"
        label="Billing Cycle"
        required
        error={errors.billing}
        value={formData.billing}
        onChange={(value) => {
          setFormData({ ...formData, billing: value });
          setErrors({ ...errors, billing: "" });
        }}
        variant="button"
        orientation="horizontal"
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly (Save 20%)" },
        ]}
      />

      <RadioGroup
        name="payment"
        label="Payment Method"
        required
        error={errors.payment}
        value={formData.payment}
        onChange={(value) => {
          setFormData({ ...formData, payment: value });
          setErrors({ ...errors, payment: "" });
        }}
        variant="card"
        options={[
          {
            value: "card",
            label: "Credit Card",
            description: "Visa, Mastercard, Amex",
            icon: CreditCard,
          },
          {
            value: "paypal",
            label: "PayPal",
            description: "Fast & secure",
            icon: Package,
          },
        ]}
      />

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Complete Subscription
      </button>
    </form>
  );
}

// Export all examples
export default {
  BasicRadioExample,
  RadioVariants,
  RadioWithIconsAndDescriptions,
  RadioSizes,
  RadioOrientation,
  RadioWithValidation,
  RadioWithDisabled,
  PricingPlans,
  ColorRadioExample,
  ImageRadioExample,
  RatingRadioExample,
  CustomRadioWithChildren,
  CompleteFormExample,
};