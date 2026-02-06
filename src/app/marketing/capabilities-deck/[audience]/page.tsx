import { audienceKeys, getAudienceConfig, type AudienceKey } from "@/app/data/marketing";
import { CapabilitiesDeckContent } from "../CapabilitiesDeckContent";

export function generateStaticParams() {
  return audienceKeys.map((audience) => ({ audience }));
}

export async function generateMetadata({ params }: { params: Promise<{ audience: AudienceKey }> }) {
  const { audience } = await params;
  const config = getAudienceConfig(audience);
  return { title: `Capabilities Deck (${config.label}) | Marketing` };
}

export default async function AudienceCapabilitiesDeckPage({ params }: { params: Promise<{ audience: AudienceKey }> }) {
  const { audience } = await params;
  const config = getAudienceConfig(audience);
  return <CapabilitiesDeckContent audience={config} />;
}
