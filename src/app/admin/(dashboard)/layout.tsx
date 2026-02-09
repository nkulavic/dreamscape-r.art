import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AdminSidebar from "./_components/AdminSidebar";

export const metadata = {
  title: "Admin",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verify user is authenticated and has admin role
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/admin/login");
  }

  if (session.user.role !== "admin") {
    // User is authenticated but not an admin
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="ml-64 min-h-screen p-8">{children}</main>
    </div>
  );
}
