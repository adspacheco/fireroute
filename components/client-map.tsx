"use client";

import { useState, useEffect } from "react";
import { DynamicMap } from "@/components/map";
import { LatLngTuple } from "leaflet";

export default function ClientMap() {
  const DEFAULT_POSITION: LatLngTuple = [-23.564324, -46.652713];
  const [position, setPosition] = useState<LatLngTuple>(DEFAULT_POSITION);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLocation() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/geo");
        const data = await res.json();

        if (data.latitude && data.longitude) {
          setPosition([parseFloat(data.latitude), parseFloat(data.longitude)]);
        }
      } catch (error) {
        console.error("Erro ao buscar localização", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLocation();
  }, []);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      <DynamicMap position={position} className="h-full w-full" />
    </div>
  );
}
