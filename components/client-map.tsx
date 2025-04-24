"use client";
import { useState, useEffect } from "react";
import { DynamicMap } from "@/components/map";
import { LatLngTuple } from "leaflet";
import { AlertCircle, Navigation } from "lucide-react";

export default function ClientMap() {
  // São Paulo como posição padrão final (caso ambos os métodos falhem)
  const DEFAULT_POSITION: LatLngTuple = [-23.564324, -46.652713];
  const [position, setPosition] = useState<LatLngTuple>(DEFAULT_POSITION);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [, setLocationType] = useState<"browser" | "ip" | "default">("default");

  useEffect(() => {
    async function getLocation() {
      setIsLoading(true);
      setError(null);

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
          setLocationType("browser");
          setIsLoading(false);
          return;
        } catch (error) {
          console.log(
            "Erro na geolocalização do navegador, tentando fallback:",
            error
          );
          setUsingFallback(true);
        }
      } else {
        setUsingFallback(true);
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
            setLocationType("ip");
          } else {
            throw new Error("Coordenadas inválidas da API");
          }
        } else {
          throw new Error("API retornou dados incompletos");
        }
      } catch (err) {
        console.error("Erro no fallback de geolocalização:", err);
        setError("Não foi possível determinar sua localização");
        setLocationType("default");
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

      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-20 flex items-center">
          <AlertCircle className="size-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {!isLoading && usingFallback && !error && (
        <div className="absolute top-4 left-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded z-20 flex items-center">
          <Navigation className="size-5 mr-2" />
          <span>
            Usando localização aproximada. Permita acesso à localização para
            maior precisão.
          </span>
        </div>
      )}

      <DynamicMap position={position} className="h-full w-full" />
    </div>
  );
}
