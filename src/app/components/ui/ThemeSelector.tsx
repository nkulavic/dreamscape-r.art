"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiColorSwatch, HiX } from "react-icons/hi";

interface ThemePalette {
  id: string;
  name: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  preview: string; // Color for preview swatch
}

const themes: ThemePalette[] = [
  {
    id: "coral",
    name: "Coral Sunset",
    accent: "#f77f00",
    accentLight: "#fcbf49",
    accentDark: "#d66800",
    preview: "#f77f00",
  },
  {
    id: "teal",
    name: "Ocean Teal",
    accent: "#2ec4b6",
    accentLight: "#5dd9ce",
    accentDark: "#1a9e92",
    preview: "#2ec4b6",
  },
  {
    id: "purple",
    name: "Sunset Purple",
    accent: "#7209b7",
    accentLight: "#9d4edd",
    accentDark: "#560bad",
    preview: "#7209b7",
  },
  {
    id: "pink",
    name: "Vibrant Pink",
    accent: "#e63988",
    accentLight: "#ff6b9d",
    accentDark: "#c4256e",
    preview: "#e63988",
  },
  {
    id: "gold",
    name: "Golden Hour",
    accent: "#d4a20a",
    accentLight: "#f0c14b",
    accentDark: "#b8860b",
    preview: "#d4a20a",
  },
  {
    id: "emerald",
    name: "Emerald",
    accent: "#10b981",
    accentLight: "#34d399",
    accentDark: "#059669",
    preview: "#10b981",
  },
  {
    id: "rose",
    name: "Dusty Rose",
    accent: "#be185d",
    accentLight: "#ec4899",
    accentDark: "#9d174d",
    preview: "#be185d",
  },
  {
    id: "blue",
    name: "Electric Blue",
    accent: "#2563eb",
    accentLight: "#60a5fa",
    accentDark: "#1d4ed8",
    preview: "#2563eb",
  },
];

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<string>("coral");

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("dreamscape-theme");
    if (savedTheme) {
      setActiveTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId);
    if (!theme) return;

    // Update the themeable accent variables
    document.documentElement.style.setProperty("--accent-color", theme.accent);
    document.documentElement.style.setProperty("--accent-color-light", theme.accentLight);
    document.documentElement.style.setProperty("--accent-color-dark", theme.accentDark);
  };

  const handleThemeChange = (themeId: string) => {
    setActiveTheme(themeId);
    applyTheme(themeId);
    localStorage.setItem("dreamscape-theme", themeId);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-ocean-deep text-white shadow-xl flex items-center justify-center hover:bg-ocean transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Change Theme"
      >
        <HiColorSwatch className="w-6 h-6" />
      </motion.button>

      {/* Theme Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 right-0 top-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading font-bold text-xl text-gray-800">
                    Theme Selector
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <HiX className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <p className="text-gray-600 text-sm mb-6">
                  Choose an accent color palette for the site. This is a
                  temporary feature to help decide on the final color scheme.
                </p>

                <div className="space-y-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                        activeTheme === theme.id
                          ? "border-gray-800 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-full shadow-md flex-shrink-0"
                        style={{ backgroundColor: theme.preview }}
                      />
                      <div className="text-left">
                        <p className="font-heading font-semibold text-gray-800">
                          {theme.name}
                        </p>
                        <div className="flex gap-1 mt-1">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: theme.accentDark }}
                          />
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: theme.accent }}
                          />
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: theme.accentLight }}
                          />
                        </div>
                      </div>
                      {activeTheme === theme.id && (
                        <div className="ml-auto">
                          <div className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gray-100 rounded-xl">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> This theme selector is temporary and
                    will be removed before launch. It&apos;s here to help decide
                    on the final color palette.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
