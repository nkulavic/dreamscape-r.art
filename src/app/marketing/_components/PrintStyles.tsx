export function PrintStyles({ size = "letter" }: { size?: "letter" | "letter-landscape" }) {
  const pageSize = size === "letter-landscape" ? "11in 8.5in" : "letter";
  return (
    <style>{`
      @media print {
        @page { size: ${pageSize}; margin: 0; }
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `}</style>
  );
}
