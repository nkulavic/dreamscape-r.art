import Image from "next/image";
import { siteConfig, services } from "@/app/data/siteConfig";
import {
  getFeaturedMurals,
  getMuralsBySlugs,
  getFeaturedClients,
  getClientsBySlugs,
  getAllClients,
  getAllPublications,
  getAllFestivals,
  getAllExhibitions,
} from "@/db/dal";
import { PrintStyles } from "../_components/PrintStyles";
import { SectionTitle } from "../_components/SectionTitle";
import { CredentialBadges } from "../_components/CredentialBadges";
import { ProcessTimelineMini } from "../_components/ProcessTimeline";
import { InvestmentTiersCompact } from "../_components/InvestmentTiers";
import { ContractFlowCompact } from "../_components/ContractFlow";
import { storyBlocks, type AudienceConfig } from "@/app/data/marketing";

interface Props {
  audience?: AudienceConfig;
}

export async function LeaveBehindContent({ audience }: Props) {
  const featuredMurals = audience
    ? await getMuralsBySlugs(audience.featuredMuralSlugs)
    : await getFeaturedMurals();
  const featuredClients = audience
    ? await getClientsBySlugs(audience.featuredClientSlugs)
    : await getFeaturedClients();
  const [allClients, publications, festivals, exhibitions] = await Promise.all([
    getAllClients(),
    getAllPublications(),
    getAllFestivals(),
    getAllExhibitions(),
  ]);
  const totalClients = allClients.length;
  const tagline = audience?.heroTagline ?? "Transforming Spaces with Vibrant, Large-Scale Murals";

  return (
    <>
      <PrintStyles />

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
        <div className="bg-ocean-deep text-white text-center py-2 px-[0.5in] text-[12px] tracking-[3px] uppercase font-light">
          {tagline}
        </div>

        {/* Stats row */}
        <div className="flex justify-center bg-gray-50 border-b border-gray-200 py-2 px-[0.5in]">
          {[
            { value: "10+", label: "Years Experience" },
            { value: `${totalClients}+`, label: "Clients Served" },
            { value: "7,500", label: "Sq Ft Largest Mural" },
            { value: "4", label: "Countries" },
            { value: `${festivals.length}`, label: "Mural Festivals" },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              className={`flex-1 text-center py-0.5 ${i < arr.length - 1 ? "border-r border-gray-200" : ""}`}
            >
              <div className="text-[18px] font-extrabold text-coral">{stat.value}</div>
              <div className="text-[7px] uppercase tracking-[1.5px] text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex gap-[0.25in] px-[0.4in] pt-[0.2in]">
          {/* Left column */}
          <div className="flex-[1.1]">
            {audience && (
              <>
                <SectionTitle>Why {audience.label === "Community / Nonprofit" ? "Community Art" : audience.label}</SectionTitle>
                <p className="text-[8px] text-gray-500 leading-snug mb-2">{audience.valueProp}</p>
                <ul className="text-[7.5px] text-gray-500 space-y-0.5 mb-3 pl-2">
                  {audience.benefits.map((b) => (
                    <li key={b} className="flex gap-1">
                      <span className="text-coral flex-shrink-0">&#10003;</span> {b}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <SectionTitle>Services</SectionTitle>
            {services.map((svc) => (
              <div key={svc.id} className="mb-2 pl-2.5 border-l-[3px] border-teal">
                <h3 className="text-[10px] font-bold text-gray-800">{svc.title}</h3>
                <p className="text-[7.5px] text-gray-400 leading-snug">{svc.description}</p>
              </div>
            ))}

            <SectionTitle className="mt-2">The Process</SectionTitle>
            <ProcessTimelineMini />

            <SectionTitle className="mt-2">Investment</SectionTitle>
            <InvestmentTiersCompact note={audience?.pricingNote} />

            <SectionTitle className="mt-2">Getting Started</SectionTitle>
            <ContractFlowCompact />
          </div>

          {/* Right column */}
          <div className="flex-[0.9]">
            <SectionTitle>Featured Work</SectionTitle>
            <div className="grid grid-cols-3 gap-1 mb-2">
              {featuredMurals.slice(0, 6).map((mural) => (
                <div key={mural.id} className="relative h-[0.65in] rounded overflow-hidden">
                  <Image
                    src={mural.images.hero}
                    alt={mural.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Why Rachel callout */}
            <div className="bg-blue-50 border-l-[3px] border-teal px-2.5 py-2 mb-2 rounded-r">
              <h3 className="text-[9px] font-bold text-ocean-deep uppercase tracking-wider mb-1">Why Rachel</h3>
              <ul className="text-[7px] text-gray-500 space-y-0.5">
                {storyBlocks.differentiators.slice(0, 4).map((d) => (
                  <li key={d} className="flex gap-1">
                    <span className="text-coral flex-shrink-0">&#10003;</span> {d}
                  </li>
                ))}
              </ul>
            </div>

            <SectionTitle>Notable Clients</SectionTitle>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mb-2">
              {(audience ? featuredClients : [...featuredClients, ...allClients.filter((c) => !c.featured).slice(0, 10)].slice(0, 16)).map((client) => (
                <div key={client.id} className="text-[8px] text-gray-500 py-0.5 border-b border-dotted border-gray-200">
                  {client.name}
                  {client.projectSize && (
                    <span className="text-[7px] text-gray-300 ml-1">{client.projectSize}</span>
                  )}
                </div>
              ))}
            </div>

            <SectionTitle>Featured In</SectionTitle>
            <div className="flex gap-1.5 flex-wrap mb-2 text-[7.5px] text-gray-400 italic">
              {publications.map((pub, i) => (
                <span key={pub.id}>
                  {pub.outlet}{i < publications.length - 1 && <span className="not-italic ml-1.5">&bull;</span>}
                </span>
              ))}
            </div>

            <SectionTitle>Credentials</SectionTitle>
            <CredentialBadges size="xs" />

            <SectionTitle className="mt-2">Festival Experience</SectionTitle>
            <div className="flex gap-1 flex-wrap mb-2">
              {festivals.map((fest) => (
                <span
                  key={fest.id}
                  className={`text-[7px] px-1.5 py-0.5 rounded-full border ${
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
            <div className="flex gap-1 flex-wrap">
              {exhibitions.map((ex) => (
                <span key={ex.id} className="text-[7px] px-1.5 py-0.5 rounded-full border border-gray-300 text-gray-500">
                  &ldquo;{ex.title}&rdquo; &mdash; {ex.venue} ({ex.type === "solo" ? "Solo" : "Collab"}, {ex.year})
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-br from-ocean-deep to-ocean flex justify-between items-center px-[0.5in] py-3">
          <div className="text-[13px] text-white font-light tracking-wide">
            Ready to <strong className="font-bold text-coral-light">transform your space</strong>?
          </div>
          <div className="text-right">
            <span className="inline-block bg-coral text-white text-[9px] font-bold px-4 py-1.5 rounded tracking-wider uppercase">
              {audience?.cta ?? "Get a Free Consultation"}
            </span>
            <span className="block text-[8px] text-blue-300 mt-0.5 tracking-wider">
              dreamscape-r.art &bull; @dreamscape_r
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
