import React, { useState } from "react";
import {
  OptimizedImage,
  ImageConfigProvider,
} from "./Image";
import {
  AvatarImage,
  AvatarGroup,
  BackgroundImage,
  GalleryImage,
  ProductImage,
  ComparisonSlider,
  ProgressiveImage,
} from "./SpecializedImage";

// ============================================================================
// 100 IMAGE EXAMPLES - COMPREHENSIVE SHOWCASE
// ============================================================================

// Sample image URLs for demos
const sampleImages = {
  nature: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  portrait: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  city: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800",
  abstract: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800",
  food: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
  product: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
  ocean: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800",
  mountain: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
  forest: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
  sunset: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800",
  architecture: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
  texture: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
  person1: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  person2: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
  person3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  person4: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  person5: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
  before: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800",
  after: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800",
};

// ============================================================================
// SECTION 1: OPTIMIZED IMAGE - BASIC EXAMPLES (1-20)
// ============================================================================

// Example 1: Basic image with dimensions
export function Example01_BasicImage() {
  return (
    <OptimizedImage
      src={sampleImages.nature}
      alt="Beautiful mountain landscape"
      width={400}
      height={300}
    />
  );
}

// Example 2: Lazy loading image
export function Example02_LazyLoading() {
  return (
    <OptimizedImage
      src={sampleImages.ocean}
      alt="Ocean waves"
      width={400}
      height={300}
      loading="lazy"
    />
  );
}

// Example 3: Eager loading for LCP
export function Example03_EagerLoading() {
  return (
    <OptimizedImage
      src={sampleImages.abstract}
      alt="Abstract gradient hero"
      width={800}
      height={400}
      loading="eager"
      fetchPriority="high"
      preload={true}
    />
  );
}

// Example 4: Blur placeholder
export function Example04_BlurPlaceholder() {
  return (
    <OptimizedImage
      src={sampleImages.forest}
      alt="Dense forest"
      width={400}
      height={300}
      placeholder="blur"
    />
  );
}

// Example 5: Shimmer placeholder
export function Example05_ShimmerPlaceholder() {
  return (
    <OptimizedImage
      src={sampleImages.city}
      alt="City skyline"
      width={400}
      height={300}
      placeholder="shimmer"
    />
  );
}

// Example 6: Color placeholder
export function Example06_ColorPlaceholder() {
  return (
    <OptimizedImage
      src={sampleImages.sunset}
      alt="Golden sunset"
      width={400}
      height={300}
      placeholder="color"
      placeholderColor="#f97316"
    />
  );
}

// Example 7: Skeleton placeholder
export function Example07_SkeletonPlaceholder() {
  return (
    <OptimizedImage
      src={sampleImages.architecture}
      alt="Modern architecture"
      width={400}
      height={300}
      placeholder="skeleton"
    />
  );
}

// Example 8: Gradient placeholder
export function Example08_GradientPlaceholder() {
  return (
    <OptimizedImage
      src={sampleImages.mountain}
      alt="Snow-capped mountain"
      width={400}
      height={300}
      placeholder="gradient"
    />
  );
}

// Example 9: Fill container mode
export function Example09_FillContainer() {
  return (
    <div className="relative w-64 h-48">
      <OptimizedImage
        src={sampleImages.nature}
        alt="Fill mode landscape"
        fill={true}
        fit="cover"
      />
    </div>
  );
}

// Example 10: Object-fit contain
export function Example10_FitContain() {
  return (
    <div className="w-64 h-48 bg-gray-100">
      <OptimizedImage
        src={sampleImages.product}
        alt="Product with contain fit"
        width={256}
        height={192}
        fit="contain"
      />
    </div>
  );
}

// Example 11: Object-fit cover
export function Example11_FitCover() {
  return (
    <OptimizedImage
      src={sampleImages.portrait}
      alt="Portrait with cover fit"
      width={200}
      height={200}
      fit="cover"
      className="rounded-lg"
    />
  );
}

// Example 12: Object position top
export function Example12_PositionTop() {
  return (
    <OptimizedImage
      src={sampleImages.portrait}
      alt="Portrait positioned top"
      width={200}
      height={150}
      fit="cover"
      position="top"
      className="rounded-lg"
    />
  );
}

// Example 13: Object position bottom
export function Example13_PositionBottom() {
  return (
    <OptimizedImage
      src={sampleImages.mountain}
      alt="Mountain positioned bottom"
      width={300}
      height={150}
      fit="cover"
      position="bottom"
    />
  );
}

// Example 14: Custom aspect ratio
export function Example14_AspectRatio() {
  return (
    <OptimizedImage
      src={sampleImages.nature}
      alt="16:9 aspect ratio landscape"
      width={400}
      aspectRatio="16/9"
      fit="cover"
    />
  );
}

// Example 15: Square aspect ratio
export function Example15_SquareAspectRatio() {
  return (
    <OptimizedImage
      src={sampleImages.food}
      alt="Square food photo"
      width={300}
      aspectRatio="1/1"
      fit="cover"
      className="rounded-xl"
    />
  );
}

// Example 16: WebP format
export function Example16_WebPFormat() {
  return (
    <OptimizedImage
      src={sampleImages.nature}
      alt="WebP format image"
      width={400}
      height={300}
      format="webp"
    />
  );
}

// Example 17: AVIF format
export function Example17_AVIFFormat() {
  return (
    <OptimizedImage
      src={sampleImages.abstract}
      alt="AVIF format image"
      width={400}
      height={300}
      format="avif"
    />
  );
}

// Example 18: Auto format detection
export function Example18_AutoFormat() {
  return (
    <OptimizedImage
      src={sampleImages.city}
      alt="Auto format detection"
      width={400}
      height={300}
      format="auto"
    />
  );
}

// Example 19: Custom quality (high)
export function Example19_HighQuality() {
  return (
    <OptimizedImage
      src={sampleImages.texture}
      alt="High quality texture"
      width={400}
      height={300}
      quality={95}
    />
  );
}

