"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowLeft, HiArrowRight, HiLocationMarker, HiCalendar, HiTag, HiPlay, HiPhotograph } from "react-icons/hi";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ParallaxHero from "../../components/ui/ParallaxHero";
import VideoPlayer from "../../components/ui/VideoPlayer";
import MuralImageCarousel from "../../components/ui/MuralImageCarousel";
import type { Mural } from "@/db/dal";

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

interface MuralNav {
  slug: string;
  title: string;
}

export default function MuralDetailClient({
  mural,
  relatedMurals,
  prevMural,
  nextMural,
}: {
  mural: Mural;
  relatedMurals: Mural[];
  prevMural: MuralNav;
  nextMural: MuralNav;
}) {
  const locationString = [
    mural.location.venue,
    mural.location.city,
    mural.location.state,
    mural.location.country !== "USA" ? mural.location.country : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <Header variant="transparent" />

      <main>
        {/* Hero */}
        <ParallaxHero
          imageUrl={mural.images.hero || "/images/murals/protect-your-peace.jpg"}
          title={mural.title.toUpperCase()}
          subtitle={locationString}
          height="80vh"
          overlayIntensity="medium"
        />

        {/* Back Button */}
        <div className="bg-white py-6 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-accent transition-colors"
            >
              <HiArrowLeft className="w-5 h-5" />
              <span className="font-heading">Back to Portfolio</span>
            </Link>
          </div>
        </div>

        {/* Mural Details */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="lg:col-span-2"
              >
                <motion.div variants={fadeInUp}>
                  <p className="font-heading text-accent text-sm tracking-widest uppercase mb-4">
                    {mural.category} Project • {mural.year}
                  </p>
                  <h1 className="font-display text-h1 text-gray-800 mb-6">
                    {mural.title.toUpperCase()}
                  </h1>
                  <p className="text-body-lg text-gray-600 mb-8">
                    {mural.description}
                  </p>
                </motion.div>

                {/* Gallery */}
                {mural.images.gallery.length > 0 && (
                  <motion.div variants={fadeInUp} className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <HiPhotograph className="w-5 h-5 text-accent" />
                      <h2 className="font-heading font-bold text-xl text-gray-800">
                        Gallery
                      </h2>
                    </div>
                    <MuralImageCarousel
                      images={mural.images.gallery}
                      title={mural.title}
                    />
                  </motion.div>
                )}

                {/* Artist's Note */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-cream rounded-2xl p-8 mb-8"
                >
                  <h2 className="font-heading font-bold text-xl text-gray-800 mb-4">
                    Artist&apos;s Note
                  </h2>
                  <p className="text-gray-700 italic leading-relaxed">
                    &ldquo;{mural.artistNote}&rdquo;
                  </p>
                  <p className="text-accent font-heading mt-4">— Rachel Dinda</p>
                </motion.div>

                {/* Inspiration */}
                {mural.inspiration && (
                  <motion.div variants={fadeInUp} className="mb-8">
                    <h2 className="font-heading font-bold text-xl text-gray-800 mb-4">
                      Inspiration
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {mural.inspiration}
                    </p>
                  </motion.div>
                )}

                {/* Process */}
                {mural.process && (
                  <motion.div variants={fadeInUp} className="mb-8">
                    <h2 className="font-heading font-bold text-xl text-gray-800 mb-4">
                      The Process
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {mural.process}
                    </p>
                  </motion.div>
                )}

                {/* Impact */}
                {mural.impact && (
                  <motion.div variants={fadeInUp}>
                    <h2 className="font-heading font-bold text-xl text-gray-800 mb-4">
                      Community Impact
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {mural.impact}
                    </p>
                  </motion.div>
                )}

                {/* Video */}
                {mural.video && (
                  <motion.div variants={fadeInUp} className="mt-8">
                    <div className="flex items-center gap-2 mb-4">
                      <HiPlay className="w-5 h-5 text-accent" />
                      <h2 className="font-heading font-bold text-xl text-gray-800">
                        Watch the Process
                      </h2>
                    </div>
                    <VideoPlayer
                      src={mural.video}
                      poster={mural.images.hero}
                      title={mural.title}
                      className="aspect-video"
                    />
                  </motion.div>
                )}

              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-gray-50 rounded-2xl p-8 sticky top-24">
                  <h3 className="font-heading font-bold text-lg text-gray-800 mb-6">
                    Project Details
                  </h3>

                  <div className="space-y-4">
                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <HiLocationMarker className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-heading text-gray-800">
                          {locationString}
                        </p>
                      </div>
                    </div>

                    {/* Year */}
                    <div className="flex items-start gap-3">
                      <HiCalendar className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Year</p>
                        <p className="font-heading text-gray-800">{mural.year}</p>
                      </div>
                    </div>

                    {/* Dimensions */}
                    {mural.dimensions && (
                      <div className="flex items-start gap-3">
                        <HiTag className="w-5 h-5 text-accent mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Size</p>
                          <p className="font-heading text-gray-800">
                            {mural.dimensions.size} {mural.dimensions.unit}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Client */}
                    {mural.client && (
                      <div className="flex items-start gap-3">
                        <HiTag className="w-5 h-5 text-accent mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Client</p>
                          <p className="font-heading text-gray-800">
                            {mural.client}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-3">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {mural.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/portfolio?tag=${encodeURIComponent(tag)}`}
                          className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 hover:bg-accent hover:text-white transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-gray-600 text-sm mb-4">
                      Interested in a similar project?
                    </p>
                    <Link
                      href="/contact"
                      className="btn-primary w-full justify-center text-sm"
                    >
                      Start a Conversation
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Murals */}
        {relatedMurals.length > 0 && (
          <section className="py-16 bg-cream">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <p className="font-heading text-accent text-sm tracking-widest uppercase mb-4">
                  More {mural.category} Projects
                </p>
                <h2 className="font-display text-h2 text-gray-800">
                  RELATED WORK
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedMurals.map((related, index) => (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/portfolio/${related.slug}`}>
                      <div className="card overflow-hidden">
                        <div className="aspect-[4/3] relative image-zoom bg-gray-200">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{
                              backgroundImage: `url(${related.images.hero})`,
                              backgroundColor: "#e5e7eb",
                            }}
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="font-heading font-bold text-lg text-gray-800 group-hover:text-accent transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {related.location.city},{" "}
                            {related.location.state || related.location.country}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* View All Work */}
              <div className="text-center mt-10">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 font-heading text-sm tracking-wide uppercase text-gray-600 hover:text-accent transition-colors"
                >
                  View All Work
                  <HiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Prev / Next Navigation */}
        <section className="py-0 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2">
              <Link
                href={`/portfolio/${prevMural.slug}`}
                className="group flex items-center gap-4 px-6 py-8 hover:bg-gray-50 transition-colors border-r border-gray-100"
              >
                <HiArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors shrink-0" />
                <div className="min-w-0">
                  <p className="font-heading text-xs tracking-widest uppercase text-gray-400 mb-1">
                    Previous
                  </p>
                  <p className="font-heading font-bold text-gray-800 group-hover:text-accent transition-colors truncate">
                    {prevMural.title}
                  </p>
                </div>
              </Link>
              <Link
                href={`/portfolio/${nextMural.slug}`}
                className="group flex items-center justify-end gap-4 px-6 py-8 hover:bg-gray-50 transition-colors text-right"
              >
                <div className="min-w-0">
                  <p className="font-heading text-xs tracking-widest uppercase text-gray-400 mb-1">
                    Next
                  </p>
                  <p className="font-heading font-bold text-gray-800 group-hover:text-accent transition-colors truncate">
                    {nextMural.title}
                  </p>
                </div>
                <HiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors shrink-0" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
