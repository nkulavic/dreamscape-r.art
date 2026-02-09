"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import * as schema from "@/db/schema";
import MuralActions from "./MuralActions";

type Mural = typeof schema.murals.$inferSelect;
type SortField = "title" | "category" | "city" | "year" | "featured";
type SortDirection = "asc" | "desc";

interface MuralsListClientProps {
  murals: Mural[];
}

export default function MuralsListClient({ murals }: MuralsListClientProps) {
  const [sortField, setSortField] = useState<SortField>("year");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedMurals = useMemo(() => {
    return [...murals].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Handle null/undefined values
      if (aValue === null || aValue === undefined) aValue = "";
      if (bValue === null || bValue === undefined) bValue = "";

      // String comparison
      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [murals, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-1 inline h-3.5 w-3.5 text-gray-400" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1 inline h-3.5 w-3.5 text-gray-700" />
    ) : (
      <ArrowDown className="ml-1 inline h-3.5 w-3.5 text-gray-700" />
    );
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Thumbnail
            </th>
            <th
              onClick={() => handleSort("title")}
              className="cursor-pointer px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700"
            >
              Title
              <SortIcon field="title" />
            </th>
            <th
              onClick={() => handleSort("category")}
              className="cursor-pointer px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700"
            >
              Category
              <SortIcon field="category" />
            </th>
            <th
              onClick={() => handleSort("city")}
              className="cursor-pointer px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700"
            >
              City
              <SortIcon field="city" />
            </th>
            <th
              onClick={() => handleSort("year")}
              className="cursor-pointer px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700"
            >
              Year
              <SortIcon field="year" />
            </th>
            <th
              onClick={() => handleSort("featured")}
              className="cursor-pointer px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700"
            >
              Featured
              <SortIcon field="featured" />
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedMurals.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="px-6 py-12 text-center text-sm text-gray-500"
              >
                No murals found. Create your first mural to get started.
              </td>
            </tr>
          )}
          {sortedMurals.map((mural) => (
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
