import { getAllMurals, getAllClients, getAllVideos } from "@/db/dal";
import { Image, Users, Video, Award } from "lucide-react";

export default async function AdminDashboard() {
  const [murals, clients, videos] = await Promise.all([
    getAllMurals(),
    getAllClients(),
    getAllVideos(),
  ]);

  const featuredMurals = murals.filter((m) => m.featured);

  const stats = [
    {
      label: "Total Murals",
      value: murals.length,
      icon: Image,
      color: "bg-ocean-deep",
    },
    {
      label: "Total Clients",
      value: clients.length,
      icon: Users,
      color: "bg-teal",
    },
    {
      label: "Total Videos",
      value: videos.length,
      icon: Video,
      color: "bg-sunset",
    },
    {
      label: "Featured Murals",
      value: featuredMurals.length,
      icon: Award,
      color: "bg-coral",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl tracking-wide text-gray-900">
        Dashboard
      </h1>
      <p className="mt-1 font-heading text-sm text-gray-500">
        Welcome to the DREAMSCAPER admin panel.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-heading text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-display text-4xl text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
