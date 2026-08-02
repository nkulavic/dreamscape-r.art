"use client";

import Link from "next/link";
import type { Client } from "@/db/dal";
import DeleteClientButton from "./DeleteClientButton";
import {
  SortableHeader,
  StaticHeader,
  useTableSort,
} from "../_components/SortableTable";

type SortField = "name" | "category" | "projectSize" | "featured";

interface ClientsListClientProps {
  clients: Client[];
}

export default function ClientsListClient({ clients }: ClientsListClientProps) {
  const sort = useTableSort<Client, SortField>(clients, {
    initialField: "name",
    storageKey: "clients",
  });

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <SortableHeader field="name" label="Name" sort={sort} />
            <SortableHeader field="category" label="Category" sort={sort} />
            <SortableHeader field="projectSize" label="Project Size" sort={sort} />
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
                No clients yet. Add your first client to get started.
              </td>
            </tr>
          )}
          {sort.sortedRows.map((client) => (
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
