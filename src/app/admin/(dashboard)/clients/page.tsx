import Link from "next/link";
import { getAllClients } from "@/db/dal";
import { Plus } from "lucide-react";
import DeleteClientButton from "./DeleteClientButton";

export default async function ClientsPage() {
  const clients = await getAllClients();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-wide text-gray-900">
            Clients
          </h1>
          <p className="mt-1 font-heading text-sm text-gray-500">
            Manage your client list.
          </p>
        </div>
        <Link
          href="/admin/clients/new"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Add New Client
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Project Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Featured
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  No clients yet. Add your first client to get started.
                </td>
              </tr>
            )}
            {clients.map((client) => (
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
    </div>
  );
}
