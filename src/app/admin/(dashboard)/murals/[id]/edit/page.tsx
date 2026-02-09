import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  // Get all murals to find prev/next
  const allMurals = await db
    .select({ id: schema.murals.id, title: schema.murals.title })
    .from(schema.murals)
    .orderBy(desc(schema.murals.year));

  // Find current mural's position
  const currentIndex = allMurals.findIndex((m) => m.id === id);
  const prevMural = currentIndex > 0 ? allMurals[currentIndex - 1] : null;
  const nextMural = currentIndex < allMurals.length - 1 ? allMurals[currentIndex + 1] : null;

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl tracking-wide text-gray-900">
              Edit Mural
            </h1>
            <p className="mt-1 font-heading text-sm text-gray-500">
              Editing &ldquo;{mural.title}&rdquo;
            </p>
          </div>

          {/* Previous/Next Navigation */}
          <div className="flex items-center gap-2">
            {prevMural ? (
              <Link
                href={`/admin/murals/${prevMural.id}/edit`}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                title={`Previous: ${prevMural.title}`}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Link>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </div>
            )}

            {nextMural ? (
              <Link
                href={`/admin/murals/${nextMural.id}/edit`}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                title={`Next: ${nextMural.title}`}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
                Next
                <ChevronRight className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>
      </div>

      <MuralForm mural={mural} />
    </div>
  );
}
