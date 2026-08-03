"use client";

import Link from "next/link";
import type { Video } from "@/db/dal";
import DeleteVideoButton from "./DeleteVideoButton";
import {
  SortableHeader,
  StaticHeader,
  useTableSort,
} from "../_components/SortableTable";

type SortField = "title" | "category" | "duration" | "featured";

interface VideosListClientProps {
  videos: Video[];
}

export default function VideosListClient({ videos }: VideosListClientProps) {
  const sort = useTableSort<Video, SortField>(videos, {
    initialField: "title",
    storageKey: "videos",
  });

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <SortableHeader field="title" label="Title" sort={sort} />
            <SortableHeader field="category" label="Category" sort={sort} />
            <SortableHeader field="duration" label="Duration" sort={sort} />
            <SortableHeader
              field="featured"
              label="Featured"
              sort={sort}
              firstDirection="desc"
            />
            <StaticHeader label="Actions" align="right" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sort.sortedRows.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-12 text-center text-sm text-gray-500"
              >
                No videos yet. Add your first video to get started.
              </td>
            </tr>
          )}
          {sort.sortedRows.map((video) => (
            <tr key={video.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {video.title}
              </td>
              <td className="px-6 py-4 text-sm capitalize text-gray-600">
                {video.category}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {video.duration || "—"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {video.featured ? (
                  <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                    Yes
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                    No
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-right text-sm">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/videos/${video.id}/edit`}
                    className="font-medium text-gray-600 hover:text-gray-900"
                  >
                    Edit
                  </Link>
                  <DeleteVideoButton id={video.id} title={video.title} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
