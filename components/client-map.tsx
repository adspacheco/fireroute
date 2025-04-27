"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { DynamicMap } from "@/components/map";
import { LatLngTuple } from "leaflet";
import { toast } from "sonner";
import { SearchLocation } from "@/components/search-location";
import { classifyAreaRisk } from "./riskClassification";
import { RiskAlert } from "./risk-alert";

interface FireFeature {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    data_hora_gmt: string;
    municipio: string;
    estado?: string;
    bioma?: string;
    satelite?: string;
    frp?: number;
    risco?: string;
    tipo_queimada?: string;
    confianca?: number;
    uf?: string;
    [key: string]: unknown;
  };
}

export default function ClientMap() {
  const DEFAULT_POSITION: LatLngTuple = [-23.564324, -46.652713];
  const [position, setPosition] = useState<LatLngTuple>(DEFAULT_POSITION);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [fires, setFires] = useState<FireFeature[]>([]);
  const [isLoadingFires, setIsLoadingFires] = useState(false);
  const [shouldFetchFires, setShouldFetchFires] = useState(false);
  const hasFetchedInitialLocation = useRef(false);

  const getUserLocation = useCallback(async () => {
    if (hasFetchedInitialLocation.current) return;

    setIsLoadingLocation(true);

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
        setShouldFetchFires(true);
        toast("Localização atual encontrada!");
      } catch (error) {
        console.error("Erro na geolocalização:", error);
        toast("Usando localização aproximada");

        try {
          const response = await fetch("/api/geo");
          if (!response.ok) throw new Error(`Erro: ${response.status}`);

          const data = await response.json();
          if (data.latitude && data.longitude) {
            setPosition([
              parseFloat(data.latitude),
              parseFloat(data.longitude),
            ]);
            setShouldFetchFires(true);
          }
        } catch (err) {
          console.error("Erro no fallback:", err);
          toast("Erro de localização");
        }
      } finally {
        setIsLoadingLocation(false);
        hasFetchedInitialLocation.current = true;
      }
    } else {
      toast("Navegador sem suporte para geolocalização.");
      setIsLoadingLocation(false);
      hasFetchedInitialLocation.current = true;
    }
  }, []);

  const fetchFires = useCallback(async () => {
    if (!shouldFetchFires) return;

    setIsLoadingFires(true);
    setShouldFetchFires(false);

    try {
      const [lat, lng] = position;
      const radius = 3;

      const apiUrl = `/api/fire-points?lat=${lat}&lng=${lng}&radius=${radius}`;
      console.log("Buscando dados em:", apiUrl);

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      console.log(
        "Dados recebidos, número de pontos:",
        data.features?.length || 0
      );

      if (data.features && Array.isArray(data.features)) {
        setFires(data.features);
      } else {
        setFires([]);
      }

      toast(`${data.features?.length || 0} focos de queimada encontrados`);
    } catch (error) {
      console.error("Erro na API:", error);
      toast("Erro ao buscar focos de queimada");
      setFires([]);
    } finally {
      setIsLoadingFires(false);
    }
  }, [position, shouldFetchFires]);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  useEffect(() => {
    if (shouldFetchFires) {
      fetchFires();
    }
  }, [shouldFetchFires, fetchFires]);

  const handleLocationFound = useCallback((newPosition: LatLngTuple) => {
    setPosition(newPosition);
    setFires([]);
    setShouldFetchFires(true);
    toast("Buscando focos de queimada para esta localização...");
  }, []);

  return (
    <div className="w-full space-y-4">
      <div>
        <SearchLocation onLocationFound={handleLocationFound} />
      </div>

      <RiskAlert
        riskData={
          !isLoadingLocation && !isLoadingFires ? classifyAreaRisk(fires) : null
        }
        isLoading={isLoadingLocation || isLoadingFires}
        fireCount={fires.length}
      />

      <div className="w-full h-[450px] rounded-lg overflow-hidden relative">
        {(isLoadingLocation || isLoadingFires) && (
          <div className="absolute inset-0 bg-gray-100/70 flex flex-col items-center justify-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-2"></div>
            <p className="text-sm">
              {isLoadingLocation
                ? "Obtendo localização..."
                : "Buscando focos de queimada..."}
            </p>
          </div>
        )}
        <DynamicMap
          position={position}
          fires={fires}
          className="h-full w-full"
          radiusKm={4}
        />
      </div>
    </div>
  );
}
