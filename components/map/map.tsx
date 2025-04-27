"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import {
  getFireIcon,
  classifyFireIntensity,
  getDaysSinceDetection,
  formatDateTime,
} from "./customFireMarker";

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

export interface MapProps {
  position: LatLngExpression | LatLngTuple;
  zoom?: number;
  className?: string;
  fires?: FireFeature[];
  radiusKm?: number;
}

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

const DEFAULT_ZOOM = 13;
const DEFAULT_RADIUS_KM = 3;

export const Map = ({
  position,
  zoom = DEFAULT_ZOOM,
  className,
  fires,
  radiusKm = DEFAULT_RADIUS_KM,
}: MapProps) => {
  const radiusMeters = radiusKm * 1000;

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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Circle
        center={position}
        radius={radiusMeters}
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
        ?.filter((fire) => fire.properties.frp !== undefined)
        .map((fire, index) => {
          const [lng, lat] = fire.geometry.coordinates;

          const frpIntensity = classifyFireIntensity(fire.properties.frp);

          let finalIntensity = "Média";

          if (fire.properties.risco) {
            finalIntensity = fire.properties.risco;
          } else if (fire.properties.frp) {
            finalIntensity = frpIntensity;
          }

          if (fire.properties.risco && fire.properties.frp) {
            if (
              frpIntensity === "Alta" &&
              !fire.properties.risco.toLowerCase().includes("alt")
            ) {
              finalIntensity = "Alta";
            } else if (
              fire.properties.risco.toLowerCase().includes("alt") &&
              frpIntensity !== "Alta"
            ) {
              finalIntensity = "Alta";
            }
          }

          const icon = getFireIcon(finalIntensity);

          const daysText = getDaysSinceDetection(fire.properties.data_hora_gmt);

          const formattedDate = formatDateTime(fire.properties.data_hora_gmt);
          const municipio = fire.properties.municipio || "Não informado";
          const estado =
            fire.properties.estado || fire.properties.uf || "Não informado";
          const bioma = fire.properties.bioma || "Não informado";
          const satelite = fire.properties.satelite || "Não informado";

          const riscoExibido =
            fire.properties.risco ||
            (fire.properties.frp ? frpIntensity : "Médio");

          const frp = fire.properties.frp
            ? `${fire.properties.frp.toFixed(1)} MW`
            : "Não informado";
          const confianca = fire.properties.confianca
            ? `${(fire.properties.confianca * 100).toFixed(0)}%`
            : "Não informado";

          const riscoClass = finalIntensity.toLowerCase().includes("alt")
            ? "text-red-600"
            : finalIntensity.toLowerCase().includes("baix")
            ? "text-green-600"
            : "text-yellow-600";

          return (
            <Marker key={`fire-${index}`} position={[lat, lng]} icon={icon}>
              <Popup className="fire-popup">
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

                    <span className="font-semibold">Risco:</span>
                    <span className={`font-medium ${riscoClass}`}>
                      {riscoExibido}
                    </span>

                    {fire.properties.frp && (
                      <>
                        <span className="font-semibold">Intensidade:</span>
                        <span
                          className={
                            frpIntensity === "Alta"
                              ? "text-red-600"
                              : frpIntensity === "Baixa"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }
                        >
                          {frp} ({frpIntensity})
                        </span>
                      </>
                    )}

                    {fire.properties.confianca && (
                      <>
                        <span className="font-semibold">Confiança:</span>
                        <span>{confianca}</span>
                      </>
                    )}
                  </div>

                  <div className="mt-2 pt-1 border-t text-xs text-gray-500">
                    Coordenadas: {lat.toFixed(4)}, {lng.toFixed(4)}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};
