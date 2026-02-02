"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  HiLightBulb,
  HiPencil,
  HiColorSwatch,
  HiCheck,
  HiOfficeBuilding,
  HiUserGroup,
  HiAcademicCap,
  HiGlobe,
} from "react-icons/hi";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ParallaxHero from "../components/ui/ParallaxHero";
import ParallaxSection from "../components/ui/ParallaxSection";

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

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    icon: HiLightBulb,
    description:
      "We begin with a conversation about your vision, space, and goals. I learn about your community, brand, or organization and what story you want to tell through art.",
    details: [
      "Initial consultation (phone or video)",
      "Site visit and measurements",
      "Discussion of themes and concepts",
      "Budget and timeline planning",
    ],
  },
  {
    number: "02",
    title: "Design",
    icon: HiPencil,
    description:
      "I create custom concepts and digital mockups tailored to your space. Through collaborative feedback, we refine the design until it perfectly captures your vision.",
    details: [
      "Initial concept sketches",
      "Digital mockups on your wall",
      "Color palette development",
      "Revision rounds included",
    ],
  },
  {
    number: "03",
    title: "Creation",
    icon: HiColorSwatch,
    description:
      "Watch your mural come to life. I handle all logistics from wall preparation to the final brushstroke, ensuring a professional result that will last for years.",
    details: [
      "Professional wall preparation",
      "High-quality exterior paints",
      "Progress updates throughout",
      "UV-protective sealant finish",
    ],
  },
];

const serviceTypes = [
  {
    icon: HiOfficeBuilding,
    title: "Commercial",
    description:
      "Transform your business space with custom murals that reinforce brand identity and create memorable customer experiences.",
    examples: ["Restaurants & Breweries", "Retail Spaces", "Corporate Offices", "Hotels & Hospitality"],
  },
  {
    icon: HiUserGroup,
    title: "Community",
    description:
      "Bring neighborhoods together with public art that celebrates local culture, history, and the people who make communities unique.",
    examples: ["Public Spaces", "Community Centers", "Neighborhood Revitalization", "Cultural Projects"],
  },
  {
    icon: HiAcademicCap,
    title: "Educational",
    description:
      "Create inspiring environments for learning with murals that engage students and enhance educational spaces.",
    examples: ["K-12 Schools", "Universities", "Libraries", "Youth Centers"],
  },
  {
    icon: HiGlobe,
    title: "International",
    description:
      "Available for projects worldwide. I&apos;ve completed murals across multiple countries and am equipped to travel for the right project.",
    examples: ["Festival Participation", "Cultural Exchange", "International Brands", "Destination Projects"],
  },
];

const whyWorkWithMe = [
  "10+ years of professional mural experience",
  "OSHA lift certified for safe elevated work",
  "Fully insured for your peace of mind",
  "Experience with projects up to 7,500 sq ft",
  "Nationwide and international availability",
  "Collaborative, community-centered approach",
];

export default function ServicesPage() {
  return (
    <>
      <Header variant="transparent" />

      <main>
        {/* Hero */}
        <ParallaxHero
          imageUrl="/images/murals/colorful-colorado-vw.jpg"
          title="SERVICES"
          subtitle="Commission Process"
          description="From concept to completion, every mural begins with your vision. Here's how we bring it to life."
          height="80vh"
          overlayIntensity="medium"
        />

        {/* Process Section */}
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
                The Process
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-h1 text-gray-800 mb-6"
              >
                HOW IT WORKS
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                A clear, collaborative process ensures your mural exceeds
                expectations from start to finish.
              </motion.p>
            </motion.div>

            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-accent" />
                      </div>
                      <div>
                        <span className="font-display text-4xl text-accent">
                          {step.number}
                        </span>
                        <h3 className="font-heading font-bold text-2xl text-gray-800">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-body-lg text-gray-600 mb-6">
                      {step.description}
                    </p>
                    <ul className="space-y-3">
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-center gap-3 text-gray-600"
                        >
                          <HiCheck className="w-5 h-5 text-teal flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${
                            index === 0
                              ? "/images/murals/zen-shangri-la.jpg"
                              : index === 1
                              ? "/images/murals/psychedelic-woman.jpg"
                              : "/images/murals/vw-bus-artist.jpg"
                          })`,
                          backgroundColor: "#e5e7eb",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Parallax Divider */}
        <ParallaxSection
          imageUrl="/images/murals/spread-love-colorado.jpg"
          height="h-64"
          overlayColor="ocean"
          overlayOpacity={0.7}
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl text-white text-center px-6"
          >
            EVERY SPACE DESERVES GREAT ART
          </motion.p>
        </ParallaxSection>

        {/* Service Types */}
        <section className="py-24 bg-cream">
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
                Mural Types
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-h1 text-gray-800"
              >
                PROJECTS I SPECIALIZE IN
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {serviceTypes.map((service) => (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.examples.map((example) => (
                      <span
                        key={example}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Work With Me */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url(/images/murals/colfax-canvas.jpg)",
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
                  Why Choose Rachel
                </motion.p>
                <motion.h2
                  variants={fadeInUp}
                  className="font-display text-h2 text-gray-800 mb-8"
                >
                  PROFESSIONAL RESULTS, EVERY TIME
                </motion.h2>
                <motion.ul variants={fadeInUp} className="space-y-4">
                  {whyWorkWithMe.map((item) => (
                    <li key={item} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0">
                        <HiCheck className="w-4 h-4 text-teal" />
                      </div>
                      <span className="text-gray-700 text-lg">{item}</span>
                    </li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
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
                Books are currently open for 2025 commissions. Let&apos;s discuss
                your vision and create something extraordinary together.
              </p>
              <Link href="/contact" className="btn-primary">
                Request a Quote
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
