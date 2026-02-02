"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ParallaxHero from "../components/ui/ParallaxHero";
import { murals, Mural } from "../data/murals";

type CategoryFilter = "all" | Mural["category"];

const categories: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All Work" },
  { value: "commercial", label: "Commercial" },
  { value: "community", label: "Community" },
  { value: "education", label: "Education" },
  { value: "international", label: "International" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  const filteredMurals =
    activeFilter === "all"
      ? murals
      : murals.filter((mural) => mural.category === activeFilter);

  return (
    <>
      <Header variant="transparent" />

      <main>
        {/* Hero Section */}
        <ParallaxHero
          imageUrl="/images/murals/la-rumba-denver.jpg"
          title="PORTFOLIO"
          subtitle="Selected Works"
          description="Transforming spaces across the United States and internationally with vibrant, community-driven murals."
          height="80vh"
          overlayIntensity="medium"
        />

        {/* Portfolio Grid Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Filter Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap justify-center gap-3 mb-16"
            >
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setActiveFilter(category.value)}
                  className={`px-6 py-3 rounded-full font-heading text-sm tracking-wide uppercase transition-all duration-300 ${
                    activeFilter === category.value
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>

            {/* Murals Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredMurals.map((mural) => (
                  <motion.div
                    key={mural.id}
                    variants={fadeInUp}
                    layout
                    className="group"
                  >
                    <Link href={`/portfolio/${mural.slug}`}>
                      <div className="card overflow-hidden">
                        <div className="aspect-[4/3] relative image-zoom bg-gray-200">
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ocean-deep/90 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Image */}
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{
                              backgroundImage: `url(${mural.images.hero})`,
                              backgroundColor: "#e5e7eb",
                            }}
                          />

                          {/* Hover Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <span className="text-accent-light text-sm font-heading uppercase tracking-wide">
                              {mural.category}
                            </span>
                            {mural.dimensions && (
                              <span className="text-white/70 text-sm ml-3">
                                {mural.dimensions.size} {mural.dimensions.unit}
                              </span>
                            )}
                          </div>

                          {/* Year Badge */}
                          <div className="absolute top-4 right-4 z-20 bg-ocean-deep/80 text-white px-3 py-1 rounded-full text-sm font-heading">
                            {mural.year}
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="font-heading font-bold text-xl text-gray-800 mb-2 group-hover:text-accent transition-colors">
                            {mural.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {mural.location.venue
                              ? `${mural.location.venue}, `
                              : ""}
                            {mural.location.city},{" "}
                            {mural.location.state || mural.location.country}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredMurals.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-gray-500 text-lg">
                  No murals found in this category.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-ocean-deep text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-h1 mb-6 text-white">
                READY TO START YOUR PROJECT?
              </h2>
              <p className="text-xl text-ocean-pale mb-10 max-w-2xl mx-auto">
                Every mural begins with a conversation. Let&apos;s discuss your
                vision and create something extraordinary together.
              </p>
              <Link href="/contact" className="btn-primary">
                Start a Conversation
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
