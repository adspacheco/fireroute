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
    coordinates: [number, number];
  };
  properties: {
    data_hora_gmt: string;
    municipio: string;
    estado?: string;
    bioma?: string;
    satelite?: string;
    frp?: number;
    risco_fogo?: number;
    numero_dias_sem_chuva?: number;
    vegetacao?: string;
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
 * Normaliza um valor para a faixa 0–1.
 * Se estiver fora do intervalo, é saturado nos extremos.
 */
function normalize(value: number, min: number, max: number): number {
  if (value <= min) return 0;
  if (value >= max) return 1;
  return (value - min) / (max - min);
}

/**
 * Converte descrição de vegetação em peso de 0–1 (quanto maior, mais inflamável).
 */
function vegetationFactor(text?: string): number {
  if (!text) return 0.5;
  const t = text.toLowerCase();
  if (t.includes("savana") || t.includes("pastagem") || t.includes("gramíneas"))
    return 1;
  if (t.includes("floresta")) return 0.8;
  if (t.includes("corpos d´água") || t.includes("área urbana")) return 0.2;
  return 0.5;
}

/**
 * Calcula o score de risco (0–1) para um foco individual.
 *  - 40 %   FRP (potência radiativa)
 *  - 30 %   dias sem chuva
 *  - 20 %   índice risco_fogo fornecido pelo INPE
 *  - 10 %   tipo de vegetação
 */
export function compositeRiskScore(fire: FireFeature): number {
  const frpN = normalize(fire.properties.frp ?? 0, 0, 300);
  const diasSecosN = normalize(
    fire.properties.numero_dias_sem_chuva ?? 0,
    0,
    30
  );
  let riscoIdx = fire.properties.risco_fogo ?? 0;
  if (riscoIdx < 0) riscoIdx = 0;
  if (riscoIdx > 1) riscoIdx = 1;
  const veg = vegetationFactor(fire.properties.vegetacao as string);
  return 0.4 * frpN + 0.3 * diasSecosN + 0.2 * riscoIdx + 0.1 * veg;
}

/** Mapeia um score 0–1 para o nível de risco textual */
export function riskLevelForScore(score: number): RiskLevel {
  if (score >= 0.7) return "perigo";
  if (score >= 0.4) return "atenção";
  return "segura";
}

export function getRiskLevelForFire(fire: FireFeature): RiskLevel {
  return riskLevelForScore(compositeRiskScore(fire));
}

/**
 * Retorna as opções de ícone com base no nível de risco
 */
export function getFireIconOptions(level: RiskLevel): FireIconOptions {
  const color =
    level === "segura" ? "green" : level === "atenção" ? "orange" : "red";
  return {
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
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
  const diff = Math.floor(
    Math.abs(Date.now() - new Date(dateString).getTime()) / 86400000
  );
  if (diff === 0) return "Hoje";
  if (diff === 1) return "Ontem";
  return `Há ${diff} dias`;
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
 * Gera o objeto RiskData para exibição na interface, analisando todos os focos
 * dentro da área (por exemplo, raio de 3 km).
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

  // Contagem por níveis
  let worst: RiskLevel = "segura" as RiskLevel;
  let perigo = 0;
  let atencao = 0;

  fires.forEach((f) => {
    const lvl = getRiskLevelForFire(f);
    if (lvl === "perigo") perigo++;
    if (lvl === "atenção") atencao++;
    if (lvl === "perigo") worst = "perigo";
    else if (lvl === "atenção" && worst !== "perigo") worst = "atenção";
  });

  if (worst === "perigo") {
    return {
      level: "perigo",
      description: "Área com Histórico de Alto Risco",
      color: "text-red-700",
      bgColor: "bg-red-100",
      recommendation: `Região com ${perigo} focos de alto risco registrados recentemente.`,
    };
  }

  if (worst === "atenção") {
    return {
      level: "atenção",
      description: "Área com Histórico de Risco Relevante",
      color: "text-orange-700",
      bgColor: "bg-orange-100",
      recommendation: `Região com ${atencao} focos de risco moderado registrados recentemente.`,
    };
  }

  // Se não houver focos de risco, mas houver focos leves
  return {
    level: "segura",
    description: "Área Historicamente Segura",
    color: "text-green-700",
    bgColor: "bg-green-100",
    recommendation: "Região com apenas focos leves ou inexistentes.",
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
