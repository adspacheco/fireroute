"use client";
import { useState, useEffect } from "react";
import { DynamicMap } from "@/components/map";
import { LatLngTuple } from "leaflet";
import { toast } from "sonner";

export default function ClientMap() {
  const DEFAULT_POSITION: LatLngTuple = [-23.564324, -46.652713];

  const [position, setPosition] = useState<LatLngTuple>(DEFAULT_POSITION);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getLocation() {
      setIsLoading(true);

      if (navigator.geolocation) {
        try {
          const browserPosition = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(
                (position) => resolve(position),
                (error) => reject(error),
                {
                  enableHighAccuracy: true,
                  timeout: 10000,
                  maximumAge: 0,
                }
              );
            }
          );

          const { latitude, longitude } = browserPosition.coords;
          setPosition([latitude, longitude]);
          setIsLoading(false);
          return;
        } catch (error) {
          console.log(
            "Erro na geolocalização do navegador, tentando fallback:",
            error
          );

          toast("Usando localização aproximada");
        }
      } else {
        toast("Navegador sem suporte para geolocalização.");
      }

      try {
        const response = await fetch("/api/geo");
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();

        if (data.latitude && data.longitude) {
          const lat = parseFloat(data.latitude);
          const lng = parseFloat(data.longitude);

          if (!isNaN(lat) && !isNaN(lng)) {
            setPosition([lat, lng]);
          } else {
            throw new Error("Coordenadas inválidas da API");
          }
        } else {
          throw new Error("API retornou dados incompletos");
        }
      } catch (err) {
        console.error("Erro no fallback de geolocalização:", err);

        toast("Erro de localização");
      } finally {
        setIsLoading(false);
      }
    }

    getLocation();
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
