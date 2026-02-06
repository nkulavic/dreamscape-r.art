export function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-[11px] font-bold uppercase tracking-[2px] text-ocean-deep border-b-2 border-coral pb-1 mb-2.5 ${className}`}>
      {children}
    </h2>
  );
}
