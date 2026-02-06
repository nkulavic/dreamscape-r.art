import { contractSteps } from "@/app/data/marketing";

export function ContractFlowCompact() {
  return (
    <div className="flex gap-1.5">
      {contractSteps.map((step, i, arr) => (
        <div key={step.name} className="flex items-center gap-1.5">
          <div className="text-center flex-shrink-0">
            <span className="inline-block w-5 h-5 leading-5 rounded-full bg-coral text-white text-[8px] font-bold">
              {i + 1}
            </span>
            <span className="block text-[6.5px] font-semibold text-gray-800 uppercase mt-0.5 tracking-[0.3px] max-w-[55px]">
              {step.name}
            </span>
          </div>
          {i < arr.length - 1 && (
            <span className="text-gray-300 text-[10px] flex-shrink-0">&rarr;</span>
          )}
        </div>
      ))}
    </div>
  );
}

export function ContractFlowDetailed() {
  return (
    <div className="space-y-3">
      {contractSteps.map((step, i) => (
        <div key={step.name} className="flex gap-3 items-start">
          <span className="inline-block w-7 h-7 leading-7 rounded-full bg-coral text-white text-[12px] font-bold text-center flex-shrink-0">
            {i + 1}
          </span>
          <div>
            <h4 className="text-[12px] font-bold text-ocean-deep">{step.name}</h4>
            <p className="text-[9px] text-gray-400 leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