// Example 20: Custom quality (low for bandwidth)
export function Example20_LowQuality() {
  return (
    <OptimizedImage
      src={sampleImages.nature}
      alt="Low quality for fast loading"
      width={400}
      height={300}
      quality={50}
    />
  );
}

// ============================================================================
// SECTION 2: OPTIMIZED IMAGE - ADVANCED EXAMPLES (21-40)
// ============================================================================

// Example 21: Fade-in animation
export function Example21_FadeIn() {
  return (
    <OptimizedImage
      src={sampleImages.sunset}
      alt="Sunset with fade-in"
      width={400}
      height={300}
      fadeIn={true}
      fadeDuration={500}
    />
  );
}

// Example 22: Slow fade-in
export function Example22_SlowFadeIn() {
  return (
    <OptimizedImage
      src={sampleImages.ocean}
      alt="Ocean with slow fade"
      width={400}
      height={300}
      fadeIn={true}
      fadeDuration={1500}
    />
  );
}

// Example 23: With onLoad callback
export function Example23_OnLoadCallback() {
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Image loaded!", e.currentTarget.src);
  };

  return (
    <OptimizedImage
      src={sampleImages.forest}
      alt="Forest with load callback"
      width={400}
      height={300}
      onLoad={handleLoad}
    />
  );
}

// Example 24: With loading complete callback
export function Example24_LoadingComplete() {
  const handleComplete = (result: { naturalWidth: number; naturalHeight: number; loadTime: number }) => {
    console.log(`Loaded in ${result.loadTime}ms, size: ${result.naturalWidth}x${result.naturalHeight}`);
  };

  return (
    <OptimizedImage
      src={sampleImages.architecture}
      alt="Architecture with metrics"
      width={400}
      height={300}
      onLoadingComplete={handleComplete}
    />
  );
}

// Example 25: With error handling
export function Example25_ErrorHandling() {
  return (
    <OptimizedImage
      src="https://invalid-url.com/image.jpg"
      alt="Image with error fallback"
      width={400}
      height={300}
      onError={(e) => console.log("Failed to load image")}
    />
  );
}

// Example 26: Retry on error
export function Example26_RetryOnError() {
  return (
    <OptimizedImage
      src={sampleImages.nature}
      alt="Image with retry"
      width={400}
      height={300}
      retryCount={3}
      retryDelay={1000}
    />
  );
}

// Example 27: Async decoding
export function Example27_AsyncDecoding() {
  return (
    <OptimizedImage
      src={sampleImages.abstract}
      alt="Async decoded image"
      width={400}
      height={300}
      decoding="async"
    />
  );
}

// Example 28: Sync decoding (critical images)
export function Example28_SyncDecoding() {
  return (
    <OptimizedImage
      src={sampleImages.abstract}
      alt="Sync decoded hero"
      width={800}
      height={400}
      decoding="sync"
      loading="eager"
      fetchPriority="high"
    />
  );
}

// Example 29: Custom srcSet
export function Example29_CustomSrcSet() {
  return (
    <OptimizedImage
      src={sampleImages.nature}
      alt="Responsive image"
      width={800}
      height={600}
      srcSet={`
        ${sampleImages.nature}&w=400 400w,
        ${sampleImages.nature}&w=800 800w,
        ${sampleImages.nature}&w=1200 1200w
      `}
      sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px"
    />
  );
}

// Example 30: Custom sizes attribute
export function Example30_CustomSizes() {
  return (
    <OptimizedImage
      src={sampleImages.city}
      alt="Responsive city"
      width={800}
      height={600}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  );
}

// Example 31: CORS anonymous
export function Example31_CORSAnonymous() {
  return (
    <OptimizedImage
      src={sampleImages.nature}
      alt="CORS anonymous"
      width={400}
      height={300}
      crossOrigin="anonymous"
    />
  );
}

// Example 32: With title attribute
export function Example32_WithTitle() {
  return (
    <OptimizedImage
      src={sampleImages.sunset}
      alt="Beautiful sunset over mountains"
      title="Click to view full size"
      width={400}
      height={300}
    />
  );
}

// Example 33: Non-draggable image
export function Example33_NonDraggable() {
  return (
    <OptimizedImage
      src={sampleImages.product}
      alt="Protected product image"
      width={400}
      height={300}
      draggable={false}
    />
  );
}

// Example 34: Presentation role
export function Example34_PresentationRole() {
  return (
    <OptimizedImage
      src={sampleImages.texture}
      alt=""
      role="presentation"
      width={400}
      height={300}
    />
  );
}

// Example 35: Custom lazy boundary
export function Example35_LazyBoundary() {
  return (
    <OptimizedImage
      src={sampleImages.forest}
      alt="Lazy with custom boundary"
      width={400}
      height={300}
      loading="lazy"
      lazyBoundary="500px"
    />
  );
}

// Example 36: Intersection threshold
export function Example36_IntersectionThreshold() {
  return (
    <OptimizedImage
      src={sampleImages.ocean}
      alt="Custom threshold"
      width={400}
      height={300}
      loading="lazy"
      threshold={0.5}
    />
  );
}

// Example 37: Unoptimized image
export function Example37_Unoptimized() {
  return (
    <OptimizedImage
      src={sampleImages.architecture}
      alt="Unoptimized original"
      width={400}
      height={300}
      unoptimized={true}
    />
  );
}

// Example 38: Custom referrer policy
export function Example38_ReferrerPolicy() {
  return (
    <OptimizedImage
      src={sampleImages.city}
      alt="No referrer"
      width={400}
      height={300}
      referrerPolicy="no-referrer"
    />
  );
}

// Example 39: Rounded corners with shadow
export function Example39_RoundedShadow() {
  return (
    <OptimizedImage
      src={sampleImages.food}
      alt="Food with styling"
      width={300}
      height={300}
      fit="cover"
      className="rounded-2xl shadow-xl"
    />
  );
}

