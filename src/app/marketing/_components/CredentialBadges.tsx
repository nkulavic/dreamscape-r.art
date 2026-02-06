import { credentials } from "@/app/data/siteConfig";

export function CredentialBadges({ size = "sm" }: { size?: "sm" | "xs" }) {
  const items = [credentials.osha, credentials.insured, credentials.experience, credentials.education];
  const sizeClasses = size === "xs"
    ? "text-[6px] px-1.5 py-0.5"
    : "text-[7.5px] px-2.5 py-1";

  return (
    <div className="flex gap-1.5 flex-wrap">
      {items.map((c) => (
        <span
          key={c}
          className={`bg-ocean-deep text-white ${sizeClasses} rounded font-semibold tracking-[0.5px] uppercase`}
        >
          {c}
        </span>
      ))}
    </div>
  );
}
