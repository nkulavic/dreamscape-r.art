interface Stat {
  value: string;
  label: string;
}

export function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex justify-center bg-gray-50 border-b border-gray-200 py-3 px-[0.5in]">
      {stats.map((stat, i, arr) => (
        <div
          key={stat.label}
          className={`flex-1 text-center py-1 ${i < arr.length - 1 ? "border-r border-gray-200" : ""}`}
        >
          <div className="text-[22px] font-extrabold text-coral">{stat.value}</div>
          <div className="text-[8px] uppercase tracking-[1.5px] text-gray-400 mt-0.5">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export function StatGrid({ stats, columns = 2 }: { stats: Stat[]; columns?: 2 | 4 }) {
  return (
    <div className={`grid grid-cols-${columns} gap-2`}>
      {stats.map((s) => (
        <div key={s.label} className="text-center bg-gray-50 rounded py-2">
          <div className="text-[18px] font-extrabold text-coral">{s.value}</div>
          <div className="text-[7px] uppercase tracking-wider text-gray-400 mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
