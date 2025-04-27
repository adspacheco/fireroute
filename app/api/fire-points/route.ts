import { NextRequest, NextResponse } from "next/server";

function calculateBbox(lat: number, lng: number, radiusKm: number): number[] {
  const latDiff = radiusKm / 111;
  const lngDiff = radiusKm / (111 * Math.cos((lat * Math.PI) / 180));

  return [lng - lngDiff, lat - latDiff, lng + lngDiff, lat + latDiff];
}

function getLastYearDateRange(): { startDate: string; endDate: string } {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lng = parseFloat(searchParams.get("lng") || "0");
  const radius = parseFloat(searchParams.get("radius") || "3");

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (isNaN(lat) || isNaN(lng) || (lat === 0 && lng === 0)) {
    return NextResponse.json(
      { error: "Coordenadas inválidas" },
      { status: 400 }
    );
  }

  const bbox = calculateBbox(lat, lng, radius);

  try {
    const baseUrl = "https://terrabrasilis.dpi.inpe.br/queimadas/geoserver/ows";

    const queryParams = new URLSearchParams({
      service: "WFS",
      version: "2.0.0",
      request: "GetFeature",
      typeName: "bdqueimadas:focos",
      outputFormat: "application/json",
      bbox: bbox.join(",") + ",EPSG:4326",
    });

    const url = `${baseUrl}?${queryParams.toString()}`;
    console.log(`URL da requisição simplificada: ${url}`);

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();

    const dateRange =
      startDate && endDate ? { startDate, endDate } : getLastYearDateRange();

    const startDateTime = new Date(`${dateRange.startDate}T00:00:00Z`);
    const endDateTime = new Date(`${dateRange.endDate}T23:59:59Z`);

    if (data.features && Array.isArray(data.features)) {
      data.features = data.features.filter(
        (feature: {
          properties: { data_hora_gmt: string | number | Date };
        }) => {
          const featureDate = new Date(feature.properties.data_hora_gmt);
          return featureDate >= startDateTime && featureDate <= endDateTime;
        }
      );

      data.features = data.features.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (feature: any) => feature.properties.frp !== undefined
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados de queimadas:", error);
    return NextResponse.json(
      { error: "Falha ao buscar dados de queimadas" },
      { status: 500 }
    );
  }
}
