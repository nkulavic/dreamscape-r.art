import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Marketing Materials",
};

const materials = [
  { href: "/marketing/leave-behind", label: "Leave-Behind" },
  { href: "/marketing/brochure", label: "Brochure" },
  { href: "/marketing/capabilities-deck", label: "Capabilities Deck" },
  { href: "/marketing/business-card", label: "Business Card & Postcard" },
];

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Screen-only toolbar */}
      <div className="print:hidden bg-gray-800 text-white px-6 py-3 flex items-center justify-between text-sm sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            &larr; Back to Site
          </Link>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400 uppercase tracking-widest text-xs">Marketing Materials</span>
        </div>
        <div className="flex items-center gap-3">
          {materials.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="text-gray-400 hover:text-coral-light transition-colors text-xs"
            >
              {m.label}
            </Link>
          ))}
          <PrintButton />
        </div>
      </div>
      {children}
    </>
  );
}
