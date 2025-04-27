// Classificação de risco com base principalmente na intensidade dos pontos de queimada históricos
export type RiskLevel = "segura" | "atenção" | "perigo";

export interface RiskData {
  level: RiskLevel;
  description: string;
  color: string;
  bgColor: string;
  recommendation: string;
}

interface FireFeature {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    data_hora_gmt: string;
    municipio: string;
    risco?: string;
    frp?: number;
    [key: string]: unknown;
  };
}

// Função para classificar a intensidade de um ponto de queimada
export function classifyFireIntensity(frp: number | undefined): string {
  if (!frp) return "Média";
  if (frp < 30) return "Baixa";
  if (frp < 100) return "Média";
  return "Alta";
}

// Função para determinar a intensidade final de um foco de queimada
export function getFireIntensityLevel(fire: FireFeature): string {
  // Determine o FRP e o risco explícito (se disponíveis)
  const frpValue = fire.properties.frp;
  const riskValue = fire.properties.risco;

  // Determinar intensidade baseada no FRP
  const frpIntensity = classifyFireIntensity(frpValue);

  // Se temos informação de risco explícito, considerar
  if (riskValue) {
    if (riskValue.toLowerCase().includes("alt")) {
      return "Alta";
    } else if (
      riskValue.toLowerCase().includes("baix") &&
      frpIntensity !== "Alta" &&
      frpIntensity !== "Média"
    ) {
      return "Baixa";
    }
  }

  // Se não temos risco explícito, usar a classificação baseada no FRP
  return frpIntensity;
}

// Função para classificar o nível de risco baseado principalmente na intensidade dos pontos
export function classifyAreaRisk(fires: FireFeature[]): RiskData {
  // Se não há pontos, a área é segura
  if (fires.length === 0) {
    return {
      level: "segura",
      description: "Área Historicamente Segura",
      color: "text-green-700",
      bgColor: "bg-green-100",
      recommendation:
        "Região sem registro de queimadas nos últimos anos. Mesmo assim, evite fogueiras e queima de lixo em períodos de seca.",
    };
  }

  // Contar focos por categoria de intensidade
  let highIntensityCount = 0;
  let mediumIntensityCount = 0;
  let lowIntensityCount = 0;

  fires.forEach((fire) => {
    const intensityLevel = getFireIntensityLevel(fire);

    if (intensityLevel === "Alta") highIntensityCount++;
    else if (intensityLevel === "Média") mediumIntensityCount++;
    else lowIntensityCount++;
  });

  // Classificação baseada principalmente na presença de focos de média/alta intensidade
  // e secundariamente na quantidade total

  // Primeiro checar por focos de alta intensidade
  if (highIntensityCount > 0) {
    if (highIntensityCount >= 3) {
      return {
        level: "perigo",
        description: "Área com Histórico de Alto Risco",
        color: "text-red-700",
        bgColor: "bg-red-100",
        recommendation: `Região com ${highIntensityCount} registros graves de queimadas. Durante estiagens, tenha um plano de evacuação e mantenha contatos de emergência à mão.`,
      };
    } else {
      return {
        level: "atenção",
        description: "Área com Histórico de Risco Relevante",
        color: "text-orange-700",
        bgColor: "bg-orange-100",
        recommendation: `Região com ${highIntensityCount} ${
          highIntensityCount === 1
            ? "registro importante"
            : "registros importantes"
        } de queimada. Em períodos secos, evite acúmulo de materiais inflamáveis perto de casa.`,
      };
    }
  }

  // Se não há focos de alta intensidade, verificar focos de média intensidade
  if (mediumIntensityCount > 0) {
    if (mediumIntensityCount >= 5) {
      return {
        level: "atenção",
        description: "Área com Histórico de Atenção",
        color: "text-yellow-700",
        bgColor: "bg-yellow-100",
        recommendation: `Região com ${mediumIntensityCount} registros moderados de queimadas. Guarde documentos importantes em local protegido e evite queimas controladas, mesmo com autorização.`,
      };
    } else {
      return {
        level: "atenção",
        description: "Área com Histórico de Baixa Atenção",
        color: "text-yellow-700",
        bgColor: "bg-yellow-100",
        recommendation: `Região com ${mediumIntensityCount} ${
          mediumIntensityCount === 1
            ? "registro moderado"
            : "registros moderados"
        } de queimada. Tenha cuidado com fogueiras e cigarros, especialmente em áreas secas.`,
      };
    }
  }

  // Se só há focos de baixa intensidade
  if (lowIntensityCount >= 10) {
    return {
      level: "atenção",
      description: "Área com Histórico de Muitos Focos Leves",
      color: "text-yellow-700",
      bgColor: "bg-yellow-100",
      recommendation: `Região com ${lowIntensityCount} registros pequenos de queimadas. Verifique se sua casa tem rotas de fuga desimpedidas e esteja atento a cheiro de fumaça em dias secos.`,
    };
  } else {
    return {
      level: "segura",
      description: "Área com Histórico de Baixo Risco",
      color: "text-green-700",
      bgColor: "bg-green-100",
      recommendation: `Região com apenas ${lowIntensityCount} ${
        lowIntensityCount === 1 ? "registro pequeno" : "registros pequenos"
      } de queimada. Mantenha vegetação ao redor da casa aparada e evite acúmulo de folhas secas.`,
    };
  }
}
