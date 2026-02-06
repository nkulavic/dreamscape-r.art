import Image from "next/image";
import { siteConfig, credentials, services } from "@/app/data/siteConfig";
import { getFeaturedClients } from "@/app/data/clients";
import { publications, festivals, exhibitions } from "@/app/data/experience";
import { getFeaturedMurals } from "@/app/data/murals";

export const metadata = { title: "Tri-Fold Brochure | Marketing" };

export default function BrochurePage() {
  const featuredMurals = getFeaturedMurals();
  const featuredClients = getFeaturedClients();

  return (
    <>
      <style>{`
        @media print {
          @page { size: 11in 8.5in; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* ========== OUTSIDE (Side 1) ========== */}
      {/* When printed: Left=Back Flap | Center=Contact | Right=Cover */}
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
            <p><strong className="text-gray-800">Portfolio</strong><br />dreamscape-r.art</p>
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
            src="/images/murals/protect-your-peace.jpg"
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
            <em className="not-italic text-coral-light font-semibold">Guided by community,</em><br />
            <em className="not-italic text-coral-light font-semibold">inspired by culture.</em><br /><br />
            Vibrant, large-scale murals that transform spaces and tell stories.
          </p>
          <span className="absolute bottom-[0.4in] text-[9px] text-blue-300 tracking-[2px] z-10">
            dreamscape-r.art
          </span>
        </Panel>
      </div>

      {/* ========== INSIDE (Side 2) ========== */}
      <div className="w-[11in] h-[8.5in] mx-auto flex print:m-0 shadow-xl print:shadow-none mt-8 print:mt-0">
        {/* Story Panel */}
        <Panel className="bg-white">
          <h2 className="text-[16px] font-extrabold text-ocean-deep tracking-wider uppercase mb-3">
            The Artist
          </h2>
          <div className="w-10 h-[3px] bg-coral mb-3" />
          <p className="text-[9px] text-gray-500 leading-relaxed mb-2">
            {siteConfig.artistName} is a Denver-based professional muralist with over a decade of
            experience transforming walls into vibrant works of art across the United States and
            internationally.
          </p>
          <p className="text-[9px] text-gray-500 leading-relaxed mb-2">
            From a 7,500 sq ft installation at Molson Coors to community murals celebrating
            cultural heritage in Colombia, Rachel brings a unique blend of artistic vision and
            professional reliability to every project.
          </p>
          <div className="bg-blue-50 border-l-[3px] border-teal px-3 py-2.5 my-3 text-[9px] text-ocean italic leading-relaxed">
            &ldquo;Art has the power to transform not just walls, but the communities around them.
            Every mural is a conversation between the space, the people, and the story waiting to be told.&rdquo;
          </div>
          <p className="text-[9px] text-gray-500 leading-relaxed">
            With a background in nursing (RN, BSN), Rachel brings deep empathy and community
            awareness to her practice, ensuring every piece resonates with its audience.
          </p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {[
              { val: "10+", lbl: "Years Experience" },
              { val: "35+", lbl: "Clients" },
              { val: "4", lbl: "Countries" },
              { val: "6", lbl: "Festivals" },
            ].map((s) => (
              <div key={s.lbl} className="text-center bg-gray-50 rounded py-2">
                <div className="text-[18px] font-extrabold text-coral">{s.val}</div>
                <div className="text-[7px] uppercase tracking-wider text-gray-400 mt-0.5">{s.lbl}</div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Services Panel */}
        <Panel className="bg-[#fafbff] border-l border-r border-dashed border-gray-200 print:border-0">
          <h2 className="text-[16px] font-extrabold text-ocean-deep tracking-wider uppercase mb-1.5">
            Services
          </h2>
          <div className="w-10 h-[3px] bg-coral mb-3" />
          {services.map((svc, i) => (
            <div key={svc.id} className={`mb-3 pb-3 ${i < services.length - 1 ? "border-b border-gray-200" : ""}`}>
              <h3 className="text-[11px] font-bold text-ocean-deep mb-1">{svc.title}</h3>
              <p className="text-[8.5px] text-gray-400 leading-snug">{svc.description}</p>
              <div className="flex gap-1 flex-wrap mt-1">
                {svc.examples.map((ex) => (
                  <span key={ex} className="text-[7px] bg-blue-50 text-ocean px-1.5 py-0.5 rounded-full">{ex}</span>
                ))}
              </div>
            </div>
          ))}
          {/* Process mini */}
          <div className="bg-ocean-deep rounded-md p-3 mt-2">
            <div className="text-[9px] text-blue-300 uppercase tracking-[2px] font-semibold mb-2">The Process</div>
            <div className="flex justify-between">
              {["Consult", "Concept", "Design", "Paint", "Reveal"].map((step, i) => (
                <div key={step} className="text-center text-white">
                  <span className="block text-[14px] font-extrabold text-coral">{i + 1}</span>
                  <span className="text-[7px] uppercase tracking-[0.5px] text-blue-300">{step}</span>
                </div>
              ))}
            </div>
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

          <div className="mt-3">
            <h3 className="text-[9px] font-bold uppercase tracking-[1.5px] text-ocean-deep mb-2">Trusted By</h3>
            <div className="grid grid-cols-2 gap-1">
              {featuredClients.slice(0, 6).map((c) => (
                <div key={c.id} className="text-[8px] text-gray-500 bg-gray-50 rounded text-center py-1 px-1.5">
                  {c.name.split("/")[0].trim()}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-gray-200">
            <h3 className="text-[9px] font-bold uppercase tracking-[1.5px] text-ocean-deep mb-1.5">As Seen In</h3>
            <p className="text-[8px] text-gray-400 italic leading-relaxed">
              {publications.slice(0, 5).map((p) => p.outlet).join(" \u2022 ")}
            </p>
          </div>
        </Panel>
      </div>
    </>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-[3.667in] h-[8.5in] p-[0.35in] relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
