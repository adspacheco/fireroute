"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LatLngTuple } from "leaflet";

interface SearchLocationProps {
  onLocationFound: (location: LatLngTuple) => void;
}

export function SearchLocation({ onLocationFound }: SearchLocationProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return toast("Digite um endereço");

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchTerm
        )}&limit=1`
      );

      if (!response.ok) throw new Error(`Status: ${response.status}`);
      const data = await response.json();

      if (data?.length > 0) {
        const { lat, lon } = data[0];
        const parsedLat = parseFloat(lat);
        const parsedLon = parseFloat(lon);

        if (!isNaN(parsedLat) && !isNaN(parsedLon)) {
          toast(`Local encontrado: ${data[0].display_name.split(",")[0]}`);
          onLocationFound([parsedLat, parsedLon]);
        } else {
          toast("Coordenadas inválidas recebidas");
        }
      } else {
        toast("Nenhum resultado encontrado");
      }
    } catch (error) {
      console.error("Busca falhou:", error);
      toast("Erro na busca");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Endereço completo: Rua, número, cidade, estado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
      </div>
      <Button type="submit" disabled={isSearching}>
        {isSearching ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Search className="h-4 w-4" />
        )}
        <span className="ml-2">Buscar</span>
      </Button>
    </form>
  );
}
