import React, { useState, useRef, useEffect } from "react";
import type { ImageBackground } from "~/components/background/index";

export function LazyImageBg({ config }: { config: ImageBackground }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01 },
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      className="absolute inset-0 bg-center bg-cover"
      style={{
        backgroundImage: isLoaded ? `url(${config.src})` : undefined,
        backgroundColor: "#1e293b", // Placeholder
      }}
    />
  );
}
