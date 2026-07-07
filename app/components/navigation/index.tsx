import React, { useState } from "react";

// Import reusable icons from separate file
import { HomeIcon, UserIcon, SettingsIcon } from "./icons";

// Export main components
export { NavigationBar, useNavbar } from "./NavigationBar";
export { Header, useHeader } from "./Header";
export { Sidebar, useSidebar } from "./Sidebar";

// Export sub-components for direct use
export {
  DropdownMenu,
  MegaMenu,
  MenuItemComponent,
  MobileMenu,
  HamburgerButton,
  Breadcrumbs,
  Tabs,
  SidebarItemComponent,
  CollapseButton,
  ResizeHandle,
} from "./components";

// Export all types
export type {
  // Navigation Bar types
  NavbarProps,
  MenuItem,
  NavbarVariant,
  NavbarSize,
  NavbarPosition,
  MenuItemType,
  NavbarContextValue,
  // Header types
  HeaderProps,
  HeaderVariant,
  HeaderSize,
  BreadcrumbItem,
  TabItem,
  HeaderContextValue,
  // Sidebar types
  SidebarProps,
  SidebarItem,
  SidebarVariant,
  SidebarPosition,
  SidebarBehavior,
  SidebarSize,
  SidebarContextValue,
} from "./types";

// Export hooks
export {
  useScrollDirection,
  useMobileDetection,
  useClickOutside,
  useResponsiveSidebar,
  useResizable,
} from "../../hooks";

// Export icons
export { HomeIcon, UserIcon, SettingsIcon, ChevronDownIcon, ChevronRightIcon, CollapseIcon } from "./icons";

// Export configs
export { navbarSizeConfig, headerSizeConfig, sidebarSizeConfig, maxWidthConfig } from "./config";

// ============================================================================
// NAVIGATION DEMO COMPONENT
// ============================================================================

