export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-[3.667in] h-[8.5in] p-[0.35in] relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
