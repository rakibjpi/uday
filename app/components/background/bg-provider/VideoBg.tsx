import React, { useRef, useEffect } from "react";
import type { VideoBackground } from "~/components/background/index";

// Video Background

export const useThrottledFrame = (fps: number = 60) => {
  const frameInterval = 1000 / fps;
  const lastFrameTime = useRef(0);
  const shouldRender = useRef(true);

  useEffect(() => {
    const checkFrame = () => {
      const now = performance.now();
      if (now - lastFrameTime.current >= frameInterval) {
        shouldRender.current = true;
        lastFrameTime.current = now;
      }
      requestAnimationFrame(checkFrame);
    };
    checkFrame();
  }, [frameInterval]);

  return shouldRender;
};

export function VideoBg({ config }: { config: VideoBackground }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      src={config.src}
      poster={config.poster}
      loop
      muted
      playsInline
      autoPlay
    />
  );
}
