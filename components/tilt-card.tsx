"use client";

import type React from "react";

import { type ReactNode, useRef, useEffect, useState } from "react";

export default function TiltCard({
  children,
  className = "",
  max = 10,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (isMobile) return; // Disable tilt effect on mobile

    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -2 * max;
    const ry = (px - 0.5) * 2 * max;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };

  const onLeave = () => {
    if (isMobile) return; // Disable tilt effect on mobile

    const el = ref.current!;
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div
      ref={ref}
      onMouseMove={isMobile ? undefined : onMove}
      onMouseLeave={isMobile ? undefined : onLeave}
      className={className}
      style={{
        transformStyle: isMobile ? "flat" : "preserve-3d",
        transition: isMobile ? "none" : "transform 180ms ease",
      }}
    >
      {children}
    </div>
  );
}
