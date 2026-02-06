import { audienceKeys, getAudienceConfig, type AudienceKey } from "@/app/data/marketing";
import { BrochureContent } from "../BrochureContent";

export function generateStaticParams() {
  return audienceKeys.map((audience) => ({ audience }));
}

export async function generateMetadata({ params }: { params: Promise<{ audience: AudienceKey }> }) {
  const { audience } = await params;
  const config = getAudienceConfig(audience);
  return { title: `Tri-Fold Brochure (${config.label}) | Marketing` };
}

export default async function AudienceBrochurePage({ params }: { params: Promise<{ audience: AudienceKey }> }) {
  const { audience } = await params;
  const config = getAudienceConfig(audience);
  return <BrochureContent audience={config} />;
}
