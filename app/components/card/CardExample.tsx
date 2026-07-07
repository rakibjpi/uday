import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardSection,
  SimpleCard,
  ListCard,
  StatsCard,
} from "./Card";
import Button from "../button/Button";
import { Input } from "../input/Input";
import Checkbox from "../checkbox/Checkbox";
import Divider from "../Separator/Divider";

// ===== Example 1: Login Card (Original Use Case Improved) =====

export function LoginCard() {
  return (
    <Card
      variant="elevated"
      size="md"
      header={{
        title: "Welcome Back",
        subtitle: "Sign in to your account",
        logoUrl: "https://www.google.com/favicon.ico",
        align: "center",
      }}
      footer={{
        children: (
          <>
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </a>
            </p>
          </>
        ),
        align: "center",
      }}
    >
      <CardBody>
        {/* Email Input */}
        <div className="mb-4">
          <Input
            label="Username or Email"
            fieldset={{
              field: "email",
              inputType: "email",
              placeholder: "you@example.com",
            }}
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <Input
            label="Password"
            fieldset={{
              field: "password",
              inputType: "password",
              placeholder: "••••••••",
            }}
          />
        </div>

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between mb-6">
          <Checkbox title="Remember me" />
          <Button
            title="Forgot password?"
            size="sm"
            variant="inline"
            link="/forgot-password"
          />
        </div>

        {/* Sign In Button */}
        <Button
          title="Sign In"
          type="submit"
          fullWidth={true}
          variant="primary"
          size="md"
        />

        {/* Divider */}
        <Divider title="Or sign in with" className="my-6" />

        {/* Social Login Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Button
            title="Google"
            ImageSrc="https://www.google.com/favicon.ico"
            variant="transparent"
            size="sm"
          />
          <Button
            title="GitHub"
            ImageSrc="https://github.com/favicon.ico"
            variant="transparent"
            size="sm"
          />
          <Button
            title="Apple"
            ImageSrc="https://www.apple.com/favicon.ico"
            variant="transparent"
            size="sm"
          />
        </div>
      </CardBody>
    </Card>
  );
}

// ===== Example 2: Profile Card with Actions =====

export function ProfileCard() {
  return (
    <Card
      variant="elevated"
      size="md"
      header={{
        title: "John Doe",
        subtitle: "Product Designer",
        description:
          "Passionate about creating beautiful and functional user experiences.",
        logoUrl: "https://i.pravatar.cc/150?img=12",
        logoAlt: "Profile picture",
        actions: (
          <>
            <Button title="Edit" variant="secondary" size="sm" />
            <Button title="Share" variant="primary" size="sm" />
          </>
        ),
        badge: (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
            Active
          </span>
        ),
      }}
      footer={{
        children: (
          <>
            <Button title="Message" variant="primary" size="md" fullWidth />
            <Button title="Follow" variant="secondary" size="md" fullWidth />
          </>
        ),
        align: "between",
      }}
    >
      <CardBody>
        <CardSection title="About">
          <p className="text-sm text-gray-600 leading-relaxed">
            I'm a product designer with 5+ years of experience in creating
            user-centered digital products. I love working at the intersection
            of design and technology.
          </p>
        </CardSection>

        <CardSection title="Stats" divider>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">1.2K</p>
              <p className="text-sm text-gray-600">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">456</p>
              <p className="text-sm text-gray-600">Following</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">89</p>
              <p className="text-sm text-gray-600">Posts</p>
            </div>
          </div>
        </CardSection>
      </CardBody>
    </Card>
  );
}

// ===== Example 3: Dashboard Stats Cards =====

export function DashboardStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Revenue"
        value="$45,231"
        description="Last 30 days"
        trend="up"
        trendValue="+12.5%"
        icon={<span className="text-2xl">💰</span>}
      />
      <StatsCard
        title="Active Users"
        value="2,345"
        description="Currently online"
        trend="up"
        trendValue="+5.3%"
        icon={<span className="text-2xl">👥</span>}
      />
      <StatsCard
        title="Orders"
        value="1,234"
        description="This month"
        trend="down"
        trendValue="-2.1%"
        icon={<span className="text-2xl">📦</span>}
      />
      <StatsCard
        title="Conversion Rate"
        value="3.2%"
        description="Average"
        trend="neutral"
        trendValue="0%"
        icon={<span className="text-2xl">📊</span>}
      />
    </div>
  );
}

// ===== Example 4: Product Card (Clickable & Hoverable) =====

export function ProductCard() {
  return (
    <Card
      variant="outlined"
      size="sm"
      hoverable
      clickable
      onClick={() => alert("Product clicked!")}
      header={{
        title: "Premium Headphones",
        subtitle: "$299.99",
        badge: (
          <span className="px-2 py-1 text-xs font-bold bg-red-100 text-red-600 rounded">
            -20% OFF
          </span>
        ),
      }}
    >
      <CardBody padding="none">
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
          alt="Headphones"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">
            Premium wireless headphones with active noise cancellation and
            40-hour battery life.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-sm text-gray-600">(128 reviews)</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// ===== Example 5: List Card =====

interface notificationsProps {
  id: number;
  title: string;
  message: string;
  time: string;
}

export function NotificationsCard() {
  const notifications: notificationsProps[] = [
    {
      id: 1,
      title: "New comment",
      message: "John commented on your post",
      time: "2m ago",
    },
    {
      id: 2,
      title: "New follower",
      message: "Sarah started following you",
      time: "1h ago",
    },
    {
      id: 3,
      title: "Achievement unlocked",
      message: "You've reached 100 followers!",
      time: "3h ago",
    },
  ];

  return (
    <ListCard
      title="Notifications"
      items={notifications}
      renderItem={(notification: notificationsProps) => (
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {notification.title}
            </p>
            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
          </div>
        </div>
      )}
    />
  );
}

// ===== Example 6: Settings Card with Sections =====

export function SettingsCard() {
  return (
    <Card
      variant="default"
      size="lg"
      header={{
        title: "Account Settings",
        description: "Manage your account preferences and privacy settings",
      }}
      footer={{
        children: (
          <>
            <Button title="Cancel" variant="secondary" size="md" />
            <Button title="Save Changes" variant="primary" size="md" />
          </>
        ),
        align: "right",
      }}
    >
      <CardBody>
        <CardSection title="Profile Information">
          <div className="space-y-4">
            <Input
              label="Full Name"
              fieldset={{
                field: "name",
                inputType: "text",
                placeholder: "John Doe",
              }}
            />
            <Input
              label="Email"
              fieldset={{
                field: "email",
                inputType: "email",
                placeholder: "john@example.com",
              }}
            />
          </div>
        </CardSection>

        <CardSection title="Notifications" divider>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Email Notifications
                </p>
                <p className="text-xs text-gray-600">
                  Receive updates via email
                </p>
              </div>
              <Checkbox title="" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Push Notifications
                </p>
                <p className="text-xs text-gray-600">
                  Receive updates on your device
                </p>
              </div>
              <Checkbox title="" />
            </div>
          </div>
        </CardSection>

        <CardSection title="Privacy" divider>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Profile Visibility
                </p>
                <p className="text-xs text-gray-600">
                  Make your profile public
                </p>
              </div>
              <Checkbox title="" />
            </div>
          </div>
        </CardSection>
      </CardBody>
    </Card>
  );
}

// ===== Example 7: Loading Card =====

export function LoadingCardExample() {
  const [loading, setLoading] = React.useState(false);

  return (
    <Card
      variant="elevated"
      size="md"
      loading={loading}
      header={{
        title: "Submit Form",
        subtitle: "Click the button to test loading state",
      }}
      footer={{
        children: (
          <Button
            title={loading ? "Processing..." : "Submit"}
            variant="primary"
            size="md"
            fullWidth
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 3000);
            }}
            disabled={loading}
          />
        ),
      }}
    >
      <CardBody>
        <p className="text-sm text-gray-600">
          This card demonstrates the loading state feature. Click submit to see
          it in action.
        </p>
      </CardBody>
    </Card>
  );
}

// ===== Example 8: Glass Card (Modern Design) =====

export function GlassCard() {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 p-8 flex items-center justify-center">
      <Card
        variant="glass"
        size="md"
        header={{
          title: "Glassmorphism Design",
          subtitle: "Modern and trendy UI",
          align: "center",
        }}
        footer={{
          children: (
            <Button title="Get Started" variant="primary" size="md" fullWidth />
          ),
        }}
      >
        <CardBody>
          <p className="text-sm text-gray-700 text-center">
            This card uses a glass morphism effect with backdrop blur for a
            modern, semi-transparent appearance.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

// ===== Example 9: Simple Card =====

export function SimpleCardExample() {
  return (
    <SimpleCard padding="lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Simple Card</h3>
      <p className="text-sm text-gray-600">
        This is a simple card without header or footer. Perfect for basic
        content.
      </p>
    </SimpleCard>
  );
}

// Export all examples
export default {
  LoginCard,
  ProfileCard,
  DashboardStatsCards,
  ProductCard,
  NotificationsCard,
  SettingsCard,
  LoadingCardExample,
  GlassCard,
  SimpleCardExample,
};
