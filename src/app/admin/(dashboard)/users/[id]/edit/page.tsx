import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import UserForm from "../../UserForm";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [user] = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.id, id));

  if (!user) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Users
      </Link>

      <h1 className="mt-4 font-display text-4xl tracking-wide text-gray-900">
        Edit User
      </h1>
      <p className="mt-1 font-heading text-sm text-gray-500">
        Update user account information.
      </p>

      <div className="mt-8">
        <UserForm user={user} />
      </div>
    </div>
  );
}
