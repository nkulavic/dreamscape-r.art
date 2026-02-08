import { notFound } from "next/navigation";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import MuralForm from "../../MuralForm";

export default async function EditMuralPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [mural] = await db
    .select()
    .from(schema.murals)
    .where(eq(schema.murals.id, id));

  if (!mural) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-4xl tracking-wide text-gray-900">
          Edit Mural
        </h1>
        <p className="mt-1 font-heading text-sm text-gray-500">
          Editing &ldquo;{mural.title}&rdquo;
        </p>
      </div>

      <MuralForm mural={mural} />
    </div>
  );
}
