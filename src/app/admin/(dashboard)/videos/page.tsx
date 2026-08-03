import Link from "next/link";
import { getAllVideos } from "@/db/dal";
import { Plus } from "lucide-react";
import VideosListClient from "./VideosListClient";

export default async function VideosPage() {
  const videos = await getAllVideos();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-wide text-gray-900">
            Videos
          </h1>
          <p className="mt-1 font-heading text-sm text-gray-500">
            Manage your video library.
          </p>
        </div>
        <Link
          href="/admin/videos/new"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Add New Video
        </Link>
      </div>

      <div className="mt-8">
        <VideosListClient videos={videos} />
      </div>
    </div>
  );
}
