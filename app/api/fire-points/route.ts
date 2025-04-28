import { NextRequest, NextResponse } from "next/server";
import { calculateBbox, getLastYearDateRange } from "@/lib/fire";
import type { FireFeature } from "@/lib/fire";

/**
 * API para buscar focos de incêndio do TerrasBrasilis
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lng = parseFloat(searchParams.get("lng") || "0");
  const radius = parseFloat(searchParams.get("radius") || "3");

  if (isNaN(lat) || isNaN(lng) || (lat === 0 && lng === 0)) {
    return NextResponse.json(
      { error: "Coordenadas inválidas" },
      { status: 400 }
    );
  }

  try {
    const bbox = calculateBbox(lat, lng, radius);
    const baseUrl = "https://terrabrasilis.dpi.inpe.br/queimadas/geoserver/ows";
    const params = new URLSearchParams({
      service: "WFS",
      version: "2.0.0",
      request: "GetFeature",
      typeName: "bdqueimadas:focos",
      outputFormat: "application/json",
      bbox: bbox.join(",") + ",EPSG:4326",
    });

    const response = await fetch(`${baseUrl}?${params.toString()}`, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error(`Erro: ${response.status}`);

    const data = await response.json();
    const dateRange = getLastYearDateRange();
    const startDate = new Date(`${dateRange.startDate}T00:00:00Z`);
    const endDate = new Date(`${dateRange.endDate}T23:59:59Z`);

    // Filtra dados por data e FRP
    if (data.features?.length) {
      data.features = data.features.filter((feature: FireFeature) => {
        const featureDate = new Date(feature.properties.data_hora_gmt);
        return (
          featureDate >= startDate &&
          featureDate <= endDate &&
          feature.properties.frp !== undefined
        );
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return NextResponse.json(
      { error: "Falha ao buscar dados de queimadas" },
      { status: 500 }
    );
  }
}
