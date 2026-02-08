"use client";

import { useRouter } from "next/navigation";

export default function DeleteClientButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    const res = await fetch(`/api/admin/clients/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete client.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="font-medium text-red-600 hover:text-red-800"
    >
      Delete
    </button>
  );
}
