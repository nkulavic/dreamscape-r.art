"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface MuralImageCarouselProps {
  images: string[];
  title: string;
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

export default function MuralImageCarousel({
  images,
  title,
}: MuralImageCarouselProps) {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback(
    (newDirection: number) => {
      setActiveIndex(([prev]) => {
        const next = prev + newDirection;
        if (next < 0) return [images.length - 1, newDirection];
        if (next >= images.length) return [0, newDirection];
        return [next, newDirection];
      });
    },
    [images.length]
  );

  const goToSlide = (index: number) => {
    setActiveIndex(([prev]) => [index, index > prev ? 1 : -1]);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [isPaused, paginate, images.length]);

  if (images.length === 0) return null;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel viewport */}
      <div className="relative aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden bg-gray-100">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag={images.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIndex]}
              alt={`${title} — gallery image ${activeIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 900px"
              className="object-cover"
              priority={activeIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-800 hover:bg-white transition-colors shadow-md cursor-pointer"
            >
              <HiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-800 hover:bg-white transition-colors shadow-md cursor-pointer"
            >
              <HiChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Counter badge */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-heading">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIndex
                  ? "w-8 h-2 bg-accent"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
