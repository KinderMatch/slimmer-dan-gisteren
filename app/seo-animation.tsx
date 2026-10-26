"use client";

import { useEffect, useRef } from "react";

/** Load the animation only when visible; respect reduced-motion preferences. */
export function SeoAnimation() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) { video.pause(); return; }
      if (!video.getAttribute("src")) video.src = "/assets/seo-search.mp4";
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        void video.play().catch(() => {});
      }
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return <video ref={ref} width={480} height={360} poster="/assets/seo-search-poster.webp" muted playsInline loop controls preload="none" aria-label="Animatie van een zoekresultaat in Google" />;
}
