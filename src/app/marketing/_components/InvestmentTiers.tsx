import { investmentTiers } from "@/app/data/marketing";

export function InvestmentTiersCompact({ note }: { note?: string }) {
  return (
    <div>
      <div className="space-y-1.5">
        {investmentTiers.map((tier) => (
          <div key={tier.name} className="flex items-center gap-2 text-[8px]">
            <span className="inline-block w-[50px] font-bold text-ocean-deep uppercase tracking-[0.5px]">
              {tier.name}
            </span>
            <span className="text-gray-400">{tier.sizeRange}</span>
            <span className="text-gray-300 flex-1 text-right italic">{tier.example}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-center">
        <span className="inline-block bg-coral text-white text-[7px] font-bold px-3 py-1 rounded uppercase tracking-wider">
          Contact for a Custom Quote
        </span>
      </div>
      {note && (
        <p className="text-[7px] text-gray-400 italic mt-1.5 leading-snug">{note}</p>
      )}
    </div>
  );
}

export function InvestmentTiersCards({ note }: { note?: string }) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {investmentTiers.map((tier) => (
          <div key={tier.name} className="border border-gray-200 rounded-lg p-4 text-center">
            <h4 className="text-[14px] font-extrabold text-ocean-deep mb-1">{tier.name}</h4>
            <div className="text-[10px] text-coral font-semibold mb-2">{tier.sizeRange}</div>
            <ul className="text-[8px] text-gray-400 text-left space-y-1 mb-3">
              {tier.includes.map((item) => (
                <li key={item} className="flex gap-1">
                  <span className="text-teal flex-shrink-0">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="text-[7px] text-gray-300 italic">{tier.example}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 text-center">
        <span className="inline-block bg-coral text-white text-[12px] font-bold px-6 py-2.5 rounded uppercase tracking-wider">
          Contact for a Custom Quote
        </span>
      </div>
      {note && (
        <p className="text-[10px] text-gray-400 italic mt-3 text-center leading-relaxed max-w-[6in] mx-auto">
          {note}
        </p>
      )}
    </div>
  );
}
