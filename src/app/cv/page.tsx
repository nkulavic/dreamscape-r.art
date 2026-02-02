"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ParallaxHero from "../components/ui/ParallaxHero";
import {
  exhibitions,
  festivals,
  publications,
  credentials,
  getInternationalFestivals,
} from "../data/experience";
import { getFeaturedClients, getClientsByCategory } from "../data/clients";

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

const internationalFestivals = getInternationalFestivals();
const featuredClients = getFeaturedClients();
const corporateClients = getClientsByCategory("corporate");
const communityClients = getClientsByCategory("community");
const educationClients = getClientsByCategory("education");

export default function CVPage() {
  return (
    <>
      <Header variant="transparent" />

      <main>
        {/* Hero */}
        <ParallaxHero
          imageUrl="/images/murals/molson-coors-trailer.jpg"
          title="CURRICULUM VITAE"
          subtitle="Experience & Recognition"
          height="70vh"
          overlayIntensity="medium"
        />

        {/* Summary Section */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="font-heading font-bold text-xl text-gray-800 mb-4">
                  Rachel Dinda
                </h2>
                <p className="text-gray-600 mb-2">Professional Muralist</p>
                <p className="text-gray-600 mb-2">Denver, Colorado</p>
                <p className="text-gray-600">
                  <a
                    href="mailto:R.dreamscapes@gmail.com"
                    className="text-accent hover:underline"
                  >
                    R.dreamscapes@gmail.com
                  </a>
                </p>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <h3 className="font-heading font-bold text-lg text-gray-800 mb-4">
                  Credentials
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>{credentials.experience}</li>
                  {credentials.certifications.map((cert) => (
                    <li key={cert}>{cert}</li>
                  ))}
                  <li>{credentials.locations}</li>
                  {credentials.education.map((edu) => (
                    <li key={edu.degree}>
                      {edu.degree} - {edu.field}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Exhibitions Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInUp}
                className="font-display text-h3 text-gray-800 mb-8 pb-4 border-b border-gray-200"
              >
                EXHIBITIONS
              </motion.h2>
              <div className="space-y-6">
                {exhibitions.map((exhibition) => (
                  <motion.div
                    key={exhibition.id}
                    variants={fadeInUp}
                    className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8"
                  >
                    <span className="font-heading text-accent font-bold w-16 flex-shrink-0">
                      {exhibition.year}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-gray-800">
                        {exhibition.title}
                      </h3>
                      <p className="text-gray-600">
                        {exhibition.venue}, {exhibition.location}
                        <span className="text-gray-400 ml-2">
                          ({exhibition.type} exhibition)
                        </span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Festivals Section */}
        <section className="py-16 bg-cream">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInUp}
                className="font-display text-h3 text-gray-800 mb-8 pb-4 border-b border-gray-300"
              >
                FESTIVALS & EVENTS
              </motion.h2>
              <div className="space-y-6">
                {festivals.map((festival) => (
                  <motion.div
                    key={festival.id}
                    variants={fadeInUp}
                    className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8"
                  >
                    <span className="font-heading text-accent font-bold w-16 flex-shrink-0">
                      {festival.year}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-gray-800">
                        {festival.name}
                        {festival.international && (
                          <span className="ml-2 px-2 py-0.5 bg-teal/20 text-teal text-xs rounded-full">
                            International
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600">{festival.location}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Publications Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInUp}
                className="font-display text-h3 text-gray-800 mb-8 pb-4 border-b border-gray-200"
              >
                PRESS & PUBLICATIONS
              </motion.h2>
              <div className="space-y-6">
                {publications.map((pub) => (
                  <motion.div
                    key={pub.id}
                    variants={fadeInUp}
                    className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8"
                  >
                    <span className="font-heading text-accent font-bold w-16 flex-shrink-0">
                      {pub.year}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-gray-800">
                        {pub.outlet}
                        <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                          {pub.type}
                        </span>
                      </h3>
                      {pub.title && (
                        <p className="text-gray-600">{pub.title}</p>
                      )}
                      {pub.location && (
                        <p className="text-gray-500 text-sm">{pub.location}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-16 bg-ocean-deep text-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInUp}
                className="font-display text-h3 mb-8 pb-4 border-b border-white/20 text-white"
              >
                SELECTED CLIENTS
              </motion.h2>

              {/* Corporate */}
              <motion.div variants={fadeInUp} className="mb-8">
                <h3 className="font-heading font-bold text-accent-light mb-4">
                  Corporate & Commercial
                </h3>
                <div className="flex flex-wrap gap-3">
                  {corporateClients.map((client) => (
                    <span
                      key={client.id}
                      className="px-4 py-2 bg-white/10 rounded-full text-sm"
                    >
                      {client.name}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Community */}
              <motion.div variants={fadeInUp} className="mb-8">
                <h3 className="font-heading font-bold text-accent-light mb-4">
                  Community & Nonprofit
                </h3>
                <div className="flex flex-wrap gap-3">
                  {communityClients.map((client) => (
                    <span
                      key={client.id}
                      className="px-4 py-2 bg-white/10 rounded-full text-sm"
                    >
                      {client.name}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Education */}
              <motion.div variants={fadeInUp}>
                <h3 className="font-heading font-bold text-accent-light mb-4">
                  Educational Institutions
                </h3>
                <div className="flex flex-wrap gap-3">
                  {educationClients.map((client) => (
                    <span
                      key={client.id}
                      className="px-4 py-2 bg-white/10 rounded-full text-sm"
                    >
                      {client.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-cream">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 mb-6">
                Interested in working together?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary">
                  Get in Touch
                </Link>
                <Link href="/portfolio" className="btn-outline">
                  View Portfolio
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
