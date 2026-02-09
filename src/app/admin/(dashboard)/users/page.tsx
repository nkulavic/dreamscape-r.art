import Link from "next/link";
import { Plus } from "lucide-react";
import UsersListClient from "./UsersListClient";
import { db } from "@/db";
import * as schema from "@/db/schema";

export default async function UsersPage() {
  const users = await db.select().from(schema.user);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-wide text-gray-900">
            Users
          </h1>
          <p className="mt-1 font-heading text-sm text-gray-500">
            Manage user accounts and permissions.
          </p>
        </div>
        <Link
          href="/admin/users/new"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Add New User
        </Link>
      </div>

      <div className="mt-8">
        <UsersListClient users={users} />
      </div>
    </div>
  );
}