export default function NavigationDemo() {
  const [activeDemo, setActiveDemo] = useState("navbar");

  const demos = [
    { id: "navbar", label: "Navigation Bar", icon: <HomeIcon /> },
    { id: "header", label: "Header", icon: <UserIcon /> },
    { id: "sidebar", label: "Sidebar", icon: <SettingsIcon /> },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-8">
        {/* Demo Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Advanced Navigation Components
          </h1>
          <p className="text-xl text-slate-600">
            Production-ready, fully customizable navigation system
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="flex border-b border-slate-200">
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-semibold transition-all ${
                  activeDemo === demo.id
                    ? "bg-linear-to-r from-blue-600 to-purple-600 text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {demo.icon}
                <span>{demo.label}</span>
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Navigation Bar Demo */}
            {activeDemo === "navbar" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    📋 NavigationBar Component
                  </h2>
                  <p className="text-slate-600 mb-6">
                    A flexible navigation bar with multiple variants, mobile
                    support, and advanced features.
                  </p>

                  <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-6 space-y-6">
                    <h3 className="text-lg font-semibold text-slate-900">
                      ✨ Key Features
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "🎨 Multiple variants (default, sticky, fixed, transparent, blur)",
                        "📱 Responsive mobile menu with hamburger",
                        "🔽 Dropdown & mega menu support",
                        "📍 Auto-hide on scroll",
                        "🎯 Active item tracking",
                        "🌐 External link support",
                        "🔔 Badge notifications",
                        "⚡ Smooth animations",
                        "🎭 Dark mode ready",
                        "♿ Fully accessible",
                        "🔧 Highly customizable",
                        "📦 TypeScript support",
                      ].map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-sm text-slate-700"
                        >
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 bg-slate-900 rounded-xl p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      {`<NavigationBar
  variant="sticky"
  size="md"
  logo={<Logo />}
  items={[
    { id: "home", label: "Home", href: "/" },
    {
      id: "products",
      label: "Products",
      type: "dropdown",
      children: [
        { id: "p1", label: "Product 1", href: "/p1" },
        { id: "p2", label: "Product 2", href: "/p2" }
      ]
    },
    {
      id: "solutions",
      label: "Solutions",
      type: "mega",
      megaMenuContent: <CustomMegaMenu />
    }
  ]}
  actions={
    <>
      <Button variant="ghost">Sign In</Button>
      <Button>Get Started</Button>
    </>
  }
  hideOnScroll
  elevateOnScroll
  maxWidth="xl"
/>`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Header Demo */}
            {activeDemo === "header" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    🎯 Header Component
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Versatile page header with 5 built-in layouts, breadcrumbs,
                    and tabs support.
                  </p>

                  <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-6 space-y-6">
                    <h3 className="text-lg font-semibold text-slate-900">
                      ✨ Key Features
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "🎨 5 variants (default, centered, split, minimal, hero)",
                        "🍞 Breadcrumb navigation",
                        "📑 Tab system included",
                        "🎭 Avatar support",
                        "🏷️ Badge notifications",
                        "🖼️ Background image support",
                        "📏 4 size options",
                        "📌 Sticky positioning",
                        "🎯 Action buttons area",
                        "♿ Accessibility first",
                        "🔧 Fully customizable",
                        "📦 TypeScript support",
                      ].map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-sm text-slate-700"
                        >
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 bg-slate-900 rounded-xl p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      {`<Header
  variant="default"
  size="lg"
  title="Dashboard"
  subtitle="Welcome back, John!"
  description="Manage your projects and team."
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Dashboard", active: true }
  ]}
  avatar={<Avatar src="/user.jpg" />}
  badge="Pro"
  actions={
    <>
      <Button variant="outline">Export</Button>
      <Button>New Project</Button>
    </>
  }
  tabs={[
    { id: "overview", label: "Overview" },
    { id: "analytics", label: "Analytics", badge: 3 },
    { id: "settings", label: "Settings" }
  ]}
  activeTab="overview"
  sticky
  elevated
/>`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Sidebar Demo */}
            {activeDemo === "sidebar" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    📂 Sidebar Component
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Advanced sidebar with collapsible navigation, nested items,
                    and multiple behaviors.
                  </p>

                  <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-6 space-y-6">
                    <h3 className="text-lg font-semibold text-slate-900">
                      ✨ Key Features
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "🎨 4 variants (default, floating, bordered, minimal)",
                        "📂 Nested navigation items",
                        "🔄 Collapsible with animation",
                        "📱 Mobile overlay mode",
                        "↔️ Push/overlay behaviors",
                        "📐 Resizable width",
                        "🎯 Active item tracking",
                        "🏷️ Badge notifications",
                        "📍 Left/right positioning",
                        "♿ Fully accessible",
                        "🔧 Highly customizable",
                        "📦 TypeScript support",
                      ].map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-sm text-slate-700"
                        >
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 bg-slate-900 rounded-xl p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      {`<Sidebar
  variant="default"
  behavior="collapsible"
  size="md"
  position="left"
  items={[
    { id: "home", label: "Home", icon: <HomeIcon />, href: "/" },
    { id: "divider", divider: true },
    { id: "section", label: "Section", header: true },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon />,
      badge: 3,
      children: [
        { id: "profile", label: "Profile", href: "/settings/profile" },
        { id: "account", label: "Account", href: "/settings/account" }
      ]
    }
  ]}
  header={<Logo />}
  footer={<UserProfile />}
  showCollapseButton
  resizable
  minWidth={200}
  maxWidth={400}
/>`}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            🎯 Component Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">
                    Feature
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-900">
                    NavigationBar
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-900">
                    Header
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-900">
                    Sidebar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {
                    feature: "Mobile Responsive",
                    navbar: true,
                    header: true,
                    sidebar: true,
                  },
                  {
                    feature: "Nested Navigation",
                    navbar: true,
                    header: false,
                    sidebar: true,
                  },
                  {
                    feature: "Dropdown Menus",
                    navbar: true,
                    header: false,
                    sidebar: true,
                  },
                  {
                    feature: "Breadcrumbs",
                    navbar: false,
                    header: true,
                    sidebar: false,
                  },
                  {
                    feature: "Tabs",
                    navbar: false,
                    header: true,
                    sidebar: false,
                  },
                  {
                    feature: "Collapsible",
                    navbar: false,
                    header: false,
                    sidebar: true,
                  },
                  {
                    feature: "Resizable",
                    navbar: false,
                    header: false,
                    sidebar: true,
                  },
                  {
                    feature: "Scroll Behavior",
                    navbar: true,
                    header: true,
                    sidebar: false,
                  },
                  {
                    feature: "Background Image",
                    navbar: false,
                    header: true,
                    sidebar: false,
                  },
                  {
                    feature: "Multiple Variants",
                    navbar: true,
                    header: true,
                    sidebar: true,
                  },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="py-3 px-4 text-slate-700">{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {row.navbar ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.header ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.sidebar ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="mt-8 bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">
            ⚡ Technical Highlights
          </h3>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                title: "Performance",
                desc: "Optimized with React.memo, useMemo, and useCallback",
              },
              {
                title: "Accessibility",
                desc: "ARIA labels, keyboard navigation, screen reader support",
              },
              {
                title: "TypeScript",
                desc: "Full type safety with comprehensive interfaces",
              },
              {
                title: "Animations",
                desc: "Smooth transitions with Tailwind utilities",
              },
              {
                title: "Dark Mode",
                desc: "Built-in dark mode support out of the box",
              },
              {
                title: "Customizable",
                desc: "Extensive props for complete control",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-slate-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
