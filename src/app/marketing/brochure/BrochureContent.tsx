import Image from "next/image";
import { siteConfig, credentials, services } from "@/app/data/siteConfig";
import {
  getFeaturedMurals,
  getMuralsBySlugs,
  getFeaturedClients,
  getClientsBySlugs,
  getAllPublications,
} from "@/db/dal";
import { PrintStyles } from "../_components/PrintStyles";
import { Panel } from "../_components/Panel";
import { ProcessTimelineCompact } from "../_components/ProcessTimeline";
import { InvestmentTiersCompact } from "../_components/InvestmentTiers";
import { ContractFlowCompact } from "../_components/ContractFlow";
import { storyBlocks, type AudienceConfig } from "@/app/data/marketing";

interface Props {
  audience?: AudienceConfig;
}

export async function BrochureContent({ audience }: Props) {
  const featuredMurals = audience
    ? await getMuralsBySlugs(audience.featuredMuralSlugs)
    : await getFeaturedMurals();
  const featuredClients = audience
    ? await getClientsBySlugs(audience.featuredClientSlugs)
    : await getFeaturedClients();
  const publications = await getAllPublications();
  const coverImage = audience?.coverImage ?? "/images/murals/protect-your-peace.jpg";
  const heroTagline = audience?.heroTagline ?? "Guided by community, inspired by culture.";
  const heroSubtext = audience?.heroSubtext ?? "Vibrant, large-scale murals that transform spaces and tell stories.";

  return (
    <>
      <PrintStyles size="letter-landscape" />

      {/* ========== OUTSIDE (Side 1) ========== */}
      <div className="w-[11in] h-[8.5in] mx-auto flex print:m-0 shadow-xl print:shadow-none print:break-after-page">
        {/* Back Flap */}
        <Panel className="bg-gray-50 flex flex-col justify-center items-center text-center">
          <div className="w-[1.2in] h-[1.2in] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-[9px] text-gray-400 mb-4">
            QR Code<br />to Portfolio
          </div>
          <div className="text-[9px] text-gray-500 leading-loose">
            <strong className="text-ocean-deep">Follow the Journey</strong><br /><br />
            Instagram: @dreamscape_r<br />
            Facebook: /Dreamscapesbydesign<br />
            TikTok: @dreamscapes_design<br />
            YouTube: DREAMSCAPER<br />
            Pinterest: /Dreamscape_r<br />
            LinkedIn: /dreamscapeart
          </div>
        </Panel>

        {/* Contact Panel */}
        <Panel className="bg-white flex flex-col justify-center border-l border-dashed border-gray-200 print:border-0">
          <h2 className="text-[18px] font-extrabold text-ocean-deep tracking-[2px] uppercase mb-5">
            Let&apos;s Create<br />Together
          </h2>
          <div className="text-[10px] text-gray-500 leading-loose mb-5 space-y-3">
            <p><strong className="text-gray-800">{siteConfig.artistName}</strong><br />{siteConfig.title}</p>
            <p><strong className="text-gray-800">Email</strong><br />{siteConfig.email}</p>
            <p><strong className="text-gray-800">Based in</strong><br />{siteConfig.location}<br />Available nationwide & internationally</p>
            <p><strong className="text-gray-800">Portfolio</strong><br />dreamscaper.art</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[credentials.osha, credentials.insured, credentials.experience].map((c) => (
              <span key={c} className="bg-ocean-deep text-white text-[7px] px-2 py-1 rounded font-semibold tracking-[0.5px] uppercase">
                {c}
              </span>
            ))}
          </div>
        </Panel>

        {/* Cover Panel */}
        <Panel className="text-white flex flex-col justify-center items-center text-center px-[0.5in] border-l border-dashed border-gray-200 print:border-0">
          <Image
            src={coverImage}
            alt="DREAMSCAPER mural"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-deep/85 via-ocean/75 to-ocean-light/80" />
          <h1 className="font-display text-[32px] tracking-[8px] relative z-10">{siteConfig.name}</h1>
          <div className="w-[60px] h-[3px] bg-coral mx-auto my-4 relative z-10" />
          <p className="text-[11px] tracking-[3px] uppercase font-light text-blue-300 mb-8 relative z-10">
            {siteConfig.title}
          </p>
          <p className="text-[15px] font-light leading-relaxed text-blue-200 max-w-[2.5in] relative z-10">
            <em className="not-italic text-coral-light font-semibold">{heroTagline}</em>
            <br /><br />
            {heroSubtext}
          </p>
          <span className="absolute bottom-[0.4in] text-[9px] text-blue-300 tracking-[2px] z-10">
            dreamscaper.art
          </span>
        </Panel>
      </div>

      {/* ========== INSIDE (Side 2) ========== */}
      <div className="w-[11in] h-[8.5in] mx-auto flex print:m-0 shadow-xl print:shadow-none mt-8 print:mt-0">
        {/* Story Panel */}
        <Panel className="bg-white">
          <h2 className="text-[16px] font-extrabold text-ocean-deep tracking-wider uppercase mb-1.5">
            The Artist
          </h2>
          <div className="w-10 h-[3px] bg-coral mb-3" />
          <p className="text-[8.5px] text-gray-500 leading-relaxed mb-2">
            {storyBlocks.origin}
          </p>
          <p className="text-[8.5px] text-gray-500 leading-relaxed mb-2">
            From a 7,500 sq ft installation at Molson Coors to community murals celebrating
            cultural heritage in Colombia, Rachel brings a unique blend of artistic vision and
            professional reliability to every project.
          </p>
          <div className="bg-blue-50 border-l-[3px] border-teal px-3 py-2 my-2 text-[8.5px] text-ocean italic leading-relaxed">
            &ldquo;{storyBlocks.pullQuote}&rdquo;
          </div>
          <p className="text-[8.5px] text-gray-500 leading-relaxed mb-2">
            {storyBlocks.nursingConnection}
          </p>

          {audience && (
            <div className="bg-coral/5 border border-coral/20 rounded px-2.5 py-2 mb-2">
              <h3 className="text-[8px] font-bold text-coral uppercase tracking-wider mb-1">{audience.heroTagline}</h3>
              <p className="text-[7.5px] text-gray-500 leading-snug">{audience.valueProp}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { val: "10+", lbl: "Years Experience" },
              { val: "35+", lbl: "Clients" },
              { val: "4", lbl: "Countries" },
              { val: "6", lbl: "Festivals" },
            ].map((s) => (
              <div key={s.lbl} className="text-center bg-gray-50 rounded py-1.5">
                <div className="text-[16px] font-extrabold text-coral">{s.val}</div>
                <div className="text-[7px] uppercase tracking-wider text-gray-400 mt-0.5">{s.lbl}</div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Services + Process + Investment Panel */}
        <Panel className="bg-[#fafbff] border-l border-r border-dashed border-gray-200 print:border-0">
          <h2 className="text-[14px] font-extrabold text-ocean-deep tracking-wider uppercase mb-1">
            Services & Process
          </h2>
          <div className="w-10 h-[3px] bg-coral mb-2" />

          {services.map((svc, i) => (
            <div key={svc.id} className={`mb-2 pb-2 ${i < services.length - 1 ? "border-b border-gray-200" : ""}`}>
              <h3 className="text-[10px] font-bold text-ocean-deep mb-0.5">{svc.title}</h3>
              <p className="text-[7.5px] text-gray-400 leading-snug">{svc.description}</p>
            </div>
          ))}

          {/* Process mini */}
          <div className="bg-ocean-deep rounded-md p-2.5 mt-1 mb-2">
            <div className="text-[8px] text-blue-300 uppercase tracking-[2px] font-semibold mb-1.5">The Process</div>
            <div className="flex justify-between">
              {["Discovery", "Site Visit", "Design", "Contract", "Paint", "Reveal"].map((step, i) => (
                <div key={step} className="text-center text-white">
                  <span className="block text-[12px] font-extrabold text-coral">{i + 1}</span>
                  <span className="text-[6px] uppercase tracking-[0.3px] text-blue-300">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Investment teaser */}
          <div className="border border-gray-200 rounded-md p-2.5 mb-2">
            <div className="text-[8px] font-bold text-ocean-deep uppercase tracking-wider mb-1.5">Investment</div>
            <InvestmentTiersCompact note={audience?.pricingNote} />
          </div>

          {/* Getting Started */}
          <div className="border border-gray-200 rounded-md p-2.5">
            <div className="text-[8px] font-bold text-ocean-deep uppercase tracking-wider mb-1.5">Getting Started</div>
            <ContractFlowCompact />
          </div>
        </Panel>

        {/* Portfolio Panel */}
        <Panel className="bg-white">
          <h2 className="text-[16px] font-extrabold text-ocean-deep tracking-wider uppercase mb-1.5">
            Portfolio
          </h2>
          <div className="w-10 h-[3px] bg-coral mb-3" />

          {featuredMurals.slice(0, 4).map((mural) => (
            <div key={mural.id} className="mb-2.5 pb-2 border-b border-gray-100 flex gap-2">
              <div className="w-[0.65in] h-[0.5in] rounded overflow-hidden flex-shrink-0 relative">
                <Image
                  src={mural.images.hero}
                  alt={mural.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                {mural.client && (
                  <div className="text-[7px] text-coral font-semibold">{mural.client}</div>
                )}
                <div className="text-[9px] font-bold text-gray-800">{mural.title}</div>
                <div className="text-[7px] text-gray-400 leading-snug mt-0.5">
                  {mural.dimensions ? `${mural.dimensions.size} ${mural.dimensions.unit} — ` : ""}
                  {mural.location.city}, {mural.location.state || mural.location.country}
                </div>
              </div>
            </div>
          ))}

          <div className="mt-2">
            <h3 className="text-[9px] font-bold uppercase tracking-[1.5px] text-ocean-deep mb-2">Trusted By</h3>
            <div className="grid grid-cols-2 gap-1">
              {featuredClients.slice(0, 6).map((c) => (
                <div key={c.id} className="text-[8px] text-gray-500 bg-gray-50 rounded text-center py-1 px-1.5">
                  {c.name.split("/")[0].trim()}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-gray-200">
            <h3 className="text-[9px] font-bold uppercase tracking-[1.5px] text-ocean-deep mb-1.5">As Seen In</h3>
            <p className="text-[8px] text-gray-400 italic leading-relaxed">
              {publications.slice(0, 5).map((p) => p.outlet).join(" \u2022 ")}
            </p>
          </div>

          {audience && (
            <div className="mt-3 pt-2 border-t border-coral/30">
              <div className="bg-coral text-white text-center py-2 rounded text-[9px] font-bold uppercase tracking-wider">
                {audience.cta}
              </div>
              <p className="text-[7px] text-gray-400 text-center mt-1">{siteConfig.email}</p>
            </div>
          )}
        </Panel>
      </div>
    </>
  );
}
