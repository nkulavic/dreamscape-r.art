import Link from "next/link";

const materials = [
  {
    href: "/marketing/leave-behind",
    title: "One-Page Leave-Behind",
    description: "8.5\" x 11\" sell sheet with services, process, investment tiers, clients, credentials, and CTA.",
    size: "Letter",
    variants: [
      { href: "/marketing/leave-behind/commercial", label: "Commercial" },
      { href: "/marketing/leave-behind/education", label: "Education" },
      { href: "/marketing/leave-behind/community", label: "Community" },
    ],
  },
  {
    href: "/marketing/brochure",
    title: "Tri-Fold Brochure",
    description: "11\" x 8.5\" landscape, 6 panels: cover, story, services + process + investment, portfolio, contact, social.",
    size: "Letter Landscape",
    variants: [
      { href: "/marketing/brochure/commercial", label: "Commercial" },
      { href: "/marketing/brochure/education", label: "Education" },
      { href: "/marketing/brochure/community", label: "Community" },
    ],
  },
  {
    href: "/marketing/capabilities-deck",
    title: "Capabilities Deck",
    description: "13-slide presentation with process details, investment tiers, getting started flow, case studies, full client list, and press.",
    size: "Letter Landscape",
    variants: [
      { href: "/marketing/capabilities-deck/commercial", label: "Commercial" },
      { href: "/marketing/capabilities-deck/education", label: "Education" },
      { href: "/marketing/capabilities-deck/community", label: "Community" },
    ],
  },
  {
    href: "/marketing/business-card",
    title: "Business Card & Postcard",
    description: "3.5\" x 2\" business card (front + back) and 6\" x 4\" postcard with hero image.",
    size: "Letter",
  },
];

export default function MarketingIndex() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl text-ocean-deep tracking-wider mb-2">
          Marketing Materials
        </h1>
        <p className="text-gray-500 mb-10">
          Print-ready materials for client presentations. Open any page, then use
          Print / Save PDF (set margins to &quot;None&quot; and enable &quot;Background graphics&quot;).
        </p>

        <div className="grid gap-4">
          {materials.map((m) => (
            <div
              key={m.href}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <Link
                  href={m.href}
                  className="text-lg font-semibold text-ocean-deep hover:text-coral transition-colors"
                >
                  {m.title}
                </Link>
                <span className="text-xs text-gray-400 uppercase tracking-wider border border-gray-200 rounded px-2 py-1">
                  {m.size}
                </span>
              </div>
              <p className="text-sm text-gray-500">{m.description}</p>
              {"variants" in m && m.variants && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Variants:</span>
                  {m.variants.map((v) => (
                    <Link
                      key={v.href}
                      href={v.href}
                      className="text-xs bg-blue-50 text-ocean px-2.5 py-1 rounded-full hover:bg-coral hover:text-white transition-colors"
                    >
                      {v.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
