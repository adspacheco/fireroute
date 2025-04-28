"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import {
  FireFeature,
  getFireIntensityLevel,
  getDaysSinceDetection,
  formatDateTime,
  getFireIconOptions,
} from "@/lib/fire";

interface MapComponentProps {
  position: LatLngExpression;
  zoom?: number;
  className?: string;
  fires?: FireFeature[];
  radiusKm?: number;
}

/**
 * Cria ícone Leaflet com base na intensidade
 */
function getFireIcon(intensity: string): L.Icon {
  const options = getFireIconOptions(intensity);
  return new L.Icon(options);
}

/**
 * Componente que atualiza a visão do mapa quando a posição muda
 */
function ChangeView({
  position,
  zoom,
}: {
  position: LatLngExpression;
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, zoom);
  }, [map, position, zoom]);
  return null;
}

/**
 * Conteúdo do popup para marcadores de incêndio
 */
function FirePopup({ fire }: { fire: FireFeature }) {
  const { properties } = fire;
  const daysText = getDaysSinceDetection(properties.data_hora_gmt);
  const formattedDate = formatDateTime(properties.data_hora_gmt);

  const municipio = properties.municipio || "Não informado";
  const estado = properties.estado || properties.uf || "Não informado";
  const bioma = properties.bioma || "Não informado";
  const satelite = properties.satelite || "Não informado";
  const frp = properties.frp
    ? `${properties.frp.toFixed(1)} MW`
    : "Não informado";
  const intensidade = getFireIntensityLevel(fire);
  const riscoClass =
    intensidade === "Alta"
      ? "text-red-600"
      : intensidade === "Baixa"
      ? "text-green-600"
      : "text-yellow-600";

  return (
    <div className="p-1">
      <h3 className="font-semibold text-base text-red-600 border-b pb-1 mb-2">
        Foco de Queimada {daysText}
      </h3>
      <div className="grid grid-cols-[auto_1fr] gap-x-2 text-sm">
        <span className="font-semibold">Data/Hora:</span>
        <span>{formattedDate}</span>
        <span className="font-semibold">Município:</span>
        <span>{municipio}</span>
        <span className="font-semibold">Estado:</span>
        <span>{estado}</span>
        <span className="font-semibold">Bioma:</span>
        <span>{bioma}</span>
        <span className="font-semibold">Satélite:</span>
        <span>{satelite}</span>
        <span className="font-semibold">Intensidade:</span>
        <span className={riscoClass}>
          {intensidade} ({frp})
        </span>
      </div>
      <div className="mt-2 pt-1 border-t text-xs text-gray-500">
        Coordenadas: {fire.geometry.coordinates[1].toFixed(4)},{" "}
        {fire.geometry.coordinates[0].toFixed(4)}
      </div>
    </div>
  );
}

/**
 * Componente de mapa usando Leaflet para mostrar localização e focos de incêndio
 */
export function MapComponent({
  position,
  zoom = 13,
  className = "",
  fires = [],
  radiusKm = 3,
}: MapComponentProps) {
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
      className={`${className} leaflet-container-relative`}
      doubleClickZoom={true}
    >
      <ChangeView position={position} zoom={zoom} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Circle
        center={position}
        radius={radiusKm * 1000}
        pathOptions={{
          color: "#3b82f6",
          fillColor: "#3b82f6",
          fillOpacity: 0.1,
          weight: 1,
        }}
      >
        <Popup>Raio de busca: {radiusKm} km</Popup>
      </Circle>

      <Marker position={position}>
        <Popup>Sua localização atual</Popup>
      </Marker>

      {fires
        .filter((fire) => fire.properties.frp !== undefined)
        .map((fire, index) => {
          const [lng, lat] = fire.geometry.coordinates;
          const intensity = getFireIntensityLevel(fire);

          return (
            <Marker
              key={`fire-${index}`}
              position={[lat, lng]}
              icon={getFireIcon(intensity)}
            >
              <Popup className="fire-popup">
                <FirePopup fire={fire} />
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
}

export default MapComponent;
