import Image from "next/image";
import { siteConfig, credentials, services } from "@/app/data/siteConfig";
import {
  getFeaturedMurals,
  getMuralsByIds,
  getAllClients,
  getFeaturedClients,
  getClientsByIds,
  getAllPublications,
  getAllFestivals,
  getAllExhibitions,
} from "@/db/dal";
import { PrintStyles } from "../_components/PrintStyles";
import { Slide, SlideFooter, SectionLabel, SlideTitle } from "../_components/Slide";
import { InvestmentTiersCards } from "../_components/InvestmentTiers";
import { ContractFlowDetailed } from "../_components/ContractFlow";
import {
  processSteps,
  whatsIncluded,
  storyBlocks,
  getFAQsForAudience,
  type AudienceConfig,
} from "@/app/data/marketing";

interface Props {
  audience?: AudienceConfig;
}

export async function CapabilitiesDeckContent({ audience }: Props) {
  const featuredMurals = audience
    ? await getMuralsByIds(audience.featuredMuralIds)
    : await getFeaturedMurals();
  const featuredClients = audience
    ? await getClientsByIds(audience.featuredClientIds)
    : await getFeaturedClients();
  const [clients, publications, festivals, exhibitions] = await Promise.all([
    getAllClients(),
    getAllPublications(),
    getAllFestivals(),
    getAllExhibitions(),
  ]);
  const totalClients = clients.length;
  const coverImage = audience?.coverImage ?? "/images/murals/protect-your-peace.jpg";
  const heroTagline = audience?.heroTagline ?? "Guided by community, inspired by culture.";
  const heroSubtext = audience?.heroSubtext ?? "Vibrant, large-scale murals that transform spaces,\ntell stories, and create lasting impact.";
  const cta = audience?.cta ?? "Get a Free Consultation";
  const faqs = audience ? getFAQsForAudience(audience.key) : getFAQsForAudience("commercial");

  // Case study murals - fetch all featured murals for fallback
  const allFeaturedMurals = await getFeaturedMurals();
  const molsonCoors = featuredMurals.find((m) => m.id === "molson-coors") ?? allFeaturedMurals.find((m) => m.id === "molson-coors");
  const hawaii = featuredMurals.find((m) => m.id === "you-can-navigate-any-current") ?? allFeaturedMurals.find((m) => m.id === "you-can-navigate-any-current");
  const colombia = featuredMurals.find((m) => m.id === "siempre-estuvimos-aqui") ?? allFeaturedMurals.find((m) => m.id === "siempre-estuvimos-aqui");

  // Pick top 3 case studies from audience murals (or default)
  const caseStudies = audience
    ? featuredMurals.filter((m) => m.client || m.impact).slice(0, 3)
    : [molsonCoors, hawaii, colombia].filter(Boolean);

  return (
    <>
      <PrintStyles size="letter-landscape" />

      <div className="mx-auto print:m-0">

        {/* SLIDE 1: Title */}
        <Slide className="!p-0 flex flex-col justify-center items-center text-center text-white relative">
          <Image
            src={coverImage}
            alt="DREAMSCAPER mural art"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-deep/85 via-ocean/75 to-ocean-light/80" />
          <h1 className="font-display text-[52px] tracking-[12px] relative z-10">{siteConfig.name}</h1>
          <div className="w-20 h-1 bg-coral mx-auto my-5 relative z-10" />
          <p className="text-[14px] text-blue-300 tracking-[4px] uppercase font-light mb-10 relative z-10">
            Professional Mural Services
          </p>
          <p className="text-[20px] font-light text-blue-200 leading-relaxed max-w-[6in] relative z-10">
            <em className="not-italic text-coral-light font-semibold">{heroTagline}</em>
            <br /><br />
            {heroSubtext}
          </p>
          <div className="absolute bottom-[0.5in] text-[10px] text-blue-300 tracking-[2px] z-10">
            {siteConfig.artistName} &nbsp;&bull;&nbsp; {siteConfig.location} &nbsp;&bull;&nbsp; dreamscape-r.art
          </div>
        </Slide>

        {/* SLIDE 2: About */}
        <Slide className="bg-white">
          <SectionLabel>About</SectionLabel>
          <SlideTitle>Meet the Artist</SlideTitle>
          <div className="flex gap-[0.5in]">
            <div className="flex-1">
              <p className="text-[12px] text-gray-500 leading-relaxed mb-3">
                {storyBlocks.origin}
              </p>
              <p className="text-[12px] text-gray-500 leading-relaxed mb-3">
                From a 7,500 sq ft installation at the Molson Coors Factory to empowering school murals in
                Hawaii to international festivals in Colombia and the UK, Rachel brings artistic vision,
                professional reliability, and community awareness to every project.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-sky-50 border-l-4 border-teal px-5 py-4 rounded-r-lg my-4 text-[13px] text-ocean italic leading-relaxed">
                &ldquo;{storyBlocks.pullQuote}&rdquo;
              </div>
              <p className="text-[12px] text-gray-500 leading-relaxed">
                {storyBlocks.nursingConnection}
              </p>
              <div className="flex gap-2 flex-wrap mt-3">
                {[credentials.osha, credentials.insured, credentials.experience, credentials.education].map((c) => (
                  <span key={c} className="bg-ocean-deep text-white text-[8px] px-3 py-1.5 rounded font-semibold uppercase tracking-[0.5px]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-[0.8]">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: "10+", lbl: "Years Experience" },
                  { val: `${totalClients}+`, lbl: "Clients Served" },
                  { val: "7,500", lbl: "Sq Ft Largest Mural" },
                  { val: "4", lbl: "Countries" },
                ].map((s) => (
                  <div key={s.lbl} className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                    <div className="text-[28px] font-extrabold text-coral">{s.val}</div>
                    <div className="text-[9px] uppercase tracking-[1.5px] text-gray-400 mt-1">{s.lbl}</div>
                  </div>
                ))}
              </div>
              {audience && (
                <div className="mt-4 bg-coral/5 border border-coral/20 rounded-lg p-4">
                  <h3 className="text-[11px] font-bold text-coral mb-1">{audience.heroTagline}</h3>
                  <p className="text-[9px] text-gray-500 leading-relaxed">{audience.valueProp}</p>
                </div>
              )}
            </div>
          </div>
          <SlideFooter num={2} />
        </Slide>

        {/* SLIDE 3: Services */}
        <Slide className="bg-white">
          <SectionLabel>Services</SectionLabel>
          <SlideTitle>What We Offer</SlideTitle>
          <p className="text-[14px] text-gray-400 font-light leading-relaxed max-w-[7in] mb-4">
            From corporate headquarters to community centers, every space has a story to tell.
          </p>
          <div className="grid grid-cols-2 gap-5">
            {services.map((svc) => (
              <div key={svc.id} className="border border-gray-200 rounded-lg p-5">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-ocean-deep to-ocean text-white flex items-center justify-center text-[16px] font-extrabold mb-2.5">
                  {svc.title[0]}
                </div>
                <h3 className="text-[14px] font-bold text-ocean-deep mb-1.5">{svc.title}</h3>
                <p className="text-[10px] text-gray-400 leading-relaxed mb-2">{svc.description}</p>
                <div className="flex gap-1 flex-wrap">
                  {svc.examples.map((ex) => (
                    <span key={ex} className="text-[8px] bg-blue-50 text-ocean px-2 py-0.5 rounded-full">{ex}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <SlideFooter num={3} />
        </Slide>

        {/* SLIDE 4: Process */}
        <Slide className="bg-white">
          <SectionLabel>Process</SectionLabel>
          <SlideTitle>How It Works</SlideTitle>
          <p className="text-[14px] text-gray-400 font-light leading-relaxed max-w-[7in] mb-2">
            A collaborative, transparent process from first conversation to final reveal.
          </p>
          <div className="flex gap-3 mt-6 items-start">
            {processSteps.map((step, i, arr) => (
              <div key={step.name} className="contents">
                <div className="flex-1 text-center">
                  <div className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-ocean-deep to-ocean text-white flex items-center justify-center text-[18px] font-extrabold mx-auto mb-2">
                    {i + 1}
                  </div>
                  <h4 className="text-[11px] font-bold text-ocean-deep mb-0.5">{step.name}</h4>
                  <div className="text-[8px] text-coral font-semibold mb-1">{step.timeline}</div>
                  <p className="text-[8px] text-gray-400 leading-relaxed max-w-[1.2in] mx-auto">
                    {step.description.split(".")[0]}.
                  </p>
                </div>
                {i < arr.length - 1 && (
                  <div className="flex items-center justify-center pt-3 text-coral text-[14px] font-extrabold flex-shrink-0">
                    &rarr;
                  </div>
                )}
              </div>
            ))}
          </div>
          <SlideFooter num={4} />
        </Slide>

        {/* SLIDE 5: What to Expect */}
        <Slide className="bg-white">
          <SectionLabel>What to Expect</SectionLabel>
          <SlideTitle>Your Mural Journey</SlideTitle>
          <p className="text-[14px] text-gray-400 font-light leading-relaxed max-w-[7in] mb-5">
            From the first phone call to the final reveal, here&apos;s what working with DREAMSCAPER looks like.
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {processSteps.map((step, i) => (
              <div key={step.name} className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ocean-deep to-ocean text-white flex items-center justify-center text-[14px] font-extrabold flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-[12px] font-bold text-ocean-deep">{step.name}</h4>
                    <span className="text-[9px] text-coral font-semibold">{step.timeline}</span>
                  </div>
                  <p className="text-[9px] text-gray-500 leading-relaxed mt-0.5">{step.description}</p>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {step.deliverables.map((d) => (
                      <span key={d} className="text-[7px] bg-blue-50 text-ocean px-1.5 py-0.5 rounded-full">{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <SlideFooter num={5} />
        </Slide>

        {/* SLIDE 6: Investment */}
        <Slide className="bg-white">
          <SectionLabel>Investment</SectionLabel>
          <SlideTitle>Project Tiers</SlideTitle>
          <p className="text-[14px] text-gray-400 font-light leading-relaxed max-w-[7in] mb-5">
            Every project is unique. We tailor the scope and approach to your space, vision, and goals.
          </p>
          <InvestmentTiersCards note={audience?.pricingNote} />
          <div className="mt-5 flex gap-4 justify-center">
            {whatsIncluded.map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-[9px] text-gray-500">
                <span className="text-teal">&#10003;</span> {item}
              </div>
            ))}
          </div>
          <SlideFooter num={6} />
        </Slide>

        {/* SLIDE 7: Getting Started */}
        <Slide className="bg-white">
          <SectionLabel>Getting Started</SectionLabel>
          <SlideTitle>Ready to Begin?</SlideTitle>
          <div className="flex gap-[0.6in]">
            <div className="flex-1">
              <p className="text-[14px] text-gray-400 font-light leading-relaxed mb-6">
                Starting a mural project is easy. Here&apos;s what the first steps look like.
              </p>
              <ContractFlowDetailed />
            </div>
            <div className="flex-[0.8]">
              <h3 className="text-[14px] font-bold text-ocean-deep mb-4">Common Questions</h3>
              {faqs.slice(0, 4).map((faq) => (
                <div key={faq.question} className="mb-3 pb-3 border-b border-gray-100">
                  <h4 className="text-[11px] font-bold text-gray-800 mb-1">{faq.question}</h4>
                  <p className="text-[9px] text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          <SlideFooter num={7} />
        </Slide>

        {/* SLIDES 8-10: Case Studies */}
        {caseStudies.map((mural, idx) => mural && (
          <Slide key={mural.id} className="bg-white">
            <SectionLabel>Case Study</SectionLabel>
            <SlideTitle>{mural.title}</SlideTitle>
            <div className="flex gap-[0.5in]">
              <div className="flex-1 rounded-lg overflow-hidden min-h-[4in] relative">
                <Image
                  src={mural.images.hero}
                  alt={mural.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex gap-3 flex-wrap mb-3.5">
                  {([
                    mural.client ? { label: "Client", value: mural.client } : null,
                    { label: "Location", value: `${mural.location.city}, ${mural.location.state || mural.location.country}` },
                    mural.dimensions ? { label: "Scale", value: `${mural.dimensions.size} ${mural.dimensions.unit}` } : null,
                    { label: "Year", value: String(mural.year) },
                  ].filter((m): m is { label: string; value: string } => m !== null)).map((m) => (
                    <div key={m.label} className="text-[9px] text-gray-500">
                      <strong className="text-ocean-deep block text-[8px] uppercase tracking-wider mb-0.5">{m.label}</strong>
                      {m.value}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-3">{mural.description}</p>
                {mural.impact && (
                  <div className="bg-amber-50 border-l-[3px] border-coral rounded-r-md p-3 mb-3">
                    <div className="text-[8px] font-bold uppercase tracking-wider text-coral mb-1">Impact</div>
                    <p className="text-[9px] text-amber-800 leading-snug">{mural.impact}</p>
                  </div>
                )}
                <div className="text-[10px] text-ocean italic leading-relaxed border-l-[3px] border-teal pl-3">
                  &ldquo;{mural.artistNote}&rdquo;
                </div>
              </div>
            </div>
            <SlideFooter num={8 + idx} />
          </Slide>
        ))}

        {/* SLIDE 11: Clients */}
        <Slide className="bg-white">
          <SectionLabel>Clients</SectionLabel>
          <SlideTitle>Organizations We&apos;ve Worked With</SlideTitle>
          <p className="text-[14px] text-gray-400 font-light mb-4">
            {totalClients}+ clients across corporate, education, nonprofit, restaurant, and community sectors.
          </p>
          <div className="space-y-5">
            {[
              { title: "Corporate & Commercial", cats: ["corporate"] as const },
              { title: "Restaurants & Hospitality", cats: ["restaurant"] as const },
              { title: "Education & Nonprofits", cats: ["education", "nonprofit"] as const },
              { title: "Community & Arts", cats: ["community"] as const },
            ].map((group) => (
              <div key={group.title}>
                <h3 className="text-[11px] font-bold text-ocean-deep uppercase tracking-[2px] mb-2 pb-1 border-b border-gray-200">
                  {group.title}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {clients
                    .filter((c) => (group.cats as readonly string[]).includes(c.category))
                    .map((c) => (
                      <span
                        key={c.id}
                        className={`text-[9px] px-3 py-1.5 rounded-md border ${
                          c.featured
                            ? "bg-ocean-deep text-white border-ocean-deep font-semibold"
                            : "bg-gray-50 text-gray-500 border-gray-200"
                        }`}
                      >
                        {c.name}
                        {c.projectSize && (
                          <span className={`text-[7px] ml-1 ${c.featured ? "text-blue-300" : "text-gray-300"}`}>
                            {c.projectSize}
                          </span>
                        )}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <SlideFooter num={8 + caseStudies.length} />
        </Slide>

        {/* SLIDE 12: Press & Festivals */}
        <Slide className="bg-white">
          <SectionLabel>Recognition</SectionLabel>
          <SlideTitle>Press, Festivals & Exhibitions</SlideTitle>
          <div className="flex gap-[0.5in]">
            <div className="flex-1">
              <h3 className="text-[14px] font-bold text-ocean-deep mb-1">Featured In</h3>
              <div className="w-[30px] h-[3px] bg-coral mb-4" />
              {publications.map((pub) => (
                <div key={pub.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <span className="text-[11px] font-semibold text-gray-800">{pub.outlet}</span>
                    <span className="text-[9px] text-gray-400 ml-2">{pub.year}</span>
                  </div>
                  <span className={`text-[8px] text-white px-2 py-0.5 rounded-full uppercase tracking-[0.5px] ${
                    pub.type === "tv" ? "bg-red-500" :
                    pub.type === "magazine" ? "bg-violet-500" :
                    pub.type === "museum" ? "bg-emerald-600" :
                    "bg-blue-500"
                  }`}>
                    {pub.type}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex-1">
              <h3 className="text-[14px] font-bold text-ocean-deep mb-1">Mural Festivals</h3>
              <div className="w-[30px] h-[3px] bg-coral mb-4" />
              {festivals.map((fest) => (
                <div key={fest.id} className="py-2 border-b border-gray-100">
                  <span className="text-[11px] font-semibold text-gray-800">{fest.name}</span>
                  {fest.international && (
                    <span className="text-[7px] bg-coral text-white px-1.5 py-0.5 rounded-full ml-1.5 font-semibold uppercase">
                      International
                    </span>
                  )}
                  <br />
                  <span className="text-[9px] text-gray-400">{fest.location} &bull; {fest.year}</span>
                </div>
              ))}
              <h3 className="text-[14px] font-bold text-ocean-deep mb-1 mt-5">Gallery Exhibitions</h3>
              <div className="w-[30px] h-[3px] bg-coral mb-4" />
              {exhibitions.map((ex) => (
                <div key={ex.id} className="py-2 border-b border-gray-100">
                  <span className="text-[11px] font-semibold text-gray-800">
                    &ldquo;{ex.title}&rdquo; ({ex.type === "solo" ? "Solo" : "Collaborative"})
                  </span>
                  <br />
                  <span className="text-[9px] text-gray-400">{ex.venue}, {ex.location} &bull; {ex.year}</span>
                </div>
              ))}
            </div>
          </div>
          <SlideFooter num={9 + caseStudies.length} />
        </Slide>

        {/* SLIDE 13: CTA */}
        <Slide className="!p-0 flex flex-col justify-center items-center text-center text-white print:break-after-avoid relative">
          <Image
            src="/images/murals/la-rumba-denver.jpg"
            alt="DREAMSCAPER mural"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-deep/90 via-ocean/80 to-ocean-light/85" />
          <h2 className="text-[36px] font-extrabold mb-2.5 leading-tight relative z-10">
            Ready to <em className="not-italic text-coral-light">Transform</em><br />Your Space?
          </h2>
          <p className="text-[14px] text-blue-300 font-light mb-10 max-w-[5in] leading-relaxed relative z-10">
            Let&apos;s start with a free consultation to discuss your vision, space, and how a
            custom mural can make an impact.
          </p>
          <div className="bg-white/10 border border-white/20 rounded-xl px-12 py-8 backdrop-blur-sm relative z-10">
            <div className="text-[18px] font-bold mb-1.5">{siteConfig.artistName}</div>
            <div className="text-[11px] text-blue-300 tracking-[2px] uppercase mb-4">{siteConfig.title}</div>
            <div className="text-[14px] text-coral-light font-semibold mb-1">{siteConfig.email}</div>
            <div className="text-[11px] text-blue-300 tracking-wider">dreamscape-r.art &nbsp;&bull;&nbsp; @dreamscape_r</div>
            {audience && (
              <div className="mt-4 bg-coral text-white text-[12px] font-bold px-6 py-2.5 rounded uppercase tracking-wider">
                {cta}
              </div>
            )}
          </div>
          <div className="mt-8 flex gap-3 relative z-10">
            {["OSHA Certified", "Insured", "10+ Years", "Nationwide & International"].map((c) => (
              <span key={c} className="text-[8px] px-3 py-1 border border-white/30 rounded text-blue-300 uppercase tracking-wider">
                {c}
              </span>
            ))}
          </div>
        </Slide>

      </div>
    </>
  );
}
