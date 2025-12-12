'use client';

import React from "react";
import { motion } from "framer-motion";

interface ShimmerTextProps {
  text: string;
  className?: string;
}

const ShimmerText: React.FC<ShimmerTextProps> = ({
  text,
  className = "",
}) => {
  return (
    <motion.span
      className={`bg-gradient-to-r from-white via-gray-300 to-white bg-[length:200%_100%] bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ["200% center", "-200% center"],
      }}
      transition={{
        duration: 3,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {text}
    </motion.span>
  );
};

export default ShimmerText;
