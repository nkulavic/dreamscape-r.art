"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ParallaxHero from "../components/ui/ParallaxHero";
import ParallaxSection from "../components/ui/ParallaxSection";
import { credentials } from "../data/experience";

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

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Murals Completed" },
  { value: "15+", label: "States & Countries" },
  { value: "7,500", label: "Largest Sq Ft Project" },
];

export default function AboutPage() {
  return (
    <>
      <Header variant="transparent" />

      <main>
        {/* Hero */}
        <ParallaxHero
          imageUrl="/images/murals/vw-bus-artist.jpg"
          title="ABOUT THE ARTIST"
          subtitle="Rachel Dinda"
          height="80vh"
          overlayIntensity="medium"
        />

        {/* Intro Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
                  The Dreamscaper
                </motion.p>
                <motion.h2
                  variants={fadeInUp}
                  className="font-display text-h2 text-gray-800 mb-6"
                >
                  TRANSFORMING SPACES INTO STORIES
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-body-lg text-gray-600 mb-6"
                >
                  For over a decade, Rachel Dinda has been transforming blank
                  walls into vibrant narratives that speak to communities,
                  inspire change, and celebrate the human spirit. Based in
                  Denver, Colorado, her work spans from intimate local murals to
                  massive commercial installations across the United States and
                  internationally.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="text-body-lg text-gray-600 mb-8"
                >
                  What sets Rachel apart is her deep commitment to collaboration.
                  Every mural begins with listening&mdash;understanding the space,
                  the people who inhabit it, and the story they want to tell.
                  This community-centered approach has led to partnerships with
                  organizations ranging from local schools to Fortune 500
                  companies.
                </motion.p>
                <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                  {credentials.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-4 py-2 bg-cream rounded-full text-sm font-heading text-gray-700"
                    >
                      {cert}
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url(/images/murals/psychedelic-woman.jpg)",
                      backgroundColor: "#e5e7eb",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-ocean-deep">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="font-display text-5xl md:text-6xl text-accent mb-2">
                    {stat.value}
                  </div>
                  <div className="font-heading text-white/80 text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-24 bg-cream">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.p
                variants={fadeInUp}
                className="font-heading text-accent text-sm tracking-widest uppercase mb-4"
              >
                The Journey
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-h2 text-gray-800"
              >
                FROM PASSION TO PROFESSION
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.p
                variants={fadeInUp}
                className="text-body-lg text-gray-600 leading-relaxed"
              >
                Rachel&apos;s artistic journey didn&apos;t follow a traditional path.
                With a background in nursing (RN, BSN), she brings a unique
                perspective to her art&mdash;one grounded in empathy, service, and
                a deep understanding of how environments affect well-being. This
                healthcare background informs her approach to creating spaces
                that heal, inspire, and uplift communities.
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-body-lg text-gray-600 leading-relaxed"
              >
                What began as a creative outlet evolved into a calling. Rachel
                discovered that murals offered something canvas art couldn&apos;t: the
                ability to transform shared spaces and create lasting impact on
                entire communities. A single mural can change how people feel
                about their neighborhood, their workplace, their school.
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-body-lg text-gray-600 leading-relaxed"
              >
                Today, Rachel&apos;s work can be found across Colorado and beyond&mdash;from
                the vibrant streets of Denver to the historic walls of Bristol,
                UK, from community centers in Colombia to corporate headquarters
                of Fortune 500 companies. Each project, regardless of scale,
                receives the same dedication to craft, community, and storytelling.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Parallax Quote */}
        <ParallaxSection
          imageUrl="/images/murals/ursula-brewery.jpg"
          height="h-80 md:h-96"
          overlayColor="dark"
          overlayOpacity={0.6}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center text-white px-6"
          >
            <p className="font-display text-3xl md:text-5xl mb-4">
              &ldquo;EVERY WALL HAS A STORY WAITING TO BE TOLD&rdquo;
            </p>
            <p className="font-heading text-lg text-white/80">— Rachel Dinda</p>
          </motion.div>
        </ParallaxSection>

        {/* Philosophy Section */}
        <section className="py-24 bg-white">
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
                className="font-heading text-accent text-sm tracking-widest uppercase mb-4"
              >
                Philosophy
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-h2 text-gray-800"
              >
                ART WITH PURPOSE
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {[
                {
                  title: "Community-Driven",
                  description:
                    "Every project begins with understanding the community it will serve. Murals should reflect and celebrate the people who will interact with them daily.",
                },
                {
                  title: "Socially Conscious",
                  description:
                    "Art has the power to spark conversations, challenge perspectives, and inspire action. Rachel uses her platform to support causes from ocean conservation to youth education.",
                },
                {
                  title: "Technically Excellent",
                  description:
                    "Beautiful art deserves professional execution. OSHA certified and fully insured, Rachel brings both artistic vision and technical expertise to every project.",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <h3 className="font-heading font-bold text-xl text-gray-800 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
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
                LET&apos;S CREATE SOMETHING EXTRAORDINARY
              </h2>
              <p className="text-xl text-ocean-pale mb-10 max-w-2xl mx-auto">
                Whether you&apos;re envisioning a mural for your business, school,
                or community space, Rachel would love to hear your story.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary">
                  Start a Conversation
                </Link>
                <Link href="/portfolio" className="btn-secondary">
                  View the Portfolio
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
