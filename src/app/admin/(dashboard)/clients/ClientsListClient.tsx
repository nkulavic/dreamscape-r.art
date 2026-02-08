"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { Client } from "@/db/dal";
import DeleteClientButton from "./DeleteClientButton";

type SortField = "name" | "category" | "projectSize" | "featured";
type SortDirection = "asc" | "desc";

interface ClientsListClientProps {
  clients: Client[];
}

export default function ClientsListClient({
  clients,
}: ClientsListClientProps) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedClients = useMemo(() => {
    return [...clients].sort((a, b) => {
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
  }, [clients, sortField, sortDirection]);

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
            <th
              onClick={() => handleSort("name")}
              className="cursor-pointer px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700"
            >
              Name
              <SortIcon field="name" />
            </th>
            <th
              onClick={() => handleSort("category")}
              className="cursor-pointer px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700"
            >
              Category
              <SortIcon field="category" />
            </th>
            <th
              onClick={() => handleSort("projectSize")}
              className="cursor-pointer px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700"
            >
              Project Size
              <SortIcon field="projectSize" />
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
          {sortedClients.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-12 text-center text-sm text-gray-500"
              >
                No clients yet. Add your first client to get started.
              </td>
            </tr>
          )}
          {sortedClients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {client.name}
              </td>
              <td className="px-6 py-4 text-sm capitalize text-gray-600">
                {client.category}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {client.projectSize || "—"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {client.featured ? (
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
                    href={`/admin/clients/${client.id}/edit`}
                    className="font-medium text-gray-600 hover:text-gray-900"
                  >
                    Edit
                  </Link>
                  <DeleteClientButton id={client.id} name={client.name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
