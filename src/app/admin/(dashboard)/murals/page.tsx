import Link from "next/link";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { Plus } from "lucide-react";
import MuralsListClient from "./MuralsListClient";

export default async function MuralsListPage() {
  const murals = await db.select().from(schema.murals);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-wide text-gray-900">
            Murals
          </h1>
          <p className="mt-1 font-heading text-sm text-gray-500">
            Manage all mural entries.
          </p>
        </div>
        <Link
          href="/admin/murals/new"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Add New Mural
        </Link>
      </div>

      <div className="mt-8">
        <MuralsListClient murals={murals} />
      </div>
    </div>
  );
}
