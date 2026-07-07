import React, { useState } from "react";
import {
  OptimizedImage,
  ImageConfigProvider,
} from "./Image";
import {
  AvatarImage,
  AvatarGroup,
  GalleryImage,
  ProductImage,
  ComparisonSlider,
  ProgressiveImage,
} from "./SpecializedImage";

// ============================================================================
// COMPREHENSIVE IMAGE DEMO
// ============================================================================

export default function AdvancedImageComponentsDemo() {
  const [activeTab, setActiveTab] = useState("optimized");

  const tabs = [
    { id: "optimized", label: "⚡ Optimized" },
    { id: "avatars", label: "👤 Avatars" },
    { id: "gallery", label: "🖼️ Gallery" },
    { id: "product", label: "🔍 Product" },
    { id: "comparison", label: "⚖️ Compare" },
    { id: "progressive", label: "📊 Progressive" },
  ];

  return (
    <ImageConfigProvider
      config={{
        defaultQuality: 85,
        defaultFormat: "auto",
        enableBlurPlaceholder: true,
      }}
    >
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Advanced Image Components
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Production-ready image optimization with intelligent loading, format detection, and specialized components
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="flex overflow-x-auto border-b border-slate-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-fit px-6 py-4 font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              {/* Optimized Loading Tab */}
              {activeTab === "optimized" && (
                <div className="space-y-10">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        1
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                          Lazy Loading with Intersection Observer
                        </h3>
                        <p className="text-slate-600">
                          Images load 200px before entering viewport
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                          <div className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                            <OptimizedImage
                              src={`https://images.unsplash.com/photo-${1506905925346 + i * 100000}-21bda4d32df4?w=400`}
                              alt={`Lazy loaded image ${i}`}
                              width={400}
                              height={400}
                              loading="lazy"
                              placeholder="blur"
                              className="w-full h-full hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="text-sm text-slate-500 text-center">
                            Image {i} • Lazy
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                          Eager Loading with High Priority
                        </h3>
                        <p className="text-slate-600">
                          Critical images load immediately for better LCP
                        </p>
                      </div>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-2xl">
                      <OptimizedImage
                        src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200"
                        alt="Hero image with eager loading"
                        width={1200}
                        height={600}
                        loading="eager"
                        fetchPriority="high"
                        preload={true}
                        placeholder="color"
                        placeholderColor="#1e40af"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                        3
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                          Placeholder Strategies
                        </h3>
                        <p className="text-slate-600">
                          Different loading states for better UX
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { type: "blur", label: "Blur" },
                        { type: "shimmer", label: "Shimmer" },
                        { type: "color", label: "Color" },
                        { type: "skeleton", label: "Skeleton" },
                      ].map((placeholder) => (
                        <div key={placeholder.type} className="space-y-2">
                          <div className="aspect-square rounded-lg overflow-hidden shadow-md">
                            <OptimizedImage
                              src={`https://images.unsplash.com/photo-${1506744038136 + Math.random() * 1000000}?w=300`}
                              alt={`${placeholder.label} placeholder`}
                              width={300}
                              height={300}
                              placeholder={placeholder.type as any}
                              className="w-full h-full"
                            />
                          </div>
                          <div className="text-sm text-slate-600 text-center font-medium">
                            {placeholder.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-linear-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        4
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                          Format Auto-Detection
                        </h3>
                        <p className="text-slate-600">
                          AVIF → WebP → JPEG fallback based on browser support
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      {[
                        { format: "auto", label: "Auto (Best)" },
                        { format: "webp", label: "WebP" },
                        { format: "jpeg", label: "JPEG" },
                      ].map((item) => (
                        <div key={item.format} className="space-y-2">
                          <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                            <OptimizedImage
                              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500"
                              alt={`${item.label} format`}
                              width={500}
                              height={300}
                              format={item.format as any}
                              placeholder="shimmer"
                              className="w-full h-full"
                            />
                          </div>
                          <div className="text-sm text-slate-600 text-center font-medium">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Avatars Tab */}
              {activeTab === "avatars" && (
                <div className="space-y-10">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">
                      Avatar Sizes
                    </h3>
                    <div className="flex items-end justify-center gap-6 p-8 bg-linear-to-br from-slate-50 to-slate-100 rounded-xl">
                      {(["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const).map((size) => (
                        <div key={size} className="flex flex-col items-center gap-3">
                          <AvatarImage
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
                            alt="User Avatar"
                            size={size}
                            ring
                            ringColor="ring-blue-500"
                          />
                          <span className="text-xs font-semibold text-slate-600 uppercase">
                            {size}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">
                      Status Indicators
                    </h3>
                    <div className="flex items-center justify-center gap-8 p-8 bg-linear-to-br from-slate-50 to-slate-100 rounded-xl">
                      {(["online", "offline", "away", "busy", "dnd"] as const).map((status) => (
                        <div key={status} className="flex flex-col items-center gap-3">
                          <AvatarImage
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
                            alt="User Avatar"
                            size="xl"
                            status={status}
                            ring
                          />
                          <span className="text-sm font-medium text-slate-600 capitalize">
                            {status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">
                      Avatar Group
                    </h3>
                    <div className="flex justify-center p-8 bg-linear-to-br from-slate-50 to-slate-100 rounded-xl">
                      <AvatarGroup
                        avatars={[
                          { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", alt: "User 1" },
                          { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100", alt: "User 2" },
                          { src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100", alt: "User 3" },
                          { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", alt: "User 4" },
                          { src: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=100", alt: "User 5" },
                          { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", alt: "User 6" },
                        ]}
                        max={5}
                        size="lg"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">
                      Error Fallback (Initials)
                    </h3>
                    <div className="flex justify-center gap-6 p-8 bg-linear-to-br from-slate-50 to-slate-100 rounded-xl">
                      <AvatarImage
                        src="invalid-url.jpg"
                        alt="John Doe"
                        size="2xl"
                        ring
                        fallbackBg="bg-gradient-to-br from-blue-500 to-blue-700"
                      />
                      <AvatarImage
                        src="invalid-url.jpg"
                        alt="Jane Smith"
                        size="2xl"
                        ring
                        fallbackBg="bg-gradient-to-br from-purple-500 to-pink-500"
                      />
                      <AvatarImage
                        src="invalid-url.jpg"
                        alt="Alex Johnson"
                        size="2xl"
                        ring
                        fallbackBg="bg-gradient-to-br from-green-500 to-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Gallery Tab */}
              {activeTab === "gallery" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">
                      Interactive Lightbox Gallery
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Click any image to open in fullscreen lightbox
                    </p>
                    <div className="grid grid-cols-3 gap-6">
                      {[
                        {
                          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
                          caption: "Mountain Landscape",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600",
                          caption: "Forest Trail",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600",
                          caption: "Ocean Sunset",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600",
                          caption: "Northern Lights",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
                          caption: "Desert Dunes",
                        },
                        {
                          src: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=600",
                          caption: "Coastal Cliffs",
                        },
                      ].map((img, idx) => (
                        <GalleryImage
                          key={idx}
                          src={img.src}
                          alt={img.caption}
                          caption={img.caption}
                          width={600}
                          height={400}
                          className="aspect-4/3 hover:shadow-2xl transition-shadow"
                          placeholder="blur"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Product Zoom Tab */}
              {activeTab === "product" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">
                      Product Image with Zoom on Hover
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Hover over the image to see zoom effect
                    </p>
                    <div className="max-w-2xl mx-auto">
                      <ProductImage
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
                        alt="Product showcase"
                        width={800}
                        height={800}
                        zoomScale={2.5}
                        showZoomIndicator
                        className="aspect-square shadow-2xl"
                        placeholder="shimmer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <ProductImage
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
                      alt="Product 2"
                      width={500}
                      height={500}
                      zoomScale={2}
                      className="aspect-square rounded-xl shadow-lg"
                    />
                    <ProductImage
                      src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500"
                      alt="Product 3"
                      width={500}
                      height={500}
                      zoomScale={2}
                      className="aspect-square rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              )}

              {/* Comparison Tab */}
              {activeTab === "comparison" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">
                      Before/After Comparison Slider
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Drag the slider or click to compare images
                    </p>
                    <ComparisonSlider
                      beforeImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&sat=-100"
                      afterImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
                      alt="Landscape comparison"
                      className="h-96 shadow-2xl"
                      showLabels
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <ComparisonSlider
                      beforeImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&brightness=0.7"
                      afterImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600"
                      alt="Forest brightness"
                      className="h-64 rounded-xl shadow-lg"
                      beforeLabel="Dark"
                      afterLabel="Bright"
                    />
                    <ComparisonSlider
                      beforeImage="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&blur=20"
                      afterImage="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600"
                      alt="Ocean clarity"
                      className="h-64 rounded-xl shadow-lg"
                      beforeLabel="Blurred"
                      afterLabel="Sharp"
                    />
                  </div>
                </div>
              )}

              {/* Progressive Tab */}
              {activeTab === "progressive" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">
                      Progressive Image Loading
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Low quality placeholder loads first, then high quality
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                      <ProgressiveImage
                        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=100"
                        lowQualitySrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=50&q=10"
                        alt="Progressive landscape"
                        width={800}
                        height={600}
                        showProgress
                        className="aspect-4/3 rounded-xl shadow-lg"
                      />
                      <ProgressiveImage
                        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=100"
                        lowQualitySrc="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=50&q=10"
                        alt="Progressive forest"
                        width={800}
                        height={600}
                        showProgress
                        className="aspect-4/3 rounded-xl shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: "⚡",
                title: "Performance Optimized",
                desc: "Lazy loading, srcset generation, format detection, and intelligent quality adjustment",
                gradient: "from-yellow-400 to-orange-500",
              },
              {
                icon: "🎯",
                title: "Developer Friendly",
                desc: "Simple API, TypeScript support, extensive customization, and comprehensive documentation",
                gradient: "from-blue-400 to-purple-500",
              },
              {
                icon: "♿",
                title: "Accessibility First",
                desc: "ARIA labels, keyboard navigation, screen reader support, and semantic HTML",
                gradient: "from-green-400 to-emerald-500",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow border border-slate-200"
              >
                <div className={`text-5xl mb-4 bg-linear-to-br ${feature.gradient} w-16 h-16 rounded-xl flex items-center justify-center`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Technical Features */}
          <div className="mt-12 bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Advanced Technical Features
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "Intersection Observer",
                "Responsive Images",
                "Format Detection",
                "Quality Adjustment",
                "Error Boundaries",
                "Device Capabilities",
                "Blur Placeholders",
                "Custom Loaders",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm"
                >
                  <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ImageConfigProvider>
  );
}

export function AdvancedImageDemo() {
  const [activeTab, setActiveTab] = useState("optimized");

  const tabs = [
    { id: "optimized", label: "Optimized Loading" },
    { id: "formats", label: "Format Detection" },
    { id: "placeholders", label: "Placeholders" },
    { id: "responsive", label: "Responsive" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Advanced Image Components
          </h1>
          <p className="text-lg text-slate-600">
            Production-ready optimized images with intelligent loading
            strategies
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === "optimized" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    Lazy Loading with Intersection Observer
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="aspect-square">
                        <OptimizedImage
                          src={`https://images.unsplash.com/photo-${1506905925346 + i * 100000}-21bda4d32df4?w=400`}
                          alt={`Optimized image ${i}`}
                          width={400}
                          height={400}
                          loading="lazy"
                          placeholder="blur"
                          className="rounded-lg shadow-md w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 mt-4">
                    Images load only when entering viewport with 200px margin
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    Eager Loading with High Priority
                  </h3>
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800"
                    alt="Hero image"
                    width={800}
                    height={400}
                    loading="eager"
                    fetchPriority="high"
                    placeholder="color"
                    className="rounded-lg shadow-lg w-full"
                  />
                  <p className="text-sm text-slate-600 mt-4">
                    Critical images load immediately with high priority
                  </p>
                </div>
              </div>
            )}

            {activeTab === "formats" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    Automatic Format Detection
                  </h3>
                  <p className="text-slate-600 mb-4">
                    The component automatically detects browser support for
                    AVIF, WebP, and falls back to JPEG
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500"
                      alt="Auto format"
                      width={500}
                      height={300}
                      format="auto"
                      placeholder="shimmer"
                      className="rounded-lg shadow-md w-full"
                    />
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500"
                      alt="WebP format"
                      width={500}
                      height={300}
                      format="webp"
                      placeholder="shimmer"
                      className="rounded-lg shadow-md w-full"
                    />
                  </div>
                </div>
              </div>
            )}
            {activeTab === "placeholders" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    Various Placeholder Strategies
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400"
                      alt="Blur placeholder"
                      width={400}
                      height={400}
                      placeholder="blur"
                      className="rounded-lg shadow-md w-full h-full"
                    />
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1494526585095-c41746248156?w=400"
                      alt="Shimmer placeholder"
                      width={400}
                      height={400}
                      placeholder="shimmer"
                      className="rounded-lg shadow-md w-full h-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
