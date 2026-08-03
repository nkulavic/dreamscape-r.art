"use client";

import { useEffect, useState, useId, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
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

/** "any" matches murals carrying at least one selected tag; "all" requires every one. */
type TagMode = "any" | "all";

function parseTags(raw: string | null | undefined): string[] {
  if (!raw) return [];
  const seen = new Set<string>();
  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => {
      const lower = tag.toLowerCase();
      if (!tag || seen.has(lower)) return false;
      seen.add(lower);
      return true;
    });
}

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

interface PortfolioClientProps {
  murals: Mural[];
  /** Comma-separated tags, read from the URL on the server. */
  initialTag?: string;
  initialMatch?: string;
  initialSort?: string;
}

export default function PortfolioClient({
  murals,
  initialTag,
  initialMatch,
  initialSort,
}: PortfolioClientProps) {
  // Filters arrive as props from the server render, so the grid is in the HTML
  // and the controls are correct on first paint.
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [activeTags, setActiveTags] = useState<string[]>(() =>
    parseTags(initialTag)
  );
  const [tagMode, setTagMode] = useState<TagMode>(
    initialMatch === "all" ? "all" : "any"
  );
  const [sortValue, setSortValue] = useState<string>(
    initialSort && SORT_OPTIONS.some((option) => option.value === initialSort)
      ? initialSort
      : DEFAULT_SORT
  );
  const [showTags, setShowTags] = useState(false);
  const tagPanelId = useId();

  // The grid animates when filters change, but must not start hidden on the
  // server render — otherwise the markup arrives at opacity 0 and the page
  // looks empty until hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function syncUrl(next: { tags?: string[]; mode?: TagMode; sort?: string }) {
    const tags = next.tags ?? activeTags;
    const mode = next.mode ?? tagMode;
    const sort = next.sort ?? sortValue;

    const params = new URLSearchParams();
    if (tags.length > 0) params.set("tag", tags.join(","));
    // Only meaningful with more than one tag.
    if (mode === "all" && tags.length > 1) params.set("match", "all");
    if (sort !== DEFAULT_SORT) params.set("sort", sort);

    // history.replaceState rather than router.replace: filtering is instant and
    // local, and a router navigation would round-trip to the server every click.
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      query ? `${window.location.pathname}?${query}` : window.location.pathname
    );
  }

  function handleSortChange(value: string) {
    setSortValue(value);
    syncUrl({ sort: value });
  }

  /** Adds or removes a tag from the selection. */
  function toggleTag(tag: string) {
    const lower = tag.toLowerCase();
    const isActive = activeTags.some((t) => t.toLowerCase() === lower);
    const next = isActive
      ? activeTags.filter((t) => t.toLowerCase() !== lower)
      : [...activeTags, tag];

    setActiveTags(next);
    syncUrl({ tags: next });
  }

  function clearTags() {
    setActiveTags([]);
    syncUrl({ tags: [] });
  }

  function handleModeChange(mode: TagMode) {
    setTagMode(mode);
    syncUrl({ mode });
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
    const selected = activeTags.map((tag) => tag.toLowerCase());

    const filtered = murals.filter((mural) => {
      const matchesCategory =
        activeFilter === "all" || mural.category === activeFilter;

      const muralTags = new Set(mural.tags.map((tag) => tag.toLowerCase()));
      const matchesTags =
        selected.length === 0 ||
        (tagMode === "all"
          ? selected.every((tag) => muralTags.has(tag))
          : selected.some((tag) => muralTags.has(tag)));

      return matchesCategory && matchesTags;
    });

    return sortItems(
      filtered,
      SORT_OPTIONS.find((option) => option.value === sortValue)
    );
  }, [murals, activeFilter, activeTags, tagMode, sortValue]);

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
        <section className="py-12 bg-white sm:py-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Filter Buttons — no entry animation; these must be usable at once */}
            <div className="mb-5 flex flex-wrap justify-center gap-2 sm:mb-12 sm:gap-3">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setActiveFilter(category.value)}
                  className={`rounded-full px-3.5 py-1.5 font-heading text-xs uppercase tracking-wide transition-all duration-300 sm:px-6 sm:py-3 sm:text-sm ${
                    activeFilter === category.value
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Selected tags + how they combine */}
            {activeTags.length > 0 && (
              <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
                {activeTags.map((tag, index) => (
                  <span key={tag} className="flex items-center gap-2">
                    {index > 0 && (
                      <span className="font-heading text-[10px] uppercase tracking-wide text-gray-400">
                        {tagMode === "all" ? "and" : "or"}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleTag(tag)}
                      title={`Remove ${tag}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-ocean-deep px-3 py-1.5 text-xs tracking-wide text-white transition-colors hover:bg-accent"
                    >
                      {tag}
                      <span className="text-white/60">&times;</span>
                    </button>
                  </span>
                ))}

                {activeTags.length > 1 && (
                  <span
                    className="ml-1 inline-flex overflow-hidden rounded-full bg-gray-100 p-0.5"
                    role="group"
                    aria-label="How selected tags combine"
                  >
                    {(["any", "all"] as TagMode[]).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => handleModeChange(mode)}
                        aria-pressed={tagMode === mode}
                        className={`rounded-full px-3 py-1 font-heading text-[11px] uppercase tracking-wide transition-colors ${
                          tagMode === mode
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {mode === "any" ? "Any" : "All"}
                      </button>
                    ))}
                  </span>
                )}

                <button
                  type="button"
                  onClick={clearTags}
                  className="text-xs uppercase tracking-wide text-gray-400 underline-offset-4 hover:text-accent hover:underline"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Result Count + Tag Browser + Sort — one row on phones too */}
            <div className="mb-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:mb-8 sm:justify-between sm:gap-4">
              <p
                className="w-full text-center font-heading text-xs tracking-wide text-gray-500 sm:w-auto sm:text-left sm:text-sm"
                aria-live="polite"
              >
                {visibleMurals.length}{" "}
                {visibleMurals.length === 1 ? "Project" : "Projects"}
              </p>

              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {allTags.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowTags((open) => !open)}
                    aria-expanded={showTags}
                    aria-controls={tagPanelId}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3.5 py-2 font-heading text-xs uppercase tracking-wide text-gray-700 transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
                  >
                    <span className="sm:hidden">Tags</span>
                    <span className="hidden sm:inline">Browse tags</span>
                    <span className="text-gray-400">{allTags.length}</span>
                    <HiChevronDown
                      className={`h-3.5 w-3.5 text-gray-500 transition-transform duration-200 sm:h-4 sm:w-4 ${
                        showTags ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                )}

                <SortSelect
                  options={SORT_OPTIONS}
                  value={sortValue}
                  onChange={handleSortChange}
                />
              </div>
            </div>

            {/* Tag Panel — collapsed by default so it never crowds the grid */}
            <AnimatePresence initial={false}>
              {showTags && allTags.length > 0 && (
                <motion.div
                  id={tagPanelId}
                  key="tag-panel"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="mb-5 rounded-2xl border border-gray-100 bg-gray-50/60 p-4 sm:mb-8 sm:p-5">
                    <p className="mb-3 font-heading text-[11px] uppercase tracking-wide text-gray-400">
                      Pick as many as you like
                      {activeTags.length > 1 &&
                        ` — showing murals with ${
                          tagMode === "all" ? "all" : "any"
                        } of them`}
                    </p>
                    <div className="max-h-44 overflow-y-auto sm:max-h-56">
                      <div className="flex flex-wrap gap-2">
                        {allTags.map(({ tag, count }) => {
                          const isActive = activeTags.some(
                            (t) => t.toLowerCase() === tag.toLowerCase()
                          );
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleTag(tag)}
                              aria-pressed={isActive}
                              className={`rounded-full px-3.5 py-1.5 text-xs tracking-wide transition-colors ${
                                isActive
                                  ? "bg-ocean-deep text-white"
                                  : "bg-white text-gray-500 hover:text-gray-900"
                              }`}
                            >
                              {tag}
                              <span
                                className={`ml-1.5 ${
                                  isActive ? "text-white/60" : "opacity-50"
                                }`}
                              >
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setShowTags(false)}
                        className="rounded-full bg-gray-900 px-4 py-1.5 font-heading text-[11px] uppercase tracking-wide text-white transition-colors hover:bg-gray-700"
                      >
                        Done
                      </button>
                      {activeTags.length > 0 && (
                        <button
                          type="button"
                          onClick={clearTags}
                          className="text-xs uppercase tracking-wide text-gray-500 underline-offset-4 hover:text-accent hover:underline"
                        >
                          Clear {activeTags.length}{" "}
                          {activeTags.length === 1 ? "tag" : "tags"}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Murals Grid */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${activeFilter}-${activeTags.join(",")}-${tagMode}-${sortValue}`}
                initial={mounted ? "hidden" : false}
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
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  {activeTags.length > 0
                    ? `No murals tagged ${activeTags
                        .map((tag) => `"${tag}"`)
                        .join(tagMode === "all" ? " and " : " or ")}${
                        activeFilter === "all" ? "" : " in this category"
                      }.`
                    : "No murals found in this category."}
                </p>
                {activeTags.length > 1 && tagMode === "all" && (
                  <button
                    type="button"
                    onClick={() => handleModeChange("any")}
                    className="mt-3 font-heading text-sm uppercase tracking-wide text-accent underline-offset-4 hover:underline"
                  >
                    Try matching any tag instead
                  </button>
                )}
              </div>
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
