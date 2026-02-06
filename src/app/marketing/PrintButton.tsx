"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="ml-4 bg-coral text-white px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider hover:bg-coral-dark transition-colors cursor-pointer"
    >
      Print / Save PDF
    </button>
  );
}
