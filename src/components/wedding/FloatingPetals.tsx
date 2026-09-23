import { useMemo } from "react";
import roseImg from "@/assets/rose.webp";

export function FloatingPetals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 18 + Math.random() * 18,
        size: 16 + Math.random() * 24, // Increased size for the rose images
        drift: `${(Math.random() - 0.5) * 200}px`,
        opacity: 0.6 + Math.random() * 0.4, // Higher opacity for images
        rotationStart: Math.random() * 360,
        rotationEnd: Math.random() * 360 + 360, // Spin while falling
        hueRotate: Math.random() * 360, // Random hue shift for different colors
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <img
          key={p.id}
          src={roseImg}
          alt=""
          className="animate-fall absolute top-0 block object-contain"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `-${p.delay}s`,
            opacity: p.opacity,
            ["--drift" as never]: p.drift,
          }}
        />
      ))}
    </div>
  );
}
