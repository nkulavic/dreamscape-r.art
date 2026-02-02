"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiLocationMarker, HiX } from "react-icons/hi";
import { murals, Mural } from "../../data/murals";

// Dynamic import for Leaflet to avoid SSR issues
import dynamic from "next/dynamic";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface MuralMapProps {
  className?: string;
  height?: string;
  showAllMurals?: boolean;
  selectedCategory?: Mural["category"] | "all";
}

export default function MuralMap({
  className = "",
  height = "h-[500px]",
  showAllMurals = true,
  selectedCategory = "all",
}: MuralMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedMural, setSelectedMural] = useState<Mural | null>(null);
  const [icon, setIcon] = useState<L.Icon | null>(null);

  // Filter murals with coordinates
  const muralsWithCoords = murals.filter(
    (m) =>
      m.location.coordinates &&
      (selectedCategory === "all" || m.category === selectedCategory)
  );

  useEffect(() => {
    setIsClient(true);
    // Import Leaflet and create icon on client side
    import("leaflet").then((L) => {
      // Fix default marker icon
      delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      // Create custom icon
      const customIcon = new L.Icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      setIcon(customIcon);
    });
  }, []);

  // Calculate center based on murals
  const getCenter = (): [number, number] => {
    if (muralsWithCoords.length === 0) return [39.5501, -105.7821]; // Default to Colorado
    const lats = muralsWithCoords.map((m) => m.location.coordinates!.lat);
    const lngs = muralsWithCoords.map((m) => m.location.coordinates!.lng);
    return [
      lats.reduce((a, b) => a + b, 0) / lats.length,
      lngs.reduce((a, b) => a + b, 0) / lngs.length,
    ];
  };

  if (!isClient) {
    return (
      <div className={`${height} ${className} bg-gray-100 rounded-2xl flex items-center justify-center`}>
        <div className="text-gray-500 flex items-center gap-2">
          <HiLocationMarker className="w-6 h-6 text-accent" />
          <span>Loading map...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <div className={`${height} rounded-2xl overflow-hidden shadow-lg`}>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
        />
        <MapContainer
          center={getCenter()}
          zoom={4}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {icon &&
            muralsWithCoords.map((mural) => (
              <Marker
                key={mural.id}
                position={[
                  mural.location.coordinates!.lat,
                  mural.location.coordinates!.lng,
                ]}
                icon={icon}
                eventHandlers={{
                  click: () => setSelectedMural(mural),
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <strong className="text-gray-800">{mural.title}</strong>
                    <p className="text-gray-600 text-xs mt-1">
                      {mural.location.city}, {mural.location.state || mural.location.country}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>

      {/* Selected Mural Card */}
      {selectedMural && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-xl shadow-xl overflow-hidden z-[1000]"
        >
          <div className="relative">
            <div
              className="h-32 bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedMural.images.hero})` }}
            />
            <button
              onClick={() => setSelectedMural(null)}
              className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
            >
              <HiX className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="p-4">
            <span className="text-accent text-xs font-heading uppercase tracking-wide">
              {selectedMural.category} • {selectedMural.year}
            </span>
            <h3 className="font-heading font-bold text-lg text-gray-800 mt-1">
              {selectedMural.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1 flex items-center gap-1">
              <HiLocationMarker className="w-4 h-4 text-accent" />
              {selectedMural.location.venue && `${selectedMural.location.venue}, `}
              {selectedMural.location.city}, {selectedMural.location.state || selectedMural.location.country}
            </p>
            <Link
              href={`/portfolio/${selectedMural.slug}`}
              className="mt-3 inline-block text-sm font-heading text-accent hover:text-accent-dark transition-colors"
            >
              View Project →
            </Link>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md z-[1000]">
        <p className="text-sm font-heading text-gray-800">
          <span className="text-accent font-bold">{muralsWithCoords.length}</span> Murals
        </p>
      </div>
    </div>
  );
}
