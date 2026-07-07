import React, { useRef, useEffect } from "react";
import type { CanvasBackground } from "~/components/background/index";

export function ResizeCanvasBg({ config }: { config: CanvasBackground }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      config.renderer(ctx, frameRef.current++);
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [config]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
