import React, { useState, useEffect } from "react";
import type { ImageBackground } from  "~/components/background/index";

// Image Background

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export function ImageBg({ config }: { config: ImageBackground }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!config.parallax) return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [config.parallax]);

  // In ImageBg
  useEffect(() => {
    preloadImage(config.src).catch(console.error);
  }, [config.src]);

  const parallaxOffset = config.parallax
    ? scrollY * (config.parallaxSpeed || 0.5)
    : 0;

  const positionClasses = {
    center: "bg-center",
    top: "bg-top",
    bottom: "bg-bottom",
    left: "bg-left",
    right: "bg-right",
  } as const;

  const sizeClasses = {
    cover: "bg-cover",
    contain: "bg-contain",
    auto: "bg-auto",
  } as const;

  return (
    <div
      className={`absolute inset-0 ${positionClasses[config.position as keyof typeof positionClasses] || "bg-center"} ${sizeClasses[config.size as keyof typeof sizeClasses] || "bg-cover"}`}
      style={{ backgroundImage: `url(${config.src})` }}
    />
  );
}
