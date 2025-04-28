export interface FireIconOptions {
  iconUrl: string;
  shadowUrl: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
  popupAnchor: [number, number];
  shadowSize: [number, number];
}

// Tipos
export type RiskLevel = "segura" | "atenção" | "perigo";

export interface RiskData {
  level: RiskLevel;
  description: string;
  color: string;
  bgColor: string;
  recommendation: string;
}

export interface FireFeature {
  geometry: {
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: {
    data_hora_gmt: string;
    municipio: string;
    estado?: string;
    bioma?: string;
    satelite?: string;
    frp?: number; // Potência radiativa em MW
    risco?: string;
    tipo_queimada?: string;
    confianca?: number;
    uf?: string;
    [key: string]: unknown;
  };
}

export interface FireIconOptions {
  iconUrl: string;
  shadowUrl: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
  popupAnchor: [number, number];
  shadowSize: [number, number];
}

/**
 * Classifica intensidade do fogo baseado no FRP
 */
export function classifyFireIntensity(frp?: number): string {
  if (frp === undefined || frp === null) return "Não classificada";
  if (frp < 30) return "Baixa";
  if (frp < 100) return "Média";
  return "Alta";
}

/**
 * Determina nível de intensidade considerando FRP e risco reportado
 */
export function getFireIntensityLevel(fire: FireFeature): string {
  const frpIntensity = classifyFireIntensity(fire.properties.frp);
  const riskValue = fire.properties.risco?.toLowerCase();

  if (riskValue?.includes("alt")) return "Alta";
  if (
    riskValue?.includes("baix") &&
    frpIntensity !== "Alta" &&
    frpIntensity !== "Média"
  )
    return "Baixa";

  return frpIntensity;
}

/**
 * Retorna as opções de ícone com base na intensidade
 */
export function getFireIconOptions(intensity: string): FireIconOptions {
  const intensityLower = intensity.toLowerCase();
  let iconColor = "red";

  if (intensityLower.includes("baix")) {
    iconColor = "green";
  } else if (
    intensityLower.includes("médi") ||
    intensityLower.includes("medi")
  ) {
    iconColor = "orange";
  }

  return {
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${iconColor}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  };
}

/**
 * Obtém texto de tempo relativo
 */
export function getDaysSinceDetection(dateString: string): string {
  const diffDays = Math.floor(
    Math.abs(new Date().getTime() - new Date(dateString).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Ontem";
  return `Há ${diffDays} dias`;
}

/**
 * Formata data no padrão brasileiro
 */
export function formatDateTime(dateString: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

/**
 * Classifica risco da área baseado nos focos
 */
export function classifyAreaRisk(fires: FireFeature[]): RiskData {
  if (fires.length === 0) {
    return {
      level: "segura",
      description: "Área Historicamente Segura",
      color: "text-green-700",
      bgColor: "bg-green-100",
      recommendation: "Região sem registro de queimadas nos últimos anos.",
    };
  }

  // Conta por intensidade
  const counts = fires.reduce(
    (acc, fire) => {
      const level = getFireIntensityLevel(fire);
      if (level === "Alta") acc.high++;
      else if (level === "Média") acc.medium++;
      else acc.low++;
      return acc;
    },
    { high: 0, medium: 0, low: 0 }
  );

  // Focos de alta intensidade têm precedência
  if (counts.high > 0) {
    if (counts.high >= 3) {
      return {
        level: "perigo",
        description: "Área com Histórico de Alto Risco",
        color: "text-red-700",
        bgColor: "bg-red-100",
        recommendation: `Região com ${counts.high} registros graves de queimadas.`,
      };
    }
    return {
      level: "atenção",
      description: "Área com Histórico de Risco Relevante",
      color: "text-orange-700",
      bgColor: "bg-orange-100",
      recommendation: `Região com ${counts.high} ${
        counts.high === 1 ? "registro importante" : "registros importantes"
      } de queimada.`,
    };
  }

  // Focos de média intensidade
  if (counts.medium > 0) {
    return {
      level: "atenção",
      description:
        counts.medium >= 5
          ? "Área com Histórico de Atenção"
          : "Área com Histórico de Baixa Atenção",
      color: "text-yellow-700",
      bgColor: "bg-yellow-100",
      recommendation: `Região com ${counts.medium} ${
        counts.medium === 1 ? "registro moderado" : "registros moderados"
      } de queimada.`,
    };
  }

  // Apenas focos de baixa intensidade
  return counts.low >= 10
    ? {
        level: "atenção",
        description: "Área com Histórico de Muitos Focos Leves",
        color: "text-yellow-700",
        bgColor: "bg-yellow-100",
        recommendation: `Região com ${counts.low} registros pequenos de queimadas.`,
      }
    : {
        level: "segura",
        description: "Área com Histórico de Baixo Risco",
        color: "text-green-700",
        bgColor: "bg-green-100",
        recommendation: `Região com apenas ${counts.low} ${
          counts.low === 1 ? "registro pequeno" : "registros pequenos"
        } de queimada.`,
      };
}

/**
 * Calcula bounding box para busca geográfica
 */
export function calculateBbox(
  lat: number,
  lng: number,
  radiusKm: number
): [number, number, number, number] {
  const latDiff = radiusKm / 111;
  const lngDiff = radiusKm / (111 * Math.cos((lat * Math.PI) / 180));
  return [lng - lngDiff, lat - latDiff, lng + lngDiff, lat + latDiff];
}

/**
 * Retorna intervalo de datas para o último ano
 */
export function getLastYearDateRange(): { startDate: string; endDate: string } {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  };
}
