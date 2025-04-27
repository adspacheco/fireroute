"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const fireIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface FireFeature {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    data_hora_gmt: string; // Mudado de 'date' para 'data_hora_gmt'
    municipio: string;
  };
}

export interface MapProps {
  position: LatLngExpression | LatLngTuple;
  zoom?: number;
  className?: string;
  fires?: FireFeature[];
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

const DEFAULT_ZOOM = 15;

export const Map = ({
  position,
  zoom = DEFAULT_ZOOM,
  className,
  fires,
}: MapProps) => {
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

      <Marker position={position}>
        <Popup>Sua localização atual</Popup>
      </Marker>

      {fires?.map((fire, index) => {
        const [lng, lat] = fire.geometry.coordinates; // Mantenha essa linha
        return (
          <Marker
            key={`fire-${index}`}
            position={[lat, lng]} // Lat primeiro, depois Lng
            icon={fireIcon}
          >
            <Popup>
              <div className="text-sm">
                <strong>Data:</strong>{" "}
                {new Date(fire.properties.data_hora_gmt).toLocaleDateString()}
                <br />
                <strong>Município:</strong>{" "}
                {fire.properties.municipio || "Não disponível"}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
