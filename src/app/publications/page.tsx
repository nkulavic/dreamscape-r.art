"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  HiVideoCamera,
  HiNewspaper,
  HiGlobeAlt,
  HiOfficeBuilding,
} from "react-icons/hi";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ParallaxHero from "../components/ui/ParallaxHero";
import { publications } from "../data/experience";

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

const getTypeIcon = (type: string) => {
  switch (type) {
    case "tv":
      return HiVideoCamera;
    case "magazine":
    case "newspaper":
      return HiNewspaper;
    case "online":
      return HiGlobeAlt;
    case "museum":
      return HiOfficeBuilding;
    default:
      return HiNewspaper;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "tv":
      return "Television";
    case "magazine":
      return "Magazine";
    case "newspaper":
      return "Newspaper";
    case "online":
      return "Online";
    case "museum":
      return "Museum";
    default:
      return type;
  }
};

const tvPublications = publications.filter((p) => p.type === "tv");
const magazinePublications = publications.filter(
  (p) => p.type === "magazine" || p.type === "newspaper"
);
const otherPublications = publications.filter(
  (p) => p.type === "online" || p.type === "museum"
);

export default function PublicationsPage() {
  return (
    <>
      <Header variant="transparent" />

      <main>
        {/* Hero */}
        <ParallaxHero
          imageUrl="/images/murals/colfax-canvas.jpg"
          title="PRESS & PUBLICATIONS"
          subtitle="Media Coverage"
          description="Featured appearances, interviews, and recognition from media outlets across the country."
          height="70vh"
          overlayIntensity="medium"
        />

        {/* TV Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-4">
                  <HiVideoCamera className="w-5 h-5 text-accent" />
                  <span className="font-heading text-accent text-sm uppercase tracking-wide">
                    Television
                  </span>
                </div>
                <h2 className="font-display text-h2 text-gray-800">
                  TV FEATURES
                </h2>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              >
                {tvPublications.map((pub) => (
                  <motion.div
                    key={pub.id}
                    variants={fadeInUp}
                    className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <HiVideoCamera className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <span className="text-accent font-heading text-sm">
                          {pub.year}
                        </span>
                        <h3 className="font-heading font-bold text-xl text-gray-800 mt-1">
                          {pub.outlet}
                        </h3>
                        {pub.title && (
                          <p className="text-gray-600 mt-2">{pub.title}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Magazine & Print */}
        <section className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-ocean/10 rounded-full mb-4">
                  <HiNewspaper className="w-5 h-5 text-ocean" />
                  <span className="font-heading text-ocean text-sm uppercase tracking-wide">
                    Print Media
                  </span>
                </div>
                <h2 className="font-display text-h2 text-gray-800">
                  MAGAZINE FEATURES
                </h2>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              >
                {magazinePublications.map((pub) => (
                  <motion.div
                    key={pub.id}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow text-center"
                  >
                    <span className="text-ocean font-heading text-sm">
                      {pub.year}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-gray-800 mt-2">
                      {pub.outlet}
                    </h3>
                    {pub.title && (
                      <p className="text-gray-600 text-sm mt-2">{pub.title}</p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Other Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 rounded-full mb-4">
                  <HiGlobeAlt className="w-5 h-5 text-teal" />
                  <span className="font-heading text-teal text-sm uppercase tracking-wide">
                    Other Features
                  </span>
                </div>
                <h2 className="font-display text-h2 text-gray-800">
                  ONLINE & INSTITUTIONAL
                </h2>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              >
                {otherPublications.map((pub) => {
                  const Icon = getTypeIcon(pub.type);
                  return (
                    <motion.div
                      key={pub.id}
                      variants={fadeInUp}
                      className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-teal" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-teal font-heading text-sm">
                              {pub.year}
                            </span>
                            <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">
                              {getTypeLabel(pub.type)}
                            </span>
                          </div>
                          <h3 className="font-heading font-bold text-xl text-gray-800 mt-1">
                            {pub.outlet}
                          </h3>
                          {pub.title && (
                            <p className="text-gray-600 mt-2">{pub.title}</p>
                          )}
                          {pub.location && (
                            <p className="text-gray-500 text-sm mt-1">
                              {pub.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Press Inquiry CTA */}
        <section className="py-20 bg-ocean-deep text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-h2 mb-6 text-white">PRESS INQUIRIES</h2>
              <p className="text-xl text-ocean-pale mb-8 max-w-2xl mx-auto">
                For media inquiries, interviews, or feature requests, please
                reach out directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:R.dreamscapes@gmail.com"
                  className="btn-primary"
                >
                  Contact for Press
                </a>
                <Link href="/cv" className="btn-secondary">
                  View Full CV
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
