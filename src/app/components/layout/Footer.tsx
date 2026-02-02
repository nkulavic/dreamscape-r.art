"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin, FaTiktok, FaPinterest } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const navLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "CV", href: "/cv" },
  { label: "Publications", href: "/publications" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: FaInstagram, href: "https://instagram.com/dreamscape_r", label: "Instagram" },
  { icon: FaFacebook, href: "https://facebook.com/Dreamscapesbydesign", label: "Facebook" },
  { icon: FaYoutube, href: "https://youtube.com/@dreamscaper", label: "YouTube" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/dreamscapeart", label: "LinkedIn" },
  { icon: FaTiktok, href: "https://tiktok.com/@dreamscapes_design", label: "TikTok" },
  { icon: FaPinterest, href: "https://pinterest.com/Dreamscape_r", label: "Pinterest" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ocean-deep text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display text-4xl text-white">
                DREAMSCAPER
              </span>
            </Link>
            <p className="text-ocean-pale text-lg max-w-md mb-6">
              Transforming spaces with vibrant, community-driven murals.
              Guided by community, inspired by culture.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Explore</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-ocean-pale hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <a
                href="mailto:R.dreamscapes@gmail.com"
                className="flex items-center gap-3 text-ocean-pale hover:text-accent transition-colors"
              >
                <HiMail className="w-5 h-5" />
                <span>R.dreamscapes@gmail.com</span>
              </a>
              <p className="text-ocean-pale">
                Denver, Colorado<br />
                Available for projects nationwide & internationally
              </p>
              <Link
                href="/contact"
                className="inline-block mt-4 btn-primary text-sm py-2.5 px-5"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-ocean-pale">
            <p>&copy; {currentYear} Rachel Dinda. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
