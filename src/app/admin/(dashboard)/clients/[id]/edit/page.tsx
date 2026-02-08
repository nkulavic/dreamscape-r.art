import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ClientForm from "./ClientForm";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const rows = await db
    .select()
    .from(schema.clients)
    .where(eq(schema.clients.id, id))
    .limit(1);

  if (rows.length === 0) {
    notFound();
  }

  const client = rows[0];

  return (
    <div>
      <h1 className="font-display text-4xl tracking-wide text-gray-900">
        Edit Client
      </h1>
      <p className="mt-1 font-heading text-sm text-gray-500">
        Update client details for {client.name}.
      </p>

      <div className="mt-8">
        <ClientForm client={client} />
      </div>
    </div>
  );
}
