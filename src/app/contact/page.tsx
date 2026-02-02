"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiMail,
  HiLocationMarker,
  HiPhone,
  HiCheck,
} from "react-icons/hi";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ParallaxHero from "../components/ui/ParallaxHero";

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

const projectTypes = [
  "Commercial / Business",
  "Community / Public Art",
  "Educational / School",
  "Residential",
  "Festival / Event",
  "Other",
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+",
  "Not sure yet",
];

const socialLinks = [
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/dreamscape_r",
    label: "Instagram",
  },
  {
    icon: FaFacebookF,
    href: "https://www.facebook.com/dreamscaper.art",
    label: "Facebook",
  },
  {
    icon: FaYoutube,
    href: "https://www.youtube.com/@dreamscape_r",
    label: "YouTube",
  },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/rachel-dinda",
    label: "LinkedIn",
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    projectType: "",
    location: "",
    wallSize: "",
    timeline: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Placeholder - in production, this would send to an API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <>
      <Header variant="transparent" />

      <main>
        {/* Hero */}
        <ParallaxHero
          imageUrl="/images/murals/zen-shangri-la.jpg"
          title="GET IN TOUCH"
          subtitle="Let's Create Together"
          description="Ready to transform your space? I'd love to hear about your project."
          height="70vh"
          overlayIntensity="medium"
        />

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Contact Info */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="lg:col-span-1"
              >
                <motion.div variants={fadeInUp}>
                  <p className="font-heading text-accent text-sm tracking-widest uppercase mb-4">
                    Contact Info
                  </p>
                  <h2 className="font-display text-h3 text-gray-800 mb-8">
                    LET&apos;S CONNECT
                  </h2>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <HiMail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <a
                        href="mailto:R.dreamscapes@gmail.com"
                        className="font-heading text-gray-800 hover:text-accent transition-colors"
                      >
                        R.dreamscapes@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <HiLocationMarker className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Based In</p>
                      <p className="font-heading text-gray-800">
                        Denver, Colorado
                      </p>
                      <p className="text-sm text-gray-600">
                        Available nationwide & internationally
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <p className="text-sm text-gray-500 mb-4">Follow Along</p>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </motion.div>

                {/* Scheduling Placeholder */}
                <motion.div
                  variants={fadeInUp}
                  className="mt-10 p-6 bg-cream rounded-2xl"
                >
                  <h3 className="font-heading font-bold text-gray-800 mb-2">
                    Schedule a Call
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Prefer to chat? Book a free 15-minute consultation to
                    discuss your project.
                  </p>
                  <button
                    className="btn-outline w-full justify-center text-sm"
                    onClick={() => alert("Scheduling integration coming soon!")}
                  >
                    Book a Consultation
                  </button>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                {isSubmitted ? (
                  <div className="bg-teal/10 rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-6">
                      <HiCheck className="w-8 h-8 text-teal" />
                    </div>
                    <h3 className="font-display text-h3 text-gray-800 mb-4">
                      MESSAGE SENT!
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Thank you for reaching out! I typically respond within
                      24-48 hours. Looking forward to learning about your
                      project.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-heading text-gray-700 mb-2"
                        >
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors"
                          placeholder="Jane Smith"
                        />
                      </div>

                      {/* Organization */}
                      <div>
                        <label
                          htmlFor="organization"
                          className="block text-sm font-heading text-gray-700 mb-2"
                        >
                          Organization
                        </label>
                        <input
                          type="text"
                          id="organization"
                          name="organization"
                          value={formState.organization}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors"
                          placeholder="Company or Organization Name"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-heading text-gray-700 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors"
                          placeholder="jane@example.com"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-heading text-gray-700 mb-2"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors"
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      {/* Project Type */}
                      <div>
                        <label
                          htmlFor="projectType"
                          className="block text-sm font-heading text-gray-700 mb-2"
                        >
                          Project Type *
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={formState.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors bg-white"
                        >
                          <option value="">Select a type</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Location */}
                      <div>
                        <label
                          htmlFor="location"
                          className="block text-sm font-heading text-gray-700 mb-2"
                        >
                          Project Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formState.location}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors"
                          placeholder="City, State"
                        />
                      </div>

                      {/* Wall Size */}
                      <div>
                        <label
                          htmlFor="wallSize"
                          className="block text-sm font-heading text-gray-700 mb-2"
                        >
                          Estimated Wall Size
                        </label>
                        <input
                          type="text"
                          id="wallSize"
                          name="wallSize"
                          value={formState.wallSize}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors"
                          placeholder="e.g., 20ft x 10ft"
                        />
                      </div>

                      {/* Timeline */}
                      <div>
                        <label
                          htmlFor="timeline"
                          className="block text-sm font-heading text-gray-700 mb-2"
                        >
                          Desired Timeline
                        </label>
                        <input
                          type="text"
                          id="timeline"
                          name="timeline"
                          value={formState.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors"
                          placeholder="e.g., Summer 2025"
                        />
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-heading text-gray-700 mb-2"
                      >
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formState.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors bg-white"
                      >
                        <option value="">Select a range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-heading text-gray-700 mb-2"
                      >
                        Tell Me About Your Project *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors resize-none"
                        placeholder="Share your vision, ideas, and any details that would help me understand your project..."
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full md:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-cream">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.p
                variants={fadeInUp}
                className="font-heading text-accent text-sm tracking-widest uppercase mb-4"
              >
                Common Questions
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-h2 text-gray-800"
              >
                FAQ
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              {[
                {
                  q: "How much does a mural cost?",
                  a: "Pricing depends on size, complexity, location, and timeline. Small murals typically start around $2,000, while large commercial projects can range from $10,000-$50,000+. I provide custom quotes after understanding your project.",
                },
                {
                  q: "Do you travel for projects?",
                  a: "Yes! While I'm based in Denver, Colorado, I'm available for projects nationwide and internationally. Travel costs are typically included in the project quote.",
                },
                {
                  q: "How long does a mural take?",
                  a: "Timeline varies by project size and complexity. A small indoor mural might take 2-3 days, while large outdoor murals can take 2-4 weeks. The design phase typically adds 1-2 weeks before painting begins.",
                },
                {
                  q: "What about weather and outdoor murals?",
                  a: "I use high-quality exterior paints designed for outdoor use and apply UV-protective sealants. For painting, I work around weather conditions to ensure optimal application and longevity.",
                },
              ].map((faq) => (
                <motion.div
                  key={faq.q}
                  variants={fadeInUp}
                  className="bg-white rounded-xl p-6"
                >
                  <h3 className="font-heading font-bold text-gray-800 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600">{faq.a}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
