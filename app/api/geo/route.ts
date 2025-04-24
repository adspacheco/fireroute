import { geolocation } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const geo = geolocation(request);

  const devGeo =
    process.env.NODE_ENV === "development"
      ? {
          latitude: "-23.564324",
          longitude: "-46.652713",
        }
      : {
          latitude: geo.latitude || "-23.564324",
          longitude: geo.longitude || "-46.652713",
        };

  return NextResponse.json(devGeo);
}
