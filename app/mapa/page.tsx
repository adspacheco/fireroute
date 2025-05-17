import MapContainer from "@/components/map-container";

export default function MapPage() {
  return (
    <div className="max-w-6xl mx-auto p-5 py-8">
      <div className="w-full rounded-lg overflow-hidden p-4 border bg-card shadow-sm">
        <MapContainer />
      </div>
    </div>
  );
}
