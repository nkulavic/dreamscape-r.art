"use client";

import { useRouter } from "next/navigation";

export default function DeleteVideoButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    const res = await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete video.");
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
