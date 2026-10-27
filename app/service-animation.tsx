"use client";

import { useEffect, useRef } from "react";

/** Decorative animation inside a labelled service link; the poster is the fallback. */
export function ServiceAnimation({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      if (!visible || motion.matches || document.hidden) { video.pause(); return; }
      if (!video.getAttribute("src")) video.src = src;
      void video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(video);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); motion.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, [src]);
  return <video ref={ref} poster={poster} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />;
}