// Example 40: Card-style image
export function Example40_CardStyle() {
  return (
    <div className="overflow-hidden rounded-xl shadow-lg bg-white">
      <OptimizedImage
        src={sampleImages.nature}
        alt="Card header image"
        width={400}
        height={200}
        fit="cover"
      />
      <div className="p-4">
        <h3 className="font-bold">Mountain View</h3>
        <p className="text-gray-600 text-sm">Breathtaking scenery</p>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 3: AVATAR IMAGE EXAMPLES (41-55)
// ============================================================================

// Example 41: Basic avatar
export function Example41_BasicAvatar() {
  return (
    <AvatarImage
      src={sampleImages.person1}
      alt="John Doe"
      size="md"
    />
  );
}

// Example 42: Extra small avatar
export function Example42_XSAvatar() {
  return (
    <AvatarImage
      src={sampleImages.person2}
      alt="Jane Smith"
      size="xs"
    />
  );
}

// Example 43: Small avatar
export function Example43_SmallAvatar() {
  return (
    <AvatarImage
      src={sampleImages.person3}
      alt="Bob Johnson"
      size="sm"
    />
  );
}

// Example 44: Large avatar
export function Example44_LargeAvatar() {
  return (
    <AvatarImage
      src={sampleImages.person4}
      alt="Alice Brown"
      size="lg"
    />
  );
}

// Example 45: Extra large avatar
export function Example45_XLAvatar() {
  return (
    <AvatarImage
      src={sampleImages.person5}
      alt="Charlie Wilson"
      size="xl"
    />
  );
}

// Example 46: 2XL avatar
export function Example46_2XLAvatar() {
  return (
    <AvatarImage
      src={sampleImages.person1}
      alt="Profile picture"
      size="2xl"
    />
  );
}

// Example 47: 3XL avatar (profile hero)
export function Example47_3XLAvatar() {
  return (
    <AvatarImage
      src={sampleImages.person2}
      alt="Hero profile"
      size="3xl"
    />
  );
}

// Example 48: Avatar with ring
export function Example48_AvatarWithRing() {
  return (
    <AvatarImage
      src={sampleImages.person3}
      alt="User with ring"
      size="lg"
      ring={true}
      ringColor="ring-blue-500"
    />
  );
}

// Example 49: Avatar with thin ring
export function Example49_ThinRing() {
  return (
    <AvatarImage
      src={sampleImages.person4}
      alt="Thin ring avatar"
      size="lg"
      ring={true}
      ringWidth="thin"
    />
  );
}

// Example 50: Avatar with thick ring
export function Example50_ThickRing() {
  return (
    <AvatarImage
      src={sampleImages.person5}
      alt="Thick ring avatar"
      size="lg"
      ring={true}
      ringWidth="thick"
      ringColor="ring-purple-500"
    />
  );
}

// Example 51: Online status
export function Example51_OnlineStatus() {
  return (
    <AvatarImage
      src={sampleImages.person1}
      alt="Online user"
      size="lg"
      status="online"
    />
  );
}

// Example 52: Offline status
export function Example52_OfflineStatus() {
  return (
    <AvatarImage
      src={sampleImages.person2}
      alt="Offline user"
      size="lg"
      status="offline"
    />
  );
}

// Example 53: Away status
export function Example53_AwayStatus() {
  return (
    <AvatarImage
      src={sampleImages.person3}
      alt="Away user"
      size="lg"
      status="away"
    />
  );
}

// Example 54: Busy status
export function Example54_BusyStatus() {
  return (
    <AvatarImage
      src={sampleImages.person4}
      alt="Busy user"
      size="lg"
      status="busy"
    />
  );
}

// Example 55: Do not disturb status
export function Example55_DNDStatus() {
  return (
    <AvatarImage
      src={sampleImages.person5}
      alt="DND user"
      size="lg"
      status="dnd"
    />
  );
}

// ============================================================================
// SECTION 4: AVATAR ADVANCED & GROUPS (56-65)
// ============================================================================

// Example 56: Status top-right position
export function Example56_StatusTopRight() {
  return (
    <AvatarImage
      src={sampleImages.person1}
      alt="Status top-right"
      size="xl"
      status="online"
      statusPosition="top-right"
    />
  );
}

// Example 57: Status top-left position
export function Example57_StatusTopLeft() {
  return (
    <AvatarImage
      src={sampleImages.person2}
      alt="Status top-left"
      size="xl"
      status="online"
      statusPosition="top-left"
    />
  );
}

// Example 58: Status bottom-left position
export function Example58_StatusBottomLeft() {
  return (
    <AvatarImage
      src={sampleImages.person3}
      alt="Status bottom-left"
      size="xl"
      status="online"
      statusPosition="bottom-left"
    />
  );
}

// Example 59: Avatar with badge
export function Example59_AvatarWithBadge() {
  return (
    <AvatarImage
      src={sampleImages.person4}
      alt="User with notification"
      size="lg"
      badge={
        <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          3
        </span>
      }
    />
  );
}

// Example 60: Avatar with verified badge
export function Example60_VerifiedBadge() {
  return (
    <AvatarImage
      src={sampleImages.person5}
      alt="Verified user"
      size="lg"
      badge={
        <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
          ✓
        </span>
      }
    />
  );
}

// Example 61: Clickable avatar
export function Example61_ClickableAvatar() {
  return (
    <AvatarImage
      src={sampleImages.person1}
      alt="Clickable profile"
      size="lg"
      onClick={() => alert("Avatar clicked!")}
      className="cursor-pointer hover:opacity-80 transition-opacity"
    />
  );
}

// Example 62: Avatar fallback (broken image)
export function Example62_AvatarFallback() {
  return (
    <AvatarImage
      src="https://invalid-url.com/avatar.jpg"
      alt="John Doe"
      size="lg"
      fallback="JD"
    />
  );
}

// Example 63: Custom fallback background
export function Example63_CustomFallbackBg() {
  return (
    <AvatarImage
      src="https://invalid-url.com/avatar.jpg"
      alt="Alice Smith"
      size="lg"
      fallback="AS"
      fallbackBg="bg-gradient-to-br from-green-400 to-blue-500"
    />
  );
}

// Example 64: Basic avatar group
export function Example64_AvatarGroup() {
  const avatars = [
    { src: sampleImages.person1, alt: "User 1" },
    { src: sampleImages.person2, alt: "User 2" },
    { src: sampleImages.person3, alt: "User 3" },
    { src: sampleImages.person4, alt: "User 4" },
    { src: sampleImages.person5, alt: "User 5" },
  ];

  return <AvatarGroup avatars={avatars} max={4} size="md" />;
}

// Example 65: Large avatar group
export function Example65_LargeAvatarGroup() {
  const avatars = [
    { src: sampleImages.person1, alt: "Team member 1" },
    { src: sampleImages.person2, alt: "Team member 2" },
    { src: sampleImages.person3, alt: "Team member 3" },
    { src: sampleImages.person4, alt: "Team member 4" },
    { src: sampleImages.person5, alt: "Team member 5" },
    { src: sampleImages.person1, alt: "Team member 6" },
    { src: sampleImages.person2, alt: "Team member 7" },
  ];

  return (
    <AvatarGroup
      avatars={avatars}
      max={3}
      size="lg"
      onOverflowClick={() => alert("Show all team members")}
    />
  );
}

// ============================================================================
// SECTION 5: GALLERY IMAGE EXAMPLES (66-75)
// ============================================================================

// Example 66: Basic gallery image
export function Example66_BasicGallery() {
  return (
    <GalleryImage
      src={sampleImages.nature}
      alt="Mountain gallery"
      width={400}
      height={300}
    />
  );
}

// Example 67: Gallery with caption
export function Example67_GalleryCaption() {
  return (
    <GalleryImage
      src={sampleImages.sunset}
      alt="Sunset photography"
      width={400}
      height={300}
      caption="Golden hour at the beach"
    />
  );
}

// Example 68: Gallery without lightbox
export function Example68_NoLightbox() {
  return (
    <GalleryImage
      src={sampleImages.city}
      alt="City at night"
      width={400}
      height={300}
      lightbox={false}
    />
  );
}

// Example 69: Gallery grid
export function Example69_GalleryGrid() {
  const images = [
    { src: sampleImages.nature, alt: "Nature" },
    { src: sampleImages.ocean, alt: "Ocean" },
    { src: sampleImages.forest, alt: "Forest" },
    { src: sampleImages.mountain, alt: "Mountain" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((img, i) => (
        <GalleryImage
          key={i}
          src={img.src}
          alt={img.alt}
          width={300}
          height={200}
          index={i}
        />
      ))}
    </div>
  );
}

// Example 70: Gallery with group
export function Example70_GalleryGrouped() {
  return (
    <GalleryImage
      src={sampleImages.architecture}
      alt="Modern building"
      width={400}
      height={300}
      group="buildings"
      caption="Contemporary architecture"
    />
  );
}

// Example 71: Gallery thumbnail mode
export function Example71_GalleryThumbnail() {
  return (
    <GalleryImage
      src={sampleImages.food}
      alt="Delicious meal"
      width={150}
      height={150}
      thumbnail={true}
      className="rounded-lg"
    />
  );
}

// Example 72: Gallery with blur placeholder
export function Example72_GalleryBlur() {
  return (
    <GalleryImage
      src={sampleImages.abstract}
      alt="Abstract art"
      width={400}
      height={300}
      placeholder="blur"
    />
  );
}

// Example 73: Large gallery image
export function Example73_LargeGallery() {
  return (
    <GalleryImage
      src={sampleImages.ocean}
      alt="Ocean panorama"
      width={800}
      height={400}
      caption="Pacific Ocean sunset panorama"
    />
  );
}

// Example 74: Gallery with custom styling
export function Example74_StyledGallery() {
  return (
    <GalleryImage
      src={sampleImages.texture}
      alt="Texture pattern"
      width={400}
      height={400}
      className="rounded-xl shadow-2xl"
    />
  );
}

// Example 75: Gallery with onLightboxOpen
export function Example75_LightboxCallback() {
  return (
    <GalleryImage
      src={sampleImages.nature}
      alt="Mountain view"
      width={400}
      height={300}
      onLightboxOpen={(index) => console.log(`Opened image at index ${index}`)}
    />
  );
}

// ============================================================================
// SECTION 6: PRODUCT IMAGE EXAMPLES (76-82)
// ============================================================================

// Example 76: Basic product zoom
export function Example76_BasicProductZoom() {
  return (
    <ProductImage
      src={sampleImages.product}
      alt="Watch product"
      width={400}
      height={400}
    />
  );
}

// Example 77: High zoom scale
export function Example77_HighZoom() {
  return (
    <ProductImage
      src={sampleImages.product}
      alt="Watch detail"
      width={400}
      height={400}
      zoomScale={3}
    />
  );
}

// Example 78: Low zoom scale
export function Example78_LowZoom() {
  return (
    <ProductImage
      src={sampleImages.product}
      alt="Watch overview"
      width={400}
      height={400}
      zoomScale={1.5}
    />
  );
}

// Example 79: No zoom indicator
export function Example79_NoZoomIndicator() {
  return (
    <ProductImage
      src={sampleImages.product}
      alt="Clean product view"
      width={400}
      height={400}
      showZoomIndicator={false}
    />
  );
}

// Example 80: Zoom disabled
export function Example80_ZoomDisabled() {
  return (
    <ProductImage
      src={sampleImages.product}
      alt="Static product"
      width={400}
      height={400}
      zoomOnHover={false}
    />
  );
}

// Example 81: Product with rounded corners
export function Example81_RoundedProduct() {
  return (
    <ProductImage
      src={sampleImages.food}
      alt="Food product"
      width={300}
      height={300}
      className="rounded-2xl shadow-lg"
    />
  );
}

// Example 82: Product card style
export function Example82_ProductCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <ProductImage
        src={sampleImages.product}
        alt="Premium watch"
        width={400}
        height={400}
        zoomScale={2.5}
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">Premium Watch</h3>
        <p className="text-gray-600">$299.99</p>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 7: COMPARISON SLIDER EXAMPLES (83-88)
// ============================================================================

// Example 83: Basic comparison slider
export function Example83_BasicComparison() {
  return (
    <div className="w-150 h-100">
      <ComparisonSlider
        beforeImage={sampleImages.before}
        afterImage={sampleImages.after}
        alt="Before and after comparison"
      />
    </div>
  );
}

// Example 84: Custom default position
export function Example84_CustomPosition() {
  return (
    <div className="w-150 h-100">
      <ComparisonSlider
        beforeImage={sampleImages.forest}
        afterImage={sampleImages.sunset}
        alt="Day to night"
        defaultPosition={30}
      />
    </div>
  );
}

// Example 85: Without labels
export function Example85_NoLabels() {
  return (
    <div className="w-150 h-100">
      <ComparisonSlider
        beforeImage={sampleImages.nature}
        afterImage={sampleImages.ocean}
        alt="Landscape comparison"
        showLabels={false}
      />
    </div>
  );
}

// Example 86: Custom labels
export function Example86_CustomLabels() {
  return (
    <div className="w-150 h-100">
      <ComparisonSlider
        beforeImage={sampleImages.city}
        afterImage={sampleImages.architecture}
        alt="City transformation"
        beforeLabel="Original"
        afterLabel="Enhanced"
      />
    </div>
  );
}

// Example 87: Small comparison
export function Example87_SmallComparison() {
  return (
    <div className="w-75 h-50">
      <ComparisonSlider
        beforeImage={sampleImages.texture}
        afterImage={sampleImages.abstract}
        alt="Texture comparison"
        className="rounded-lg"
      />
    </div>
  );
}

// Example 88: Full-width comparison
export function Example88_FullWidthComparison() {
  return (
    <div className="w-full h-125">
      <ComparisonSlider
        beforeImage={sampleImages.mountain}
        afterImage={sampleImages.sunset}
        alt="Mountain at different times"
        beforeLabel="Morning"
        afterLabel="Evening"
      />
    </div>
  );
}

// ============================================================================
// SECTION 8: BACKGROUND IMAGE EXAMPLES (89-95)
// ============================================================================

// Example 89: Basic background image
export function Example89_BasicBackground() {
  return (
    <BackgroundImage
      src={sampleImages.abstract}
      minHeight="300px"
    >
      <div className="flex items-center justify-center h-full text-white">
        <h2 className="text-3xl font-bold">Hero Section</h2>
      </div>
    </BackgroundImage>
  );
}

// Example 90: Background with overlay
export function Example90_BackgroundOverlay() {
  return (
    <BackgroundImage
      src={sampleImages.city}
      minHeight="300px"
      overlay={true}
      overlayOpacity={0.6}
    >
      <div className="flex items-center justify-center h-full text-white p-8">
        <h2 className="text-4xl font-bold">City Nights</h2>
      </div>
    </BackgroundImage>
  );
}

// Example 91: Gradient overlay
export function Example91_GradientOverlay() {
  return (
    <BackgroundImage
      src={sampleImages.ocean}
      minHeight="300px"
      overlay={true}
      overlayGradient="to-t"
      overlayColor="#000"
    >
      <div className="flex items-end justify-center h-full text-white p-8">
        <h2 className="text-3xl font-bold">Ocean Views</h2>
      </div>
    </BackgroundImage>
  );
}

// Example 92: Blurred background
export function Example92_BlurredBackground() {
  return (
    <BackgroundImage
      src={sampleImages.nature}
      minHeight="300px"
      blur={8}
      overlay={true}
      overlayOpacity={0.3}
    >
      <div className="flex items-center justify-center h-full">
        <div className="bg-white/90 rounded-xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800">Content Card</h2>
          <p className="text-gray-600">With blurred background</p>
        </div>
      </div>
    </BackgroundImage>
  );
}

// Example 93: Parallax background
export function Example93_ParallaxBackground() {
  return (
    <BackgroundImage
      src={sampleImages.mountain}
      minHeight="400px"
      parallax={true}
      parallaxSpeed={0.3}
      overlay={true}
      overlayOpacity={0.4}
    >
      <div className="flex items-center justify-center h-full text-white">
        <h2 className="text-4xl font-bold">Parallax Effect</h2>
      </div>
    </BackgroundImage>
  );
}

// Example 94: Fixed background
export function Example94_FixedBackground() {
  return (
    <BackgroundImage
      src={sampleImages.sunset}
      minHeight="400px"
      fixed={true}
      overlay={true}
      overlayGradient="radial"
    >
      <div className="flex items-center justify-center h-full text-white">
        <h2 className="text-4xl font-bold">Fixed Background</h2>
      </div>
    </BackgroundImage>
  );
}

// Example 95: Background with contain fit
export function Example95_BackgroundContain() {
  return (
    <BackgroundImage
      src={sampleImages.product}
      minHeight="300px"
      fit="contain"
      className="bg-gray-100"
    >
      <div className="flex items-end justify-center h-full p-8">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Shop Now
        </button>
      </div>
    </BackgroundImage>
  );
}

// ============================================================================
// SECTION 9: PROGRESSIVE IMAGE EXAMPLES (96-100)
// ============================================================================

// Example 96: Basic progressive loading
export function Example96_BasicProgressive() {
  return (
    <ProgressiveImage
      src={sampleImages.nature}
      alt="Progressive mountain"
      width={400}
      height={300}
    />
  );
}

// Example 97: Progressive with low quality placeholder
export function Example97_LowQualityPlaceholder() {
  return (
    <ProgressiveImage
      src={sampleImages.ocean}
      alt="Ocean progressive"
      width={400}
      height={300}
      lowQualitySrc={`${sampleImages.ocean}&w=50&blur=10`}
    />
  );
}

// Example 98: Progressive without progress indicator
export function Example98_NoProgressIndicator() {
  return (
    <ProgressiveImage
      src={sampleImages.forest}
      alt="Forest progressive"
      width={400}
      height={300}
      showProgress={false}
    />
  );
}

// Example 99: Progressive with blur placeholder
export function Example99_ProgressiveBlur() {
  return (
    <ProgressiveImage
      src={sampleImages.sunset}
      alt="Sunset progressive"
      width={400}
      height={300}
      placeholder="blur"
      lowQualitySrc={`${sampleImages.sunset}&w=20`}
    />
  );
}

// Example 100: Large progressive hero
export function Example100_ProgressiveHero() {
  return (
    <ProgressiveImage
      src={sampleImages.abstract}
      alt="Hero progressive loading"
      width={800}
      height={400}
      lowQualitySrc={`${sampleImages.abstract}&w=80`}
      className="rounded-xl shadow-2xl"
    />
  );
}

// ============================================================================
// DEMO SHOWCASE COMPONENT
// ============================================================================

interface ExampleCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function ExampleCard({ title, description, children }: ExampleCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-bold text-lg text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="p-4 flex items-center justify-center min-h-50 bg-gray-50">
        {children}
      </div>
    </div>
  );
}

export default function ImageExamples100Demo() {
  const [section, setSection] = useState<string>("optimized-basic");

  const sections = [
    { id: "optimized-basic", label: "OptimizedImage Basic (1-20)" },
    { id: "optimized-advanced", label: "OptimizedImage Advanced (21-40)" },
    { id: "avatars", label: "Avatars (41-55)" },
    { id: "avatars-advanced", label: "Avatar Groups (56-65)" },
    { id: "gallery", label: "Gallery (66-75)" },
    { id: "product", label: "Product (76-82)" },
    { id: "comparison", label: "Comparison (83-88)" },
    { id: "background", label: "Background (89-95)" },
    { id: "progressive", label: "Progressive (96-100)" },
  ];

  return (
    <ImageConfigProvider config={{ defaultQuality: 85, enableBlurPlaceholder: true }}>
      <div className="min-h-screen bg-linear-to-br from-slate-100 to-blue-100 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              100 Image Component Examples
            </h1>
            <p className="text-gray-600">
              Comprehensive showcase of OptimizedImage and SpecializedImage components
            </p>
          </div>

          {/* Section Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  section === s.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Examples Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Section 1: Optimized Basic */}
            {section === "optimized-basic" && (
              <>
                <ExampleCard title="1. Basic Image" description="Simple image with dimensions">
                  <Example01_BasicImage />
                </ExampleCard>
                <ExampleCard title="2. Lazy Loading" description="Loads when entering viewport">
                  <Example02_LazyLoading />
                </ExampleCard>
                <ExampleCard title="3. Eager Loading" description="High priority for LCP">
                  <Example03_EagerLoading />
                </ExampleCard>
                <ExampleCard title="4. Blur Placeholder" description="Blurred preview while loading">
                  <Example04_BlurPlaceholder />
                </ExampleCard>
                <ExampleCard title="5. Shimmer Placeholder" description="Animated shimmer effect">
                  <Example05_ShimmerPlaceholder />
                </ExampleCard>
                <ExampleCard title="6. Color Placeholder" description="Solid color placeholder">
                  <Example06_ColorPlaceholder />
                </ExampleCard>
                <ExampleCard title="7. Skeleton Placeholder" description="Skeleton loading state">
                  <Example07_SkeletonPlaceholder />
                </ExampleCard>
                <ExampleCard title="8. Gradient Placeholder" description="Gradient loading effect">
                  <Example08_GradientPlaceholder />
                </ExampleCard>
                <ExampleCard title="9. Fill Container" description="Fills parent container">
                  <Example09_FillContainer />
                </ExampleCard>
                <ExampleCard title="10. Fit Contain" description="Maintains aspect ratio">
                  <Example10_FitContain />
                </ExampleCard>
                <ExampleCard title="11. Fit Cover" description="Covers entire area">
                  <Example11_FitCover />
                </ExampleCard>
                <ExampleCard title="12. Position Top" description="Object position top">
                  <Example12_PositionTop />
                </ExampleCard>
                <ExampleCard title="13. Position Bottom" description="Object position bottom">
                  <Example13_PositionBottom />
                </ExampleCard>
                <ExampleCard title="14. 16:9 Aspect Ratio" description="Widescreen ratio">
                  <Example14_AspectRatio />
                </ExampleCard>
                <ExampleCard title="15. Square Ratio" description="1:1 aspect ratio">
                  <Example15_SquareAspectRatio />
                </ExampleCard>
                <ExampleCard title="16. WebP Format" description="Modern WebP format">
                  <Example16_WebPFormat />
                </ExampleCard>
                <ExampleCard title="17. AVIF Format" description="Next-gen AVIF format">
                  <Example17_AVIFFormat />
                </ExampleCard>
                <ExampleCard title="18. Auto Format" description="Best format auto-detected">
                  <Example18_AutoFormat />
                </ExampleCard>
                <ExampleCard title="19. High Quality" description="95% quality setting">
                  <Example19_HighQuality />
                </ExampleCard>
                <ExampleCard title="20. Low Quality" description="50% for fast loading">
                  <Example20_LowQuality />
                </ExampleCard>
              </>
            )}

            {/* Section 2: Optimized Advanced */}
            {section === "optimized-advanced" && (
              <>
                <ExampleCard title="21. Fade-In Animation" description="500ms fade effect">
                  <Example21_FadeIn />
                </ExampleCard>
                <ExampleCard title="22. Slow Fade-In" description="1500ms fade effect">
                  <Example22_SlowFadeIn />
                </ExampleCard>
                <ExampleCard title="23. OnLoad Callback" description="Callback when loaded">
                  <Example23_OnLoadCallback />
                </ExampleCard>
                <ExampleCard title="24. Loading Complete" description="With load metrics">
                  <Example24_LoadingComplete />
                </ExampleCard>
                <ExampleCard title="25. Error Handling" description="Fallback on error">
                  <Example25_ErrorHandling />
                </ExampleCard>
                <ExampleCard title="26. Retry on Error" description="Auto-retry 3 times">
                  <Example26_RetryOnError />
                </ExampleCard>
                <ExampleCard title="27. Async Decoding" description="Non-blocking decode">
                  <Example27_AsyncDecoding />
                </ExampleCard>
                <ExampleCard title="28. Sync Decoding" description="Priority decode">
                  <Example28_SyncDecoding />
                </ExampleCard>
                <ExampleCard title="29. Custom SrcSet" description="Responsive sources">
                  <Example29_CustomSrcSet />
                </ExampleCard>
                <ExampleCard title="30. Custom Sizes" description="Responsive sizing">
                  <Example30_CustomSizes />
                </ExampleCard>
                <ExampleCard title="31. CORS Anonymous" description="Cross-origin setting">
                  <Example31_CORSAnonymous />
                </ExampleCard>
                <ExampleCard title="32. With Title" description="Tooltip on hover">
                  <Example32_WithTitle />
                </ExampleCard>
                <ExampleCard title="33. Non-Draggable" description="Prevents dragging">
                  <Example33_NonDraggable />
                </ExampleCard>
                <ExampleCard title="34. Presentation Role" description="Decorative image">
                  <Example34_PresentationRole />
                </ExampleCard>
                <ExampleCard title="35. Lazy Boundary" description="Custom load boundary">
                  <Example35_LazyBoundary />
                </ExampleCard>
                <ExampleCard title="36. Threshold" description="50% visibility trigger">
                  <Example36_IntersectionThreshold />
                </ExampleCard>
                <ExampleCard title="37. Unoptimized" description="Original quality">
                  <Example37_Unoptimized />
                </ExampleCard>
                <ExampleCard title="38. Referrer Policy" description="No referrer sent">
                  <Example38_ReferrerPolicy />
                </ExampleCard>
                <ExampleCard title="39. Rounded Shadow" description="Styled corners">
                  <Example39_RoundedShadow />
                </ExampleCard>
                <ExampleCard title="40. Card Style" description="Image in card layout">
                  <Example40_CardStyle />
                </ExampleCard>
              </>
            )}

            {/* Section 3: Avatars */}
            {section === "avatars" && (
              <>
                <ExampleCard title="41. Basic Avatar" description="Medium size default">
                  <Example41_BasicAvatar />
                </ExampleCard>
                <ExampleCard title="42. XS Avatar" description="Extra small 24px">
                  <Example42_XSAvatar />
                </ExampleCard>
                <ExampleCard title="43. Small Avatar" description="Small 32px">
                  <Example43_SmallAvatar />
                </ExampleCard>
                <ExampleCard title="44. Large Avatar" description="Large 48px">
                  <Example44_LargeAvatar />
                </ExampleCard>
                <ExampleCard title="45. XL Avatar" description="Extra large 64px">
                  <Example45_XLAvatar />
                </ExampleCard>
                <ExampleCard title="46. 2XL Avatar" description="96px size">
                  <Example46_2XLAvatar />
                </ExampleCard>
                <ExampleCard title="47. 3XL Avatar" description="128px hero size">
                  <Example47_3XLAvatar />
                </ExampleCard>
                <ExampleCard title="48. With Ring" description="Blue ring border">
                  <Example48_AvatarWithRing />
                </ExampleCard>
                <ExampleCard title="49. Thin Ring" description="1px ring width">
                  <Example49_ThinRing />
                </ExampleCard>
                <ExampleCard title="50. Thick Ring" description="4px purple ring">
                  <Example50_ThickRing />
                </ExampleCard>
                <ExampleCard title="51. Online Status" description="Green indicator">
                  <Example51_OnlineStatus />
                </ExampleCard>
                <ExampleCard title="52. Offline Status" description="Gray indicator">
                  <Example52_OfflineStatus />
                </ExampleCard>
                <ExampleCard title="53. Away Status" description="Yellow indicator">
                  <Example53_AwayStatus />
                </ExampleCard>
                <ExampleCard title="54. Busy Status" description="Red indicator">
                  <Example54_BusyStatus />
                </ExampleCard>
                <ExampleCard title="55. DND Status" description="Do not disturb">
                  <Example55_DNDStatus />
                </ExampleCard>
              </>
            )}

            {/* Section 4: Avatar Groups */}
            {section === "avatars-advanced" && (
              <>
                <ExampleCard title="56. Status Top-Right" description="Corner position">
                  <Example56_StatusTopRight />
                </ExampleCard>
                <ExampleCard title="57. Status Top-Left" description="Corner position">
                  <Example57_StatusTopLeft />
                </ExampleCard>
                <ExampleCard title="58. Status Bottom-Left" description="Corner position">
                  <Example58_StatusBottomLeft />
                </ExampleCard>
                <ExampleCard title="59. With Badge" description="Notification badge">
                  <Example59_AvatarWithBadge />
                </ExampleCard>
                <ExampleCard title="60. Verified Badge" description="Checkmark badge">
                  <Example60_VerifiedBadge />
                </ExampleCard>
                <ExampleCard title="61. Clickable" description="Interactive avatar">
                  <Example61_ClickableAvatar />
                </ExampleCard>
                <ExampleCard title="62. Fallback Initials" description="When image fails">
                  <Example62_AvatarFallback />
                </ExampleCard>
                <ExampleCard title="63. Custom Fallback BG" description="Green gradient">
                  <Example63_CustomFallbackBg />
                </ExampleCard>
                <ExampleCard title="64. Avatar Group" description="Overlapping avatars">
                  <Example64_AvatarGroup />
                </ExampleCard>
                <ExampleCard title="65. Large Group" description="With overflow count">
                  <Example65_LargeAvatarGroup />
                </ExampleCard>
              </>
            )}

            {/* Section 5: Gallery */}
            {section === "gallery" && (
              <>
                <ExampleCard title="66. Basic Gallery" description="Click to expand">
                  <Example66_BasicGallery />
                </ExampleCard>
                <ExampleCard title="67. With Caption" description="Text overlay">
                  <Example67_GalleryCaption />
                </ExampleCard>
                <ExampleCard title="68. No Lightbox" description="Disabled click">
                  <Example68_NoLightbox />
                </ExampleCard>
                <ExampleCard title="69. Gallery Grid" description="4 image grid">
                  <Example69_GalleryGrid />
                </ExampleCard>
                <ExampleCard title="70. Grouped Gallery" description="Same lightbox group">
                  <Example70_GalleryGrouped />
                </ExampleCard>
                <ExampleCard title="71. Thumbnail Mode" description="Small square">
                  <Example71_GalleryThumbnail />
                </ExampleCard>
                <ExampleCard title="72. Blur Placeholder" description="Loading effect">
                  <Example72_GalleryBlur />
                </ExampleCard>
                <ExampleCard title="73. Large Gallery" description="Wide format">
                  <Example73_LargeGallery />
                </ExampleCard>
                <ExampleCard title="74. Custom Styling" description="Rounded shadow">
                  <Example74_StyledGallery />
                </ExampleCard>
                <ExampleCard title="75. Lightbox Callback" description="Open event">
                  <Example75_LightboxCallback />
                </ExampleCard>
              </>
            )}

            {/* Section 6: Product */}
            {section === "product" && (
              <>
                <ExampleCard title="76. Basic Zoom" description="Hover to zoom">
                  <Example76_BasicProductZoom />
                </ExampleCard>
                <ExampleCard title="77. High Zoom (3x)" description="Extra magnification">
                  <Example77_HighZoom />
                </ExampleCard>
                <ExampleCard title="78. Low Zoom (1.5x)" description="Subtle zoom">
                  <Example78_LowZoom />
                </ExampleCard>
                <ExampleCard title="79. No Indicator" description="Hidden zoom hint">
                  <Example79_NoZoomIndicator />
                </ExampleCard>
                <ExampleCard title="80. Zoom Disabled" description="Static display">
                  <Example80_ZoomDisabled />
                </ExampleCard>
                <ExampleCard title="81. Rounded Product" description="Styled corners">
                  <Example81_RoundedProduct />
                </ExampleCard>
                <ExampleCard title="82. Product Card" description="E-commerce style">
                  <Example82_ProductCard />
                </ExampleCard>
              </>
            )}

            {/* Section 7: Comparison */}
            {section === "comparison" && (
              <>
                <ExampleCard title="83. Basic Slider" description="Drag to compare">
                  <Example83_BasicComparison />
                </ExampleCard>
                <ExampleCard title="84. Custom Position" description="30% default">
                  <Example84_CustomPosition />
                </ExampleCard>
                <ExampleCard title="85. No Labels" description="Clean interface">
                  <Example85_NoLabels />
                </ExampleCard>
                <ExampleCard title="86. Custom Labels" description="Original/Enhanced">
                  <Example86_CustomLabels />
                </ExampleCard>
                <ExampleCard title="87. Small Slider" description="Compact size">
                  <Example87_SmallComparison />
                </ExampleCard>
                <ExampleCard title="88. Full Width" description="Wide comparison">
                  <Example88_FullWidthComparison />
                </ExampleCard>
              </>
            )}

            {/* Section 8: Background */}
            {section === "background" && (
              <>
                <ExampleCard title="89. Basic Background" description="Hero section">
                  <Example89_BasicBackground />
                </ExampleCard>
                <ExampleCard title="90. With Overlay" description="Dark overlay">
                  <Example90_BackgroundOverlay />
                </ExampleCard>
                <ExampleCard title="91. Gradient Overlay" description="Fade to top">
                  <Example91_GradientOverlay />
                </ExampleCard>
                <ExampleCard title="92. Blurred BG" description="Content focus">
                  <Example92_BlurredBackground />
                </ExampleCard>
                <ExampleCard title="93. Parallax Effect" description="Scroll animation">
                  <Example93_ParallaxBackground />
                </ExampleCard>
                <ExampleCard title="94. Fixed Background" description="Stays in place">
                  <Example94_FixedBackground />
                </ExampleCard>
                <ExampleCard title="95. Contain Fit" description="Product showcase">
                  <Example95_BackgroundContain />
                </ExampleCard>
              </>
            )}

            {/* Section 9: Progressive */}
            {section === "progressive" && (
              <>
                <ExampleCard title="96. Basic Progressive" description="Shows progress">
                  <Example96_BasicProgressive />
                </ExampleCard>
                <ExampleCard title="97. Low Quality First" description="LQIP technique">
                  <Example97_LowQualityPlaceholder />
                </ExampleCard>
                <ExampleCard title="98. No Progress" description="Hidden indicator">
                  <Example98_NoProgressIndicator />
                </ExampleCard>
                <ExampleCard title="99. Blur First" description="Blur placeholder">
                  <Example99_ProgressiveBlur />
                </ExampleCard>
                <ExampleCard title="100. Hero Progressive" description="Large image">
                  <Example100_ProgressiveHero />
                </ExampleCard>
              </>
            )}
          </div>
        </div>
      </div>
    </ImageConfigProvider>
  );
}
