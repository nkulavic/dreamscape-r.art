"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  imageUrl: string;
  height?: string;
  overlayOpacity?: number;
  overlayColor?: "ocean" | "dark" | "coral" | "none";
  children?: React.ReactNode;
}

export default function ParallaxSection({
  imageUrl,
  height = "h-64 md:h-96",
  overlayOpacity = 0.4,
  overlayColor = "ocean",
  children,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const overlayClasses = {
    ocean: "bg-ocean-deep",
    dark: "bg-dark",
    coral: "bg-accent",
    none: "",
  };

  return (
    <section ref={ref} className={`relative ${height} overflow-hidden`}>
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </motion.div>

      {/* Overlay */}
      {overlayColor !== "none" && (
        <div
          className={`absolute inset-0 ${overlayClasses[overlayColor]}`}
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      {children && (
        <div className="relative z-10 h-full flex items-center justify-center">
          {children}
        </div>
      )}
    </section>
  );
}
