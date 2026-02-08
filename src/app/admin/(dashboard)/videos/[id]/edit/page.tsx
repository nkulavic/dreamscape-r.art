import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import VideoForm from "./VideoForm";

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const rows = await db
    .select()
    .from(schema.videos)
    .where(eq(schema.videos.id, id))
    .limit(1);

  if (rows.length === 0) {
    notFound();
  }

  const video = rows[0];

  return (
    <div>
      <h1 className="font-display text-4xl tracking-wide text-gray-900">
        Edit Video
      </h1>
      <p className="mt-1 font-heading text-sm text-gray-500">
        Update details for {video.title}.
      </p>

      <div className="mt-8">
        <VideoForm video={video} />
      </div>
    </div>
  );
}
