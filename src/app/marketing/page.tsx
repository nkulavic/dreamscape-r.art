import Link from "next/link";

const materials = [
  {
    href: "/marketing/leave-behind",
    title: "One-Page Leave-Behind",
    description: "8.5\" x 11\" sell sheet with services, stats, clients, credentials, and CTA.",
    size: "Letter",
  },
  {
    href: "/marketing/brochure",
    title: "Tri-Fold Brochure",
    description: "11\" x 8.5\" landscape, 6 panels: cover, story, services, portfolio, contact, social.",
    size: "Letter Landscape",
  },
  {
    href: "/marketing/capabilities-deck",
    title: "Capabilities Deck",
    description: "10-slide presentation with case studies, full client list, press, and process overview.",
    size: "Letter Landscape",
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
            <Link
              key={m.href}
              href={m.href}
              className="block bg-white rounded-lg border border-gray-200 p-6 hover:border-coral hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-ocean-deep group-hover:text-coral transition-colors">
                    {m.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{m.description}</p>
                </div>
                <span className="text-xs text-gray-400 uppercase tracking-wider border border-gray-200 rounded px-2 py-1">
                  {m.size}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
