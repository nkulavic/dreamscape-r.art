export function Slide({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-[11in] h-[8.5in] p-[0.6in] relative overflow-hidden print:break-after-page ${className}`}>
      {children}
    </div>
  );
}

export function SlideFooter({ num }: { num: number }) {
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

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] uppercase tracking-[3px] text-gray-400 mb-2">
      <span className="inline-block w-2 h-2 rounded-full bg-coral mr-2 align-middle" />
      {children}
    </div>
  );
}

export function SlideTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[32px] font-extrabold text-ocean-deep leading-tight mb-5">
      {children}
    </h2>
  );
}
