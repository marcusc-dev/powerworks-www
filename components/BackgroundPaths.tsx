'use client';

import React from "react";
import { motion } from "framer-motion";

interface PathProps {
  d: string;
  className?: string;
  delay?: number;
}

const FloatingPath: React.FC<PathProps> = ({ d, className, delay = 0 }) => {
  return (
    <motion.path
      d={d}
      stroke="currentColor"
      strokeWidth="0.5"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: 1,
        opacity: 1,
        pathOffset: [0, 1]
      }}
      transition={{
        pathLength: { duration: 2, delay, ease: "easeInOut" },
        opacity: { duration: 0.5, delay },
        pathOffset: { duration: 20, repeat: Infinity, ease: "linear", delay }
      }}
      className={className}
    />
  );
};

interface BackgroundPathsProps {
  className?: string;
}

const BackgroundPaths: React.FC<BackgroundPathsProps> = ({ className = "" }) => {
  const paths = [
    // Curved flowing lines
    "M-100 200 Q 200 100 400 200 T 800 200 T 1200 200 T 1600 200",
    "M-100 300 Q 300 200 500 300 T 900 300 T 1300 300 T 1700 300",
    "M-100 400 Q 250 350 450 400 T 850 400 T 1250 400 T 1650 400",
    "M-100 150 Q 150 50 350 150 T 750 150 T 1150 150 T 1550 150",
    "M-100 500 Q 200 450 400 500 T 800 500 T 1200 500 T 1600 500",
    // Diagonal sweeping lines
    "M-50 600 Q 400 300 800 350 T 1600 100",
    "M1700 600 Q 1200 400 800 450 T 0 200",
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1600 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        <g className="text-white/10">
          {paths.map((d, index) => (
            <FloatingPath
              key={index}
              d={d}
              delay={index * 0.3}
              className="stroke-white/10"
            />
          ))}
        </g>

        {/* Additional subtle glow paths */}
        <g className="text-white/5">
          {paths.slice(0, 3).map((d, index) => (
            <motion.path
              key={`glow-${index}`}
              d={d}
              stroke="url(#pathGradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default BackgroundPaths;
