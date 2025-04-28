"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { LatLngTuple } from "leaflet";
import { toast } from "sonner";
import { AlertTriangle, Shield, AlertCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FireFeature, classifyAreaRisk, RiskData } from "@/lib/fire";

const DEFAULT_POSITION: LatLngTuple = [-23.564324, -46.652713]; // São Paulo
const DEFAULT_RADIUS_KM = 3;

// Importação dinâmica para evitar problemas de SSR
const MapComponent = dynamic(
  () => import("./map-component").then((mod) => mod.MapComponent),
  {
    loading: () => <Skeleton className="h-[450px] w-full rounded-lg" />,
    ssr: false,
  }
);

/**
 * Componente de alerta de risco
 */
function RiskAlert({ data, fireCount }: { data: RiskData; fireCount: number }) {
  const IconComponent =
    data.level === "segura"
      ? Shield
      : data.level === "perigo"
      ? AlertCircle
      : AlertTriangle;

  return (
    <div
      className={`w-full rounded-md p-3 mb-4 ${data.bgColor} border flex items-start`}
    >
      <div className="mr-3 mt-0.5">
        <IconComponent className={`${data.color} h-5 w-5`} />
      </div>
      <div>
        <h3 className={`font-semibold ${data.color} text-sm`}>
          {data.description} - {fireCount} {fireCount === 1 ? "foco" : "focos"}{" "}
          detectados
        </h3>
        <p className="text-sm mt-1 text-gray-700">{data.recommendation}</p>
      </div>
    </div>
  );
}

/**
 * Contêiner principal com gerenciamento de dados de incêndio
 */
export default function MapContainer() {
  const [position, setPosition] = useState<LatLngTuple>(DEFAULT_POSITION);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [fires, setFires] = useState<FireFeature[]>([]);
  const [isLoadingFires, setIsLoadingFires] = useState(false);
  const [shouldFetchFires, setShouldFetchFires] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Controle se já buscou localização inicial
  const locationFetched = useRef(false);

  /**
   * Obtém localização do usuário
   */
  const getUserLocation = useCallback(async () => {
    if (locationFetched.current) return;

    setIsLoadingLocation(true);

    try {
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
              });
            }
          );

          setPosition([position.coords.latitude, position.coords.longitude]);
          setShouldFetchFires(true);
          toast.success("Usando localização precisa");
          return;
        } catch (error) {
          const geoError = error as GeolocationPositionError;
          if (geoError.code === 1) {
            // Permissão negada - é esperado
            console.log("Permissão de localização negada. Usando aproximada.");
          } else {
            console.error("Erro geolocalização:", error);
          }
        }
      }

      toast.info("Usando localização aproximada");

      // Fallback para API de IP
      const response = await fetch("/api/geo");
      const data = await response.json();

      if (data.latitude && data.longitude) {
        setPosition([parseFloat(data.latitude), parseFloat(data.longitude)]);
        setShouldFetchFires(true);
      }
    } catch (err) {
      console.error("Erro localização:", err);
      toast("Erro de localização");
    } finally {
      setIsLoadingLocation(false);
      locationFetched.current = true;
    }
  }, []);

  /**
   * Busca dados de incêndio para localização atual
   */
  const fetchFires = useCallback(async () => {
    if (!shouldFetchFires) return;

    setIsLoadingFires(true);
    setShouldFetchFires(false);

    try {
      const [lat, lng] = position;
      const response = await fetch(
        `/api/fire-points?lat=${lat}&lng=${lng}&radius=${DEFAULT_RADIUS_KM}`
      );

      if (!response.ok) throw new Error(`Erro API: ${response.status}`);

      const data = await response.json();
      const features =
        data.features && Array.isArray(data.features) ? data.features : [];

      setFires(features);
    } catch (error) {
      console.error("Erro API:", error);
      toast("Erro ao buscar focos de queimada");
      setFires([]);
    } finally {
      setIsLoadingFires(false);
    }
  }, [position, shouldFetchFires]);

  /**
   * Busca localização por endereço
   */
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return toast("Digite um endereço");

    setIsSearching(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchTerm
        )}&limit=1`
      );

      const data = await response.json();

      if (data?.length > 0) {
        const { lat, lon } = data[0];
        const parsedLat = parseFloat(lat);
        const parsedLon = parseFloat(lon);

        if (!isNaN(parsedLat) && !isNaN(parsedLon)) {
          toast(`Local encontrado: ${data[0].display_name.split(",")[0]}`);
          setPosition([parsedLat, parsedLon]);
          setFires([]);
          setShouldFetchFires(true);
        } else {
          toast("Coordenadas inválidas");
        }
      } else {
        toast("Local não encontrado");
      }
    } catch (error) {
      console.error("Erro na busca:", error);
      toast("Erro na busca");
    } finally {
      setIsSearching(false);
    }
  };

  // Carrega localização inicial
  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  // Busca focos quando necessário
  useEffect(() => {
    if (shouldFetchFires) fetchFires();
  }, [shouldFetchFires, fetchFires]);

  // Calcula dados de risco
  const riskData =
    !isLoadingLocation && !isLoadingFires ? classifyAreaRisk(fires) : null;

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Buscar endereço..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isSearching}>
          {isSearching ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          <span className="ml-2">Buscar</span>
        </Button>
      </form>

      {isLoadingLocation || isLoadingFires ? (
        <div className="w-full rounded-md p-3 mb-4 bg-gray-100 flex items-center justify-center">
          <div className="animate-pulse flex space-x-2">
            <div className="h-4 w-4 rounded-full bg-gray-300"></div>
            <div className="h-3 w-32 rounded bg-gray-300"></div>
          </div>
        </div>
      ) : (
        riskData && <RiskAlert data={riskData} fireCount={fires.length} />
      )}

      <div className="w-full h-[450px] rounded-lg overflow-hidden relative bg-gray-100">
        {isLoadingLocation ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-2"></div>
            <p className="text-sm">Obtendo localização...</p>
          </div>
        ) : (
          <>
            {isLoadingFires && (
              <div className="absolute inset-0 bg-gray-100/70 flex flex-col items-center justify-center z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-2"></div>
                <p className="text-sm">Buscando focos de queimada...</p>
              </div>
            )}
            <MapComponent
              position={position}
              fires={fires}
              className="h-full w-full"
              radiusKm={DEFAULT_RADIUS_KM + 1}
            />
          </>
        )}
      </div>
    </div>
  );
}
