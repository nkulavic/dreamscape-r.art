import { audienceKeys, getAudienceConfig, type AudienceKey } from "@/app/data/marketing";
import { LeaveBehindContent } from "../LeaveBehindContent";

export function generateStaticParams() {
  return audienceKeys.map((audience) => ({ audience }));
}

export async function generateMetadata({ params }: { params: Promise<{ audience: AudienceKey }> }) {
  const { audience } = await params;
  const config = getAudienceConfig(audience);
  return { title: `Leave-Behind (${config.label}) | Marketing` };
}

export default async function AudienceLeaveBehindPage({ params }: { params: Promise<{ audience: AudienceKey }> }) {
  const { audience } = await params;
  const config = getAudienceConfig(audience);
  return <LeaveBehindContent audience={config} />;
}
