"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ParallaxHero from "../components/ui/ParallaxHero";
import SortSelect from "../components/ui/SortSelect";
import { sortItems, type SortOption } from "@/lib/sort";
import type { Mural } from "@/db/dal";

type CategoryFilter = "all" | Mural["category"];

const categories: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All Work" },
  { value: "commercial", label: "Commercial" },
  { value: "community", label: "Community" },
  { value: "education", label: "Education" },
  { value: "international", label: "International" },
];

const locationOf = (mural: Mural) =>
  [mural.location.city, mural.location.state || mural.location.country]
    .filter(Boolean)
    .join(", ");

const SORT_OPTIONS: SortOption<Mural>[] = [
  { value: "newest", label: "Newest first", getValue: (m) => m.year, direction: "desc" },
  { value: "oldest", label: "Oldest first", getValue: (m) => m.year, direction: "asc" },
  { value: "title", label: "Title A–Z", getValue: (m) => m.title },
  { value: "title-desc", label: "Title Z–A", getValue: (m) => m.title, direction: "desc" },
  { value: "location", label: "Location A–Z", getValue: locationOf },
  { value: "category", label: "Category A–Z", getValue: (m) => m.category },
  {
    value: "tag",
    label: "Tag A–Z",
    // Murals carry several tags; the alphabetically first one anchors the order.
    getValue: (m) => [...m.tags].sort((a, b) => a.localeCompare(b))[0] ?? "",
  },
];

const DEFAULT_SORT = SORT_OPTIONS[0].value;

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

export default function PortfolioClient({ murals }: { murals: Mural[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortValue, setSortValue] = useState<string>(DEFAULT_SORT);

  // Read tag and sort from the URL so a filtered view can be shared or bookmarked.
  useEffect(() => {
    const tag = searchParams.get("tag");
    if (tag) {
      setActiveTag(tag);
      setActiveFilter("all");
    }

    const sort = searchParams.get("sort");
    if (sort && SORT_OPTIONS.some((option) => option.value === sort)) {
      setSortValue(sort);
    }
  }, [searchParams]);

  function handleSortChange(value: string) {
    setSortValue(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value === DEFAULT_SORT) {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  // Every tag in use, so visitors can browse by theme without guessing names.
  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const mural of murals) {
      for (const tag of mural.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag, count]) => ({ tag, count }));
  }, [murals]);

  const visibleMurals = useMemo(() => {
    const filtered = murals.filter((mural) => {
      const matchesCategory =
        activeFilter === "all" || mural.category === activeFilter;
      const matchesTag =
        !activeTag ||
        mural.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());
      return matchesCategory && matchesTag;
    });

    return sortItems(
      filtered,
      SORT_OPTIONS.find((option) => option.value === sortValue)
    );
  }, [murals, activeFilter, activeTag, sortValue]);

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
                  onClick={() => {
                    setActiveFilter(category.value);
                    setActiveTag(null);
                  }}
                  className={`px-6 py-3 rounded-full font-heading text-sm tracking-wide uppercase transition-all duration-300 ${
                    activeFilter === category.value && !activeTag
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category.label}
                </button>
              ))}
              {activeTag && (
                <button
                  type="button"
                  onClick={() => setActiveTag(null)}
                  className="px-6 py-3 rounded-full font-heading text-sm tracking-wide uppercase bg-accent text-white transition-all duration-300 inline-flex items-center gap-2"
                >
                  Tag: {activeTag}
                  <span className="text-white/70 hover:text-white">&times;</span>
                </button>
              )}
            </motion.div>

            {/* Tag Filters */}
            {allTags.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="-mt-10 mb-12 flex flex-wrap justify-center gap-2"
              >
                {allTags.map(({ tag, count }) => {
                  const isActive = activeTag?.toLowerCase() === tag.toLowerCase();
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(isActive ? null : tag)}
                      className={`rounded-full px-4 py-1.5 text-xs tracking-wide transition-colors ${
                        isActive
                          ? "bg-ocean-deep text-white"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      }`}
                    >
                      {tag}
                      <span className="ml-1.5 opacity-60">{count}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}

            {/* Result Count + Sort */}
            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <motion.p
                key={`count-${activeFilter}-${activeTag ?? ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-heading text-sm tracking-wide text-gray-500"
                aria-live="polite"
              >
                {visibleMurals.length}{" "}
                {visibleMurals.length === 1 ? "Project" : "Projects"}
              </motion.p>

              <SortSelect
                options={SORT_OPTIONS}
                value={sortValue}
                onChange={handleSortChange}
              />
            </div>

            {/* Murals Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeFilter}-${activeTag ?? ""}-${sortValue}`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {visibleMurals.map((mural) => (
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

                        <div className="p-6 min-h-[120px] flex flex-col">
                          <h3 className="font-heading font-bold text-xl text-gray-800 mb-2 group-hover:text-accent transition-colors line-clamp-2">
                            {mural.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
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
            {visibleMurals.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-gray-500 text-lg">
                  {activeTag
                    ? `No murals tagged "${activeTag}"${
                        activeFilter === "all" ? "" : " in this category"
                      }.`
                    : "No murals found in this category."}
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
