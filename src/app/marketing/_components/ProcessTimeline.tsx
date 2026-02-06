import { processSteps } from "@/app/data/marketing";

export function ProcessTimelineCompact() {
  return (
    <div className="flex gap-2 mb-3">
      {processSteps.map((step, i) => (
        <div key={step.name} className="flex-1 text-center bg-blue-50 rounded-md py-2 px-1">
          <span className="inline-block w-5 h-5 leading-5 rounded-full bg-ocean-deep text-white text-[9px] font-bold mb-0.5">
            {i + 1}
          </span>
          <span className="block text-[6.5px] font-semibold text-gray-800 uppercase tracking-[0.3px]">
            {step.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ProcessTimelineMini() {
  return (
    <div className="space-y-1.5">
      {processSteps.map((step, i) => (
        <div key={step.name} className="flex gap-2 items-start">
          <span className="inline-block w-4 h-4 leading-4 rounded-full bg-ocean-deep text-white text-[7px] font-bold text-center flex-shrink-0 mt-0.5">
            {i + 1}
          </span>
          <div>
            <span className="text-[8px] font-bold text-gray-800">{step.name}</span>
            <span className="text-[7px] text-gray-300 ml-1">({step.timeline})</span>
            <p className="text-[7px] text-gray-400 leading-snug">{step.description.split(".")[0]}.</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProcessTimelineDetailed() {
  return (
    <div className="flex gap-4 items-start">
      {processSteps.map((step, i, arr) => (
        <div key={step.name} className="contents">
          <div className="flex-1 text-center">
            <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-br from-ocean-deep to-ocean text-white flex items-center justify-center text-[16px] font-extrabold mx-auto mb-2">
              {i + 1}
            </div>
            <h4 className="text-[11px] font-bold text-ocean-deep mb-0.5">{step.name}</h4>
            <div className="text-[8px] text-coral font-semibold mb-1">{step.timeline}</div>
            <p className="text-[8px] text-gray-400 leading-relaxed max-w-[1.2in] mx-auto">
              {step.description.split(".")[0]}.
            </p>
          </div>
          {i < arr.length - 1 && (
            <div className="flex items-center justify-center pt-3 text-coral text-[14px] font-extrabold flex-shrink-0">
              &rarr;
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
