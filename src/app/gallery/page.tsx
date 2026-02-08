"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ParallaxHero from "../components/ui/ParallaxHero";
import InstagramFeed from "../components/ui/InstagramFeed";

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

// Instagram post URLs - Replace these with Rachel's actual post URLs
// To get the URL: Open the post on Instagram > Click "..." > Copy Link
const instagramPosts = [
  { url: "https://www.instagram.com/p/C1234example1/" },
  { url: "https://www.instagram.com/p/C1234example2/" },
  { url: "https://www.instagram.com/p/C1234example3/" },
  { url: "https://www.instagram.com/p/C1234example4/" },
  { url: "https://www.instagram.com/p/C1234example5/" },
  { url: "https://www.instagram.com/p/C1234example6/" },
];

export default function GalleryPage() {
  return (
    <>
      <Header variant="transparent" />

      <main>
        {/* Hero Section */}
        <ParallaxHero
          imageUrl="/images/murals/upfest-bristol.jpg"
          title="GALLERY"
          subtitle="Behind the Scenes"
          description="Follow along on Instagram for work-in-progress shots, time-lapses, and the stories behind each mural."
          height="70vh"
          overlayIntensity="medium"
        />

        {/* Instagram Feed Section */}
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
                @dreamscape_r
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-h1 text-gray-800 mb-4"
              >
                LATEST FROM INSTAGRAM
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-gray-600 text-lg max-w-2xl mx-auto"
              >
                See the latest murals, work in progress, and behind-the-scenes moments.
              </motion.p>
            </motion.div>

            {/*
              Instagram Feed Embed Options:

              OPTION 1: Behold.so (Recommended - free tier, clean design)
              1. Go to https://behold.so and sign up free
              2. Connect @dreamscape_r Instagram account
              3. Create a feed widget
              4. Copy the embed code and replace the placeholder below

              OPTION 2: SnapWidget (free tier)
              1. Go to https://snapwidget.com
              2. Create free account, connect Instagram
              3. Copy embed code

              OPTION 3: LightWidget (free tier)
              1. Go to https://lightwidget.com
              2. Connect Instagram, customize layout
              3. Copy embed code
            */}

            {/* Behold.so embed - Replace FEED_ID with your actual feed ID */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              {/*
                When you have a Behold feed ID, uncomment and use:
                <div
                  data-behold-id="YOUR_FEED_ID_HERE"
                  className="behold-feed"
                />
                <script src="https://w.behold.so/widget.js" type="module" />
              */}

              {/* Placeholder until feed is set up */}
              <div className="bg-cream rounded-2xl p-12 text-center">
                <div className="max-w-xl mx-auto">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-gray-800 mb-4">
                    Instagram Feed Setup Required
                  </h3>
                  <p className="text-gray-600 mb-6">
                    To display the full @dreamscape_r feed, set up a free account at{" "}
                    <a href="https://behold.so" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      Behold.so
                    </a>{" "}
                    and connect the Instagram account. Then add the feed ID to this page.
                  </p>
                  <a
                    href="https://instagram.com/dreamscape_r"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Follow @dreamscape_r
                  </a>
                </div>
              </div>
            </motion.div>
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
                WANT TO SEE MORE?
              </h2>
              <p className="text-xl text-ocean-pale mb-10 max-w-2xl mx-auto">
                Explore the full portfolio of completed murals with detailed stories behind each piece.
              </p>
              <Link href="/portfolio" className="btn-primary">
                View Full Portfolio
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
