import React from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const ScrollBounceSection = ({ children }) => {
  const { scrollYProgress } = useViewportScroll();

  // Map scroll progress (0 to 1) to vertical translate (bounce up/down)
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1], // input range of scroll progress
    [20, -20, 20] // output translateY range in px (up/down bounce)
  );

  return (
    <motion.section style={{ y }} className="scroll-bounce-section">
      {children}
    </motion.section>
  );
};

export default ScrollBounceSection;
