import Image from "next/image";
import { siteConfig, credentials, services } from "@/app/data/siteConfig";
import { clients, getFeaturedClients } from "@/app/data/clients";
import { publications, festivals, exhibitions } from "@/app/data/experience";
import { getFeaturedMurals } from "@/app/data/murals";

export const metadata = { title: "Leave-Behind | Marketing" };

export default function LeaveBehindPage() {
  const featuredClients = getFeaturedClients();
  const featuredMurals = getFeaturedMurals();
  const totalClients = clients.length;
  const internationalFestivals = festivals.filter((f) => f.international);

  return (
    <>
      <style>{`
        @media print {
          @page { size: letter; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <div className="w-[8.5in] h-[11in] mx-auto bg-white relative overflow-hidden print:m-0 shadow-xl print:shadow-none">
        {/* Accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-ocean-deep via-ocean-light via-teal to-coral" />

        {/* Header */}
        <div className="flex justify-between items-center px-[0.5in] pt-3 pb-2">
          <div className="flex items-baseline gap-3">
            <h1 className="font-display text-[28px] tracking-[6px] text-ocean-deep">
              {siteConfig.name}
            </h1>
            <span className="w-0.5 h-5 bg-coral inline-block" />
            <span className="text-[11px] text-gray-400 tracking-[2px] uppercase">
              {siteConfig.title}
            </span>
          </div>
          <div className="text-right text-[9px] text-gray-400 leading-relaxed">
            <strong className="text-ocean-deep text-[10px]">{siteConfig.artistName}</strong><br />
            {siteConfig.email}<br />
            {siteConfig.location} &bull; Nationwide & International
          </div>
        </div>

        {/* Tagline bar */}
        <div className="bg-ocean-deep text-white text-center py-2.5 px-[0.5in] text-[13px] tracking-[3px] uppercase font-light">
          Transforming Spaces with Vibrant, Large-Scale Murals
        </div>

        {/* Stats row */}
        <div className="flex justify-center bg-gray-50 border-b border-gray-200 py-3 px-[0.5in]">
          {[
            { value: "10+", label: "Years Experience" },
            { value: `${totalClients}+`, label: "Clients Served" },
            { value: "7,500", label: "Sq Ft Largest Mural" },
            { value: "4", label: "Countries" },
            { value: `${festivals.length}`, label: "Mural Festivals" },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              className={`flex-1 text-center py-1 ${i < arr.length - 1 ? "border-r border-gray-200" : ""}`}
            >
              <div className="text-[22px] font-extrabold text-coral">{stat.value}</div>
              <div className="text-[8px] uppercase tracking-[1.5px] text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex gap-[0.3in] px-[0.5in] pt-[0.25in]">
          {/* Left column */}
          <div className="flex-[1.1]">
            <SectionTitle>Services</SectionTitle>
            {services.map((svc) => (
              <div key={svc.id} className="mb-3 pl-2.5 border-l-[3px] border-teal">
                <h3 className="text-[11px] font-bold text-gray-800">{svc.title}</h3>
                <p className="text-[8.5px] text-gray-400 leading-snug">{svc.description}</p>
                <div className="text-[8px] text-gray-300 mt-0.5">
                  {svc.examples.join(" \u2022 ")}
                </div>
              </div>
            ))}

            <SectionTitle className="mt-4">The Process</SectionTitle>
            <div className="flex gap-2 mb-3">
              {["Consult", "Concept", "Design", "Paint", "Reveal"].map((step, i) => (
                <div key={step} className="flex-1 text-center bg-blue-50 rounded-md py-2 px-1">
                  <span className="inline-block w-5 h-5 leading-5 rounded-full bg-ocean-deep text-white text-[9px] font-bold mb-0.5">
                    {i + 1}
                  </span>
                  <span className="block text-[7.5px] font-semibold text-gray-800 uppercase tracking-[0.5px]">
                    {step}
                  </span>
                </div>
              ))}
            </div>

            <SectionTitle>Credentials & Certifications</SectionTitle>
            <div className="flex gap-2 flex-wrap mb-3">
              {[credentials.osha, credentials.insured, credentials.experience, credentials.education].map((c) => (
                <span key={c} className="bg-ocean-deep text-white text-[7.5px] px-2.5 py-1 rounded font-semibold tracking-[0.5px] uppercase">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex-[0.9]">
            <SectionTitle>Featured Work</SectionTitle>
            <div className="grid grid-cols-3 gap-1 mb-3">
              {featuredMurals.slice(0, 6).map((mural) => (
                <div key={mural.id} className="relative h-[0.7in] rounded overflow-hidden">
                  <Image
                    src={mural.images.hero}
                    alt={mural.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <SectionTitle>Notable Clients</SectionTitle>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 mb-3">
              {[...featuredClients, ...clients.filter((c) => !c.featured).slice(0, 10)].slice(0, 16).map((client) => (
                <div key={client.id} className="text-[8.5px] text-gray-500 py-0.5 border-b border-dotted border-gray-200">
                  {client.name}
                  {client.projectSize && (
                    <span className="text-[7.5px] text-gray-300 ml-1">{client.projectSize}</span>
                  )}
                </div>
              ))}
            </div>

            <SectionTitle>Featured In</SectionTitle>
            <div className="flex gap-2 flex-wrap mb-3 text-[8px] text-gray-400 italic">
              {publications.map((pub, i) => (
                <span key={pub.id}>
                  {pub.outlet}{i < publications.length - 1 && <span className="not-italic ml-2">&bull;</span>}
                </span>
              ))}
            </div>

            <SectionTitle>Festival Experience</SectionTitle>
            <div className="flex gap-1.5 flex-wrap mb-3">
              {festivals.map((fest) => (
                <span
                  key={fest.id}
                  className={`text-[7.5px] px-2 py-0.5 rounded-full border ${
                    fest.international
                      ? "border-coral text-coral font-semibold"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {fest.name} ({fest.location.split(",")[0].trim()})
                </span>
              ))}
            </div>

            <SectionTitle>Gallery Exhibitions</SectionTitle>
            <div className="flex gap-1.5 flex-wrap mb-3">
              {exhibitions.map((ex) => (
                <span key={ex.id} className="text-[7.5px] px-2 py-0.5 rounded-full border border-gray-300 text-gray-500">
                  &ldquo;{ex.title}&rdquo; &mdash; {ex.venue} ({ex.type === "solo" ? "Solo" : "Collab"}, {ex.year})
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-br from-ocean-deep to-ocean flex justify-between items-center px-[0.5in] py-3.5">
          <div className="text-[14px] text-white font-light tracking-wide">
            Ready to <strong className="font-bold text-coral-light">transform your space</strong>?
          </div>
          <div className="text-right">
            <span className="inline-block bg-coral text-white text-[10px] font-bold px-5 py-2 rounded tracking-wider uppercase">
              Get a Free Consultation
            </span>
            <span className="block text-[9px] text-blue-300 mt-1 tracking-wider">
              dreamscape-r.art &bull; @dreamscape_r
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-[11px] font-bold uppercase tracking-[2px] text-ocean-deep border-b-2 border-coral pb-1 mb-2.5 ${className}`}>
      {children}
    </h2>
  );
}
