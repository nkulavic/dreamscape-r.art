"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ParallaxHero from "../components/ui/ParallaxHero";
import SortSelect from "../components/ui/SortSelect";
import { credentials } from "../data/experience";
import { sortItems, type SortOption } from "@/lib/sort";
import type { Exhibition, Festival, Publication, Client } from "@/db/dal";

const EXHIBITION_SORTS: SortOption<Exhibition>[] = [
  { value: "newest", label: "Newest first", getValue: (e) => e.year, direction: "desc" },
  { value: "oldest", label: "Oldest first", getValue: (e) => e.year },
  { value: "title", label: "Title A–Z", getValue: (e) => e.title },
  { value: "venue", label: "Venue A–Z", getValue: (e) => e.venue },
  { value: "location", label: "Location A–Z", getValue: (e) => e.location },
  { value: "type", label: "Type A–Z", getValue: (e) => e.type },
];

const FESTIVAL_SORTS: SortOption<Festival>[] = [
  { value: "newest", label: "Newest first", getValue: (f) => f.year, direction: "desc" },
  { value: "oldest", label: "Oldest first", getValue: (f) => f.year },
  { value: "name", label: "Name A–Z", getValue: (f) => f.name },
  { value: "location", label: "Location A–Z", getValue: (f) => f.location },
  {
    value: "international",
    label: "International first",
    getValue: (f) => f.international,
    direction: "desc",
  },
];

const PUBLICATION_SORTS: SortOption<Publication>[] = [
  { value: "newest", label: "Newest first", getValue: (p) => p.year, direction: "desc" },
  { value: "oldest", label: "Oldest first", getValue: (p) => p.year },
  { value: "outlet", label: "Outlet A–Z", getValue: (p) => p.outlet },
  { value: "type", label: "Type A–Z", getValue: (p) => p.type },
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

export default function CVClient({
  exhibitions,
  festivals,
  publications,
  corporateClients,
  communityClients,
  educationClients,
}: {
  exhibitions: Exhibition[];
  festivals: Festival[];
  publications: Publication[];
  corporateClients: Client[];
  communityClients: Client[];
  educationClients: Client[];
}) {
  const [exhibitionSort, setExhibitionSort] = useState("newest");
  const [festivalSort, setFestivalSort] = useState("newest");
  const [publicationSort, setPublicationSort] = useState("newest");

  const sortedExhibitions = sortItems(
    exhibitions,
    EXHIBITION_SORTS.find((option) => option.value === exhibitionSort)
  );
  const sortedFestivals = sortItems(
    festivals,
    FESTIVAL_SORTS.find((option) => option.value === festivalSort)
  );
  const sortedPublications = sortItems(
    publications,
    PUBLICATION_SORTS.find((option) => option.value === publicationSort)
  );

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
              <motion.div
                variants={fadeInUp}
                className="mb-8 flex flex-col gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-end sm:justify-between"
              >
                <h2 className="font-display text-h3 text-gray-800">EXHIBITIONS</h2>
                <SortSelect
                  options={EXHIBITION_SORTS}
                  value={exhibitionSort}
                  onChange={setExhibitionSort}
                />
              </motion.div>
              <div className="space-y-6">
                {sortedExhibitions.map((exhibition) => (
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
              <motion.div
                variants={fadeInUp}
                className="mb-8 flex flex-col gap-3 border-b border-gray-300 pb-4 sm:flex-row sm:items-end sm:justify-between"
              >
                <h2 className="font-display text-h3 text-gray-800">
                  FESTIVALS &amp; EVENTS
                </h2>
                <SortSelect
                  options={FESTIVAL_SORTS}
                  value={festivalSort}
                  onChange={setFestivalSort}
                />
              </motion.div>
              <div className="space-y-6">
                {sortedFestivals.map((festival) => (
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
              <motion.div
                variants={fadeInUp}
                className="mb-8 flex flex-col gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-end sm:justify-between"
              >
                <h2 className="font-display text-h3 text-gray-800">
                  PRESS &amp; PUBLICATIONS
                </h2>
                <SortSelect
                  options={PUBLICATION_SORTS}
                  value={publicationSort}
                  onChange={setPublicationSort}
                />
              </motion.div>
              <div className="space-y-6">
                {sortedPublications.map((pub) => (
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
