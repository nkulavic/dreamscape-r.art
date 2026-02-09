import Image from "next/image";
import { siteConfig, credentials } from "@/app/data/siteConfig";

export const metadata = { title: "Business Card & Postcard | Marketing" };

export default function BusinessCardPage() {
  return (
    <>
      <style>{`
        @media print {
          @page { size: letter; margin: 0.5in; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <div className="max-w-[8.5in] mx-auto p-[0.5in] bg-gray-100 print:bg-white min-h-screen">
        {/* Business Cards */}
        <div className="mb-[0.6in]">
          <h2 className="text-[10px] uppercase tracking-[3px] text-gray-400 font-semibold mb-3 print:text-gray-500">
            Business Card &mdash; 3.5&quot; &times; 2&quot;
          </h2>

          <div className="flex gap-[0.4in] mb-1">
            {/* Front */}
            <div className="w-[3.5in] h-[2in] rounded bg-gradient-to-br from-ocean-deep via-ocean to-ocean-light text-white flex flex-col justify-center items-center text-center px-[0.2in] shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-coral via-coral-light to-teal" />
              <h1 className="font-display text-[22px] tracking-[6px]">{siteConfig.name}</h1>
              <div className="w-[30px] h-[2px] bg-coral mx-auto my-1.5" />
              <p className="text-[7px] tracking-[3px] uppercase text-blue-300 font-light">
                {siteConfig.title}
              </p>
              <p className="text-[7px] text-blue-200 mt-3 italic">
                Guided by community, inspired by culture.
              </p>
            </div>

            {/* Back */}
            <div className="w-[3.5in] h-[2in] rounded bg-white shadow-lg px-[0.25in] py-[0.2in] flex flex-col justify-center relative overflow-hidden">
              <h2 className="text-[12px] font-bold text-ocean-deep">{siteConfig.artistName}</h2>
              <p className="text-[7px] text-coral uppercase tracking-[2px] font-semibold mb-2">
                {siteConfig.title}
              </p>
              <div className="w-full h-px bg-gradient-to-r from-coral to-transparent mb-2" />
              <div className="text-[7.5px] text-gray-500 leading-loose">
                <span className="inline-block w-10 text-ocean-deep font-semibold">Email</span> {siteConfig.email}<br />
                <span className="inline-block w-10 text-ocean-deep font-semibold">Web</span> dreamscaper.art<br />
                <span className="inline-block w-10 text-ocean-deep font-semibold">IG</span> @dreamscape_r<br />
                <span className="inline-block w-10 text-ocean-deep font-semibold">Based</span> {siteConfig.location} &bull; Available nationwide
              </div>
              <div className="flex gap-1 mt-2">
                {["OSHA Certified", "Insured", "10+ Years"].map((c) => (
                  <span key={c} className="bg-ocean-deep text-white text-[5.5px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-[0.3px]">
                    {c}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-ocean-deep via-ocean-light to-teal" />
            </div>
          </div>
          <p className="text-[8px] text-gray-300 text-center italic">
            &uarr; Front &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &uarr; Back
          </p>
        </div>

        {/* Postcards */}
        <div>
          <h2 className="text-[10px] uppercase tracking-[3px] text-gray-400 font-semibold mb-3 print:text-gray-500">
            Postcard Front &mdash; 6&quot; &times; 4&quot;
          </h2>

          {/* Front */}
          <div className="w-[6in] h-[4in] rounded shadow-lg overflow-hidden mb-3 relative">
            <div className="w-full h-[2.8in] relative border-b-[3px] border-coral">
              <Image
                src="/images/murals/protect-your-peace.jpg"
                alt="DREAMSCAPER mural - Protect Your Peace"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="bg-gradient-to-br from-ocean-deep to-ocean-light flex justify-between items-center px-5 py-2.5">
              <span className="font-display text-[18px] text-white tracking-[5px]">{siteConfig.name}</span>
              <span className="text-[8px] text-blue-300 tracking-[2px] uppercase">dreamscaper.art</span>
            </div>
          </div>

          <p className="text-[8px] text-gray-300 text-center italic my-2">&mdash;&mdash;&mdash;</p>

          <h2 className="text-[10px] uppercase tracking-[3px] text-gray-400 font-semibold mb-3 print:text-gray-500">
            Postcard Back &mdash; 6&quot; &times; 4&quot;
          </h2>

          {/* Back */}
          <div className="w-[6in] h-[4in] rounded shadow-lg bg-white flex overflow-hidden">
            {/* Left side */}
            <div className="flex-1 p-[0.25in] flex flex-col justify-center border-r border-gray-200">
              <h3 className="text-[16px] font-extrabold text-ocean-deep leading-tight mb-2">
                Transform Your<br />Space with a <span className="text-coral">Custom Mural</span>
              </h3>
              <p className="text-[8.5px] text-gray-500 leading-relaxed mb-2.5">
                From 7,500 sq ft corporate installations to intimate community murals, DREAMSCAPER
                creates vibrant, large-scale artwork that tells your story and makes a lasting impression.
              </p>
              <div className="flex gap-3 mb-2.5">
                {[
                  { val: "10+", lbl: "Years Exp" },
                  { val: "35+", lbl: "Clients" },
                  { val: "4", lbl: "Countries" },
                ].map((s) => (
                  <div key={s.lbl} className="text-center">
                    <div className="text-[16px] font-extrabold text-coral">{s.val}</div>
                    <div className="text-[6px] uppercase tracking-wider text-gray-400">{s.lbl}</div>
                  </div>
                ))}
              </div>
              <span className="inline-block bg-coral text-white text-[8px] font-bold px-3.5 py-1.5 rounded uppercase tracking-wider">
                Get a Free Consultation
              </span>
            </div>

            {/* Right side */}
            <div className="flex-1 p-[0.25in] flex flex-col justify-center">
              <div className="text-[9px] text-gray-500 leading-loose">
                <div className="text-[12px] font-bold text-ocean-deep mb-0.5">{siteConfig.artistName}</div>
                <div className="text-[7px] text-coral uppercase tracking-[2px] font-semibold mb-2">
                  {siteConfig.title}
                </div>
                <strong className="text-ocean-deep">Email</strong><br />
                {siteConfig.email}<br /><br />
                <strong className="text-ocean-deep">Portfolio</strong><br />
                dreamscaper.art<br /><br />
                <strong className="text-ocean-deep">Instagram</strong><br />
                @dreamscape_r<br /><br />
                <strong className="text-ocean-deep">Based in</strong><br />
                {siteConfig.location}<br />
                Available nationwide & internationally
              </div>
              <div className="flex gap-1 flex-wrap mt-2">
                {["OSHA Certified", "Insured", "10+ Years"].map((c) => (
                  <span key={c} className="bg-ocean-deep text-white text-[6px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-[0.3px]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
