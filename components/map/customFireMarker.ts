import L from "leaflet";

export function classifyFireIntensity(frp: number | undefined): string {
  if (!frp) return "Média";
  if (frp < 30) return "Baixa";
  if (frp < 100) return "Média";
  return "Alta";
}

export function getFireIcon(intensity: string): L.Icon {
  let iconUrl: string;

  switch (intensity.toLowerCase()) {
    case "alta":
    case "alto":
      iconUrl =
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";
      break;
    case "média":
    case "medio":
      iconUrl =
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png";
      break;
    case "baixa":
    case "baixo":
      iconUrl =
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png";
      break;
    default:
      iconUrl =
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";
  }

  return new L.Icon({
    iconUrl,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

export function getDaysSinceDetection(dateString: string): string {
  const fireDate = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - fireDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Ontem";
  return `Há ${diffDays} dias`;
}

export function formatDateTime(dateString: string): string {
  const fireDate = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(fireDate);
}
