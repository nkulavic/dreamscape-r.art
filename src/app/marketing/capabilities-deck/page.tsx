import Image from "next/image";
import { siteConfig, credentials, services } from "@/app/data/siteConfig";
import { clients, getFeaturedClients } from "@/app/data/clients";
import { publications, festivals, exhibitions } from "@/app/data/experience";
import { getFeaturedMurals } from "@/app/data/murals";

export const metadata = { title: "Capabilities Deck | Marketing" };

function Slide({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-[11in] h-[8.5in] p-[0.6in] relative overflow-hidden print:break-after-page ${className}`}>
      {children}
    </div>
  );
}

function SlideFooter({ num }: { num: number }) {
  return (
    <>
      <div className="absolute bottom-[0.7in] left-[0.7in] right-[0.7in] h-px bg-gray-200" />
      <div className="absolute bottom-[0.35in] left-[0.5in] text-[8px] text-gray-400 tracking-wider">
        DREAMSCAPER &bull; Professional Mural Services
      </div>
      <div className="absolute bottom-[0.35in] right-[0.5in] text-[9px] text-gray-400">
        {num}
      </div>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] uppercase tracking-[3px] text-gray-400 mb-2">
      <span className="inline-block w-2 h-2 rounded-full bg-coral mr-2 align-middle" />
      {children}
    </div>
  );
}

function SlideTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[32px] font-extrabold text-ocean-deep leading-tight mb-5">
      {children}
    </h2>
  );
}

export default function CapabilitiesDeckPage() {
  const featuredMurals = getFeaturedMurals();
  const featuredClients = getFeaturedClients();
  const totalClients = clients.length;

  // Case study murals
  const molsonCoors = featuredMurals.find((m) => m.id === "molson-coors");
  const hawaii = featuredMurals.find((m) => m.id === "you-can-navigate-any-current");
  const colombia = featuredMurals.find((m) => m.id === "siempre-estuvimos-aqui");

  return (
    <>
      <style>{`
        @media print {
          @page { size: letter landscape; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <div className="mx-auto print:m-0">

        {/* SLIDE 1: Title */}
        <Slide className="!p-0 flex flex-col justify-center items-center text-center text-white relative">
          <Image
            src="/images/murals/protect-your-peace.jpg"
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
            <em className="not-italic text-coral-light font-semibold">Guided by community, inspired by culture.</em>
            <br /><br />
            Vibrant, large-scale murals that transform spaces,<br />
            tell stories, and create lasting impact.
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
                {siteConfig.artistName} is a Denver-based professional muralist with over a decade of experience
                creating vibrant, large-scale artwork across the United States and internationally.
              </p>
              <p className="text-[12px] text-gray-500 leading-relaxed mb-3">
                From a 7,500 sq ft installation at the Molson Coors Factory to empowering school murals in
                Hawaii to international festivals in Colombia and the UK, Rachel brings artistic vision,
                professional reliability, and community awareness to every project.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-sky-50 border-l-4 border-teal px-5 py-4 rounded-r-lg my-4 text-[13px] text-ocean italic leading-relaxed">
                &ldquo;Every mural is a conversation between the space, the people, and the story waiting to
                be told. I believe art has the power to transform not just walls, but the communities
                around them.&rdquo;
              </div>
              <p className="text-[12px] text-gray-500 leading-relaxed">
                With a background in nursing (RN, BSN), Rachel brings deep empathy to her practice,
                ensuring every piece resonates authentically with its audience and environment.
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
            {services.map((svc, i) => (
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
          <div className="flex gap-4 mt-8 items-start">
            {[
              { name: "Consultation", desc: "We discuss your vision, space, timeline, and goals. Whether it\u2019s brand identity, community message, or personal expression, we start by listening." },
              { name: "Concept", desc: "Based on our conversation, I develop initial concepts that capture your vision while bringing creative expertise to the design." },
              { name: "Design", desc: "The chosen concept is refined into a detailed design mockup. You\u2019ll see exactly how the mural will look on your wall before any paint is applied." },
              { name: "Painting", desc: "Using professional-grade materials and techniques, the mural comes to life. OSHA-certified for safe operation on any scale." },
              { name: "Reveal", desc: "Your completed mural is unveiled. High-resolution photos document the finished work for your use in marketing and social media." },
            ].map((step, i, arr) => (
              <div key={step.name} className="contents">
                <div className="flex-1 text-center">
                  <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-ocean-deep to-ocean text-white flex items-center justify-center text-[20px] font-extrabold mx-auto mb-2.5">
                    {i + 1}
                  </div>
                  <h4 className="text-[13px] font-bold text-ocean-deep mb-1.5">{step.name}</h4>
                  <p className="text-[9px] text-gray-400 leading-relaxed max-w-[1.6in] mx-auto">{step.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="flex items-center justify-center pt-3 text-coral text-[18px] font-extrabold flex-shrink-0">
                    &rarr;
                  </div>
                )}
              </div>
            ))}
          </div>
          <SlideFooter num={4} />
        </Slide>

        {/* SLIDE 5: Case Study - Molson Coors */}
        {molsonCoors && (
          <Slide className="bg-white">
            <SectionLabel>Case Study</SectionLabel>
            <SlideTitle>{molsonCoors.title}</SlideTitle>
            <div className="flex gap-[0.5in]">
              <div className="flex-1 rounded-lg overflow-hidden min-h-[4in] relative">
                <Image
                  src={molsonCoors.images.hero}
                  alt={molsonCoors.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex gap-3 flex-wrap mb-3.5">
                  {[
                    { label: "Client", value: molsonCoors.client },
                    { label: "Location", value: `${molsonCoors.location.city}, ${molsonCoors.location.state}` },
                    { label: "Scale", value: `${molsonCoors.dimensions?.size} ${molsonCoors.dimensions?.unit}` },
                    { label: "Year", value: String(molsonCoors.year) },
                  ].map((m) => (
                    <div key={m.label} className="text-[9px] text-gray-500">
                      <strong className="text-ocean-deep block text-[8px] uppercase tracking-wider mb-0.5">{m.label}</strong>
                      {m.value}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-3">{molsonCoors.description}</p>
                <div className="text-[10px] text-ocean italic leading-relaxed border-l-[3px] border-teal pl-3 mt-4">
                  &ldquo;{molsonCoors.artistNote}&rdquo;
                </div>
              </div>
            </div>
            <SlideFooter num={5} />
          </Slide>
        )}

        {/* SLIDE 6: Case Study - Hawaii */}
        {hawaii && (
          <Slide className="bg-white">
            <SectionLabel>Case Study</SectionLabel>
            <SlideTitle>{hawaii.title}</SlideTitle>
            <div className="flex gap-[0.5in]">
              <div className="flex-1 rounded-lg overflow-hidden min-h-[4in] relative">
                <Image
                  src={hawaii.images.hero}
                  alt={hawaii.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex gap-3 flex-wrap mb-3.5">
                  {[
                    { label: "Client", value: hawaii.client },
                    { label: "Location", value: `${hawaii.location.city}, ${hawaii.location.state}` },
                    { label: "Year", value: String(hawaii.year) },
                    { label: "Category", value: "Education" },
                  ].map((m) => (
                    <div key={m.label} className="text-[9px] text-gray-500">
                      <strong className="text-ocean-deep block text-[8px] uppercase tracking-wider mb-0.5">{m.label}</strong>
                      {m.value}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-3">{hawaii.description}</p>
                {hawaii.impact && (
                  <div className="bg-amber-50 border-l-[3px] border-coral rounded-r-md p-3 mb-3">
                    <div className="text-[8px] font-bold uppercase tracking-wider text-coral mb-1">Impact</div>
                    <p className="text-[9px] text-amber-800 leading-snug">{hawaii.impact}</p>
                  </div>
                )}
              </div>
            </div>
            <SlideFooter num={6} />
          </Slide>
        )}

        {/* SLIDE 7: Case Study - Colombia */}
        {colombia && (
          <Slide className="bg-white">
            <SectionLabel>Case Study</SectionLabel>
            <SlideTitle>{colombia.title}</SlideTitle>
            <div className="flex gap-[0.5in]">
              <div className="flex-1 rounded-lg overflow-hidden min-h-[4in] relative">
                <Image
                  src={colombia.images.hero}
                  alt={colombia.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex gap-3 flex-wrap mb-3.5">
                  {[
                    { label: "Festival", value: colombia.location.venue },
                    { label: "Location", value: `${colombia.location.city}, ${colombia.location.country}` },
                    { label: "Year", value: String(colombia.year) },
                    { label: "Category", value: "International" },
                  ].map((m) => (
                    <div key={m.label} className="text-[9px] text-gray-500">
                      <strong className="text-ocean-deep block text-[8px] uppercase tracking-wider mb-0.5">{m.label}</strong>
                      {m.value}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-3">{colombia.description}</p>
                <div className="bg-amber-50 border-l-[3px] border-coral rounded-r-md p-3 mb-3">
                  <div className="text-[8px] font-bold uppercase tracking-wider text-coral mb-1">Why It Matters</div>
                  <p className="text-[9px] text-amber-800 leading-snug">
                    This project demonstrates international experience, cultural sensitivity, and the
                    ability to create meaningful art that resonates across borders and languages.
                  </p>
                </div>
                <div className="text-[10px] text-ocean italic leading-relaxed border-l-[3px] border-teal pl-3">
                  &ldquo;{colombia.artistNote}&rdquo;
                </div>
              </div>
            </div>
            <SlideFooter num={7} />
          </Slide>
        )}

        {/* SLIDE 8: Clients */}
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
          <SlideFooter num={8} />
        </Slide>

        {/* SLIDE 9: Press & Festivals */}
        <Slide className="bg-white">
          <SectionLabel>Recognition</SectionLabel>
          <SlideTitle>Press, Festivals & Exhibitions</SlideTitle>
          <div className="flex gap-[0.5in]">
            {/* Press */}
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

            {/* Festivals & Exhibitions */}
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
          <SlideFooter num={9} />
        </Slide>

        {/* SLIDE 10: CTA */}
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
