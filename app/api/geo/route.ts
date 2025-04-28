import { geolocation } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";

// São Paulo
const DEFAULT_COORDS = {
  latitude: "-23.564324",
  longitude: "-46.652713",
};

interface GeoResponse {
  latitude: string;
  longitude: string;
}

/**
 * API de geolocalização
 * Retorna a localização aproximada do usuário ou coordenadas padrão
 */
export async function GET(
  request: NextRequest
): Promise<NextResponse<GeoResponse>> {
  const geo = geolocation(request);

  const geoData: GeoResponse = {
    latitude: geo.latitude || DEFAULT_COORDS.latitude,
    longitude: geo.longitude || DEFAULT_COORDS.longitude,
  };

  if (process.env.NODE_ENV === "development") {
    geoData.latitude = DEFAULT_COORDS.latitude;
    geoData.longitude = DEFAULT_COORDS.longitude;
  }

  return NextResponse.json(geoData);
}
