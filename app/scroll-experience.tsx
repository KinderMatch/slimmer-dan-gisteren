"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    damping: 32,
    mass: 0.3,
    stiffness: 180,
  });

  return <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX }} />;
}
