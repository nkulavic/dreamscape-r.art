"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ParallaxHero from "./components/ui/ParallaxHero";
import ParallaxSection from "./components/ui/ParallaxSection";
import VideoPlayer from "./components/ui/VideoPlayer";
import type { Mural, Client, Video } from "@/db/dal";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Each mural position rotates at a different interval for organic feel
const ROTATION_INTERVALS = [7000, 9000, 11000]; // 7s, 9s, 11s

export default function Home({
  featuredMurals: initialMurals,
  featuredClients,
  featuredVideos,
}: {
  featuredMurals: Mural[];
  featuredClients: Client[];
  featuredVideos: Video[];
}) {
  const [featuredMurals, setFeaturedMurals] = useState<Mural[]>(initialMurals);
  const [rotatingIndex, setRotatingIndex] = useState<number | null>(null);
  const [allFeaturedMurals, setAllFeaturedMurals] = useState<Mural[]>([]);
  const [usedMuralIds, setUsedMuralIds] = useState<Set<string>>(
    new Set(initialMurals.map(m => m.id))
  );

  // Fetch all featured murals once on mount
  useEffect(() => {
    async function fetchAllMurals() {
      try {
        const response = await fetch("/api/featured/murals?all=true");
        if (response.ok) {
          const murals = await response.json();
          setAllFeaturedMurals(murals);
        }
      } catch (error) {
        console.error("Failed to fetch all featured murals:", error);
      }
    }
    fetchAllMurals();
  }, []);

  // Set up independent rotation timers for each mural position
  useEffect(() => {
    if (allFeaturedMurals.length === 0) return;

    const intervals = ROTATION_INTERVALS.map((interval, index) => {
      return setInterval(() => {
        setRotatingIndex(index);

        // Get murals that aren't currently displayed
        const currentIds = featuredMurals.map(m => m.id);
        const availableMurals = allFeaturedMurals.filter(
          mural => !currentIds.includes(mural.id)
        );

        if (availableMurals.length === 0) {
          // If all murals have been used, reset the pool
          setUsedMuralIds(new Set(currentIds));
          return;
        }

        // Pick a random mural from available ones
        const randomMural = availableMurals[
          Math.floor(Math.random() * availableMurals.length)
        ];

        // Fade out, then update just this position
        setTimeout(() => {
          setFeaturedMurals(prev => {
            const updated = [...prev];
            updated[index] = randomMural;
            return updated;
          });
          setUsedMuralIds(prev => new Set([...prev, randomMural.id]));
          setRotatingIndex(null);
        }, 500);
      }, interval);
    });

    return () => intervals.forEach(clearInterval);
  }, [allFeaturedMurals, featuredMurals]);
  return (
    <>
      <Header variant="transparent" />

      <main>
        {/* Hero Section */}
        <ParallaxHero
          imageUrl="/images/murals/protect-your-peace.jpg"
          title="DREAMSCAPER"
          subtitle="Rachel Dinda • Professional Muralist"
          description="Transforming spaces with vibrant, large-scale murals. Guided by community, inspired by culture."
          ctaPrimary={{ label: "View Portfolio", href: "/portfolio" }}
          ctaSecondary={{ label: "Commission a Mural", href: "/contact" }}
          height="full"
          overlayIntensity="medium"
        />

        {/* Featured Work Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.p
                variants={fadeInUp}
                className="font-heading text-accent text-sm tracking-widest uppercase mb-4"
              >
                Selected Work
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-h1 text-gray-800"
              >
                FEATURED MURALS
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMurals.map((mural, index) => (
                <AnimatePresence mode="wait" key={`position-${index}`}>
                  <motion.div
                    key={mural.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: rotatingIndex === index ? 0 : 1,
                      y: rotatingIndex === index ? -20 : 0
                    }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="group"
                  >
                    <Link href={`/portfolio/${mural.slug}`}>
                      <div className="card overflow-hidden">
                        <div className="aspect-[4/3] relative image-zoom bg-gray-200">
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ocean-deep/80 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{
                              backgroundImage: `url(${mural.images.hero})`,
                              backgroundColor: "#e5e7eb",
                            }}
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <span className="text-accent-light text-sm font-heading uppercase tracking-wide">
                              {mural.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-heading font-bold text-xl text-gray-800 mb-2">
                            {mural.title}
                          </h3>
                          <p className="text-gray-600">
                            {mural.location.venue ? `${mural.location.venue}, ` : ""}
                            {mural.location.city}, {mural.location.state || mural.location.country}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <Link href="/portfolio" className="btn-outline">
                View All Work
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Parallax Divider */}
        <ParallaxSection
          imageUrl="/images/murals/molson-coors-brewery.jpg"
          height="h-80 md:h-96"
          overlayColor="ocean"
          overlayOpacity={0.5}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center text-white px-6"
          >
            <p className="font-display text-3xl md:text-5xl mb-4">
              &ldquo;ART IS A PERSONAL EXPRESSION OF FREEDOM&rdquo;
            </p>
            <p className="font-heading text-lg text-white/80">
              — Rachel Dinda
            </p>
          </motion.div>
        </ParallaxSection>

        {/* About Preview Section */}
        <section className="py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url(/images/murals/vw-bus-artist.jpg)",
                      backgroundColor: "#e5e7eb",
                    }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.p
                  variants={fadeInUp}
                  className="font-heading text-accent text-sm tracking-widest uppercase mb-4"
                >
                  About the Artist
                </motion.p>
                <motion.h2
                  variants={fadeInUp}
                  className="font-display text-h2 text-gray-800 mb-6"
                >
                  GUIDED BY COMMUNITY, INSPIRED BY CULTURE
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-body-lg text-gray-600 mb-6"
                >
                  With over a decade of experience, Rachel Dinda transforms
                  ordinary spaces into extraordinary visual narratives. Her
                  murals breathe life into communities, schools, and businesses
                  across the United States and internationally.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="text-body-lg text-gray-600 mb-8"
                >
                  OSHA lift certified and professionally insured, Rachel brings
                  both artistic vision and technical expertise to every project.
                  Her work has been featured in galleries from Denver to Bristol,
                  UK, and has earned recognition from organizations like FOX31
                  and Voyage Denver Magazine.
                </motion.p>
                <motion.div variants={fadeInUp}>
                  <Link href="/about" className="btn-primary">
                    Read Full Story
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Video Showcase Section */}
        <section className="py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.p
                variants={fadeInUp}
                className="font-heading text-accent text-sm tracking-widest uppercase mb-4"
              >
                Behind the Scenes
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-h1 text-white mb-4"
              >
                WATCH THE PROCESS
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-gray-400 text-lg max-w-2xl mx-auto"
              >
                From blank walls to stunning murals—see how the magic happens.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {featuredVideos.map((video) => (
                <motion.div key={video.id} variants={fadeInUp}>
                  <VideoPlayer
                    src={video.src}
                    poster={video.poster}
                    title={video.title}
                    className="aspect-video"
                  />
                  <div className="mt-4">
                    <span className="text-accent text-xs font-heading uppercase tracking-wide">
                      {video.category} • {video.duration}
                    </span>
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.p
                variants={fadeInUp}
                className="font-heading text-gray-600 text-sm tracking-widest uppercase"
              >
                Trusted by Organizations Nationwide
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
            >
              {featuredClients.map((client) => (
                <motion.div
                  key={client.id}
                  variants={fadeInUp}
                  className="text-gray-400 font-heading font-semibold text-lg md:text-xl hover:text-ocean transition-colors"
                >
                  {client.name}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-24 bg-ocean-deep text-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.p
                variants={fadeInUp}
                className="font-heading text-accent-light text-sm tracking-widest uppercase mb-4"
              >
                Commission Process
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-h1 text-white mb-6"
              >
                LET&apos;S CREATE TOGETHER
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-ocean-pale max-w-2xl mx-auto"
              >
                From concept to completion, every mural begins with your vision.
                Here&apos;s how we bring it to life.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description:
                    "We discuss your vision, space, and goals. I learn about your community and what story you want to tell.",
                },
                {
                  step: "02",
                  title: "Design",
                  description:
                    "I create custom concepts and digital mockups, refining the design until it perfectly captures your vision.",
                },
                {
                  step: "03",
                  title: "Creation",
                  description:
                    "Watch your mural come to life. I handle all logistics, from wall preparation to the final brushstroke.",
                },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  variants={fadeInUp}
                  className="text-center p-8"
                >
                  <div className="font-display text-6xl text-accent mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-4 text-white">
                    {item.title}
                  </h3>
                  <p className="text-ocean-pale">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <Link href="/services" className="btn-secondary">
                Learn More About Services
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <ParallaxSection
          imageUrl="/images/murals/hawaii-navigate-current.jpg"
          height="h-[60vh]"
          overlayColor="dark"
          overlayOpacity={0.6}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center text-white px-6 max-w-4xl"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-display text-h1 md:text-display mb-6 text-white"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
            >
              READY TO TRANSFORM YOUR SPACE?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            >
              Books are open for commissions, collaborations, and creative
              projects throughout 2025. Let&apos;s create something extraordinary
              together.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/contact" className="btn-primary">
                Start a Conversation
              </Link>
              <Link href="/portfolio" className="btn-secondary">
                Explore the Portfolio
              </Link>
            </motion.div>
          </motion.div>
        </ParallaxSection>
      </main>

      <Footer />
    </>
  );
}
