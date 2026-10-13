"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [scaleX, setScaleX] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        setScaleX(height > 0 ? window.scrollY / height : 0);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div aria-hidden="true" className="scroll-progress" style={{ transform: `scaleX(${scaleX})` }} />;
}
