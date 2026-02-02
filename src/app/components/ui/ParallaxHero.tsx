"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

interface ParallaxHeroProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  height?: "full" | "90vh" | "80vh" | "70vh";
  overlayIntensity?: "light" | "medium" | "heavy";
}

export default function ParallaxHero({
  imageUrl,
  title,
  subtitle,
  description,
  ctaPrimary,
  ctaSecondary,
  height = "full",
  overlayIntensity = "medium",
}: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const heightClasses = {
    full: "min-h-screen",
    "90vh": "min-h-[90vh]",
    "80vh": "min-h-[80vh]",
    "70vh": "min-h-[70vh]",
  };

  const overlayGradients = {
    light:
      "linear-gradient(180deg, rgba(10, 36, 99, 0.3) 0%, rgba(10, 36, 99, 0.1) 40%, rgba(10, 36, 99, 0.4) 100%)",
    medium:
      "linear-gradient(180deg, rgba(10, 36, 99, 0.6) 0%, rgba(10, 36, 99, 0.3) 40%, rgba(10, 36, 99, 0.7) 100%)",
    heavy:
      "linear-gradient(180deg, rgba(10, 36, 99, 0.8) 0%, rgba(10, 36, 99, 0.5) 40%, rgba(10, 36, 99, 0.9) 100%)",
  };

  return (
    <section
      ref={ref}
      className={`relative ${heightClasses[height]} overflow-hidden flex items-center justify-center`}
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: overlayGradients[overlayIntensity] }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white"
      >
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-accent-light text-lg md:text-xl tracking-widest uppercase mb-4"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-display mb-6"
          style={{
            color: "#ffffff",
            textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.9)"
          }}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-body text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {(ctaPrimary || ctaSecondary) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {ctaPrimary && (
              <Link href={ctaPrimary.href} className="btn-primary">
                {ctaPrimary.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link href={ctaSecondary.href} className="btn-secondary">
                {ctaSecondary.label}
              </Link>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
