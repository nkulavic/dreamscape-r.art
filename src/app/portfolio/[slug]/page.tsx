import { notFound } from "next/navigation";
import { getAllMurals, getMuralBySlug, getMuralsByCategory } from "@/db/dal";
import MuralDetailClient from "./MuralDetailClient";

export async function generateStaticParams() {
  const murals = await getAllMurals();
  return murals.map((mural) => ({ slug: mural.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mural = await getMuralBySlug(slug);
  if (!mural) return { title: "Mural Not Found" };
  return {
    title: `${mural.title} | DREAMSCAPER`,
    description: mural.description,
  };
}

export default async function MuralDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mural = await getMuralBySlug(slug);

  if (!mural) notFound();

  const related = await getMuralsByCategory(mural.category);
  const relatedMurals = related.filter((m) => m.id !== mural.id).slice(0, 3);

  return <MuralDetailClient mural={mural} relatedMurals={relatedMurals} />;
}
