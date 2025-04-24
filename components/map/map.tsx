"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export interface MapProps {
  position: LatLngExpression | LatLngTuple;
  zoom?: number;
  className?: string;
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

export const Map = ({ position, zoom = DEFAULT_ZOOM, className }: MapProps) => {
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
        <Popup>FIAP :)</Popup>
      </Marker>
    </MapContainer>
  );
};
