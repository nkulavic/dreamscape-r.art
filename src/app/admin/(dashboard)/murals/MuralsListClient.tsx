"use client";

import Image from "next/image";
import * as schema from "@/db/schema";
import MuralActions from "./MuralActions";
import {
  SortableHeader,
  StaticHeader,
  useTableSort,
} from "../_components/SortableTable";

type Mural = typeof schema.murals.$inferSelect;
type SortField =
  | "title"
  | "category"
  | "city"
  | "year"
  | "status"
  | "featured"
  | "createdAt";

interface MuralsListClientProps {
  murals: Mural[];
}

export default function MuralsListClient({ murals }: MuralsListClientProps) {
  const sort = useTableSort<Mural, SortField>(murals, {
    initialField: "year",
    initialDirection: "desc",
    storageKey: "murals",
  });

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <StaticHeader label="Thumbnail" />
            <SortableHeader field="title" label="Title" sort={sort} />
            <SortableHeader field="category" label="Category" sort={sort} />
            <SortableHeader field="city" label="City" sort={sort} />
            <SortableHeader
              field="year"
              label="Year"
              sort={sort}
              firstDirection="desc"
            />
            <SortableHeader field="status" label="Status" sort={sort} />
            <SortableHeader
              field="featured"
              label="Featured"
              sort={sort}
              firstDirection="desc"
            />
            <SortableHeader
              field="createdAt"
              label="Added"
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
                colSpan={9}
                className="px-6 py-12 text-center text-sm text-gray-500"
              >
                No murals found. Create your first mural to get started.
              </td>
            </tr>
          )}
          {sort.sortedRows.map((mural) => (
            <tr key={mural.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                  <Image
                    src={mural.thumbnailUrl}
                    alt={mural.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {mural.title}
              </td>
              <td className="px-6 py-4 text-sm capitalize text-gray-600">
                {mural.category}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{mural.city}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{mural.year}</td>
              <td className="px-6 py-4 text-sm">
                {mural.status === "published" ? (
                  <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                    Published
                  </span>
                ) : mural.status === "draft" ? (
                  <span className="inline-flex rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">
                    Draft
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                    Archived
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {mural.featured ? (
                  <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                    Yes
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                    No
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {new Date(mural.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right text-sm">
                <MuralActions id={mural.id} title={mural.title} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
