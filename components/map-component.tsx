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
  getRiskLevelForFire,
  compositeRiskScore,
  getFireIconOptions,
} from "@/lib/fire";
import { Info } from "lucide-react";

interface MapComponentProps {
  position: LatLngExpression;
  zoom?: number;
  className?: string;
  fires?: FireFeature[];
  radiusKm?: number;
}

/**
 * Retorna o texto de seca baseado no número de dias sem chuva
 */
function drynessText(days?: number): string | null {
  if (days == null) return null;
  if (days >= 60) return `seca severa – ${days} dias sem chuva`;
  if (days >= 30) return `seca prolongada – ${days} dias sem chuva`;
  if (days >= 15) return `poucas chuvas – só ${days} dias de chuva no período`;
  return null;
}

/**
 * Retorna o texto de vegetação baseado no tipo de vegetação
 */
function vegetationText(raw?: string): string | null {
  if (!raw) return null;
  const first = raw.split(";")[0].toLowerCase();

  if (first.includes("savana") || first.includes("cerrado"))
    return "área de cerrado, vulnerável a queimadas";

  if (
    first.includes("pastagem") ||
    first.includes("grama") ||
    first.includes("capim")
  )
    return "pasto seco, fogo se espalha rápido";

  if (first.includes("floresta") || first.includes("mata"))
    return "floresta densa, gera muita fumaça";

  if (first.includes("caatinga")) return "caatinga seca, combustível fácil";

  return null;
}

/**
 * Retorna o texto de intensidade baseado no FRP (potência radiativa)
 */
function intensityText(frp?: number): string | null {
  if (frp == null) return null;
  if (frp < 30) return "ponto de calor fraco";
  if (frp < 100) return "ponto de calor moderado";
  return "ponto de calor forte";
}

/**
 * Retorna o ícone de risco baseado no nível de risco
 */
function createRiskIcon(level: "segura" | "atenção" | "perigo"): L.Icon {
  return new L.Icon(getFireIconOptions(level));
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
  const detDate = new Date(fire.properties.data_hora_gmt);
  const diffDays = Math.floor((Date.now() - detDate.getTime()) / 86_400_000);
  const detText = diffDays === 0 ? "hoje" : `há ${diffDays} dias`;
  const detFmt = detDate.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const level = getRiskLevelForFire(fire);
  const score = compositeRiskScore(fire);

  const reasons: string[] = [];
  const dry = drynessText(fire.properties.numero_dias_sem_chuva as number);
  const veg = vegetationText(fire.properties.vegetacao as string);
  const inten = intensityText(fire.properties.frp);
  if (dry) reasons.push(dry);
  if (veg) reasons.push(veg);
  if (inten) reasons.push(inten);

  const levelLabel =
    level === "segura" ? "Baixo" : level === "atenção" ? "Médio" : "Alto";
  const levelColor =
    level === "perigo"
      ? "text-red-600"
      : level === "atenção"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="space-y-1 text-sm max-w-[230px]">
      <div className={`flex flex-col gap-0.5 font-semibold ${levelColor}`}>
        <span>
          Registro de risco: {levelLabel}
          <span
            className="text-xs text-gray-600 ml-1 align-middle"
            title="Pontuação entre 0 (baixo) e 1 (alto) calculada a partir de seca, vegetação e no ponto de calor enviado pelo satélite."
          >
            {`(${score.toFixed(2)} / 1)`} <Info className="inline h-3 w-3" />
          </span>
        </span>
        <span className="text-xs text-gray-600 font-normal">
          Registro feito {detText} ({detFmt})
        </span>
      </div>

      {reasons.length > 0 && (
        <div className="mt-1">
          <ul className="list-disc list-inside space-y-0.5">
            {reasons.map((r, i) => (
              <li key={i}>{`Registro de ${r}`}</li>
            ))}
          </ul>
        </div>
      )}
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
      scrollWheelZoom
      className={`${className} leaflet-container-relative`}
      doubleClickZoom
    >
      <ChangeView position={position} zoom={zoom} />
      <TileLayer
        attribution="&copy; OpenStreetMap"
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
      {fires.map((fire, i) => {
        const [lng, lat] = fire.geometry.coordinates;
        const lvl = getRiskLevelForFire(fire);
        return (
          <Marker key={i} position={[lat, lng]} icon={createRiskIcon(lvl)}>
            <Popup>
              <FirePopup fire={fire} />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default MapComponent;
