import AdminSidebar from "./_components/AdminSidebar";

export const metadata = {
  title: "Admin",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="ml-64 min-h-screen p-8">{children}</main>
    </div>
  );
}
