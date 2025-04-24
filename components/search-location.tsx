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

    if (!searchTerm.trim()) {
      toast("Digite um endereço para buscar");
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchTerm
        )}&limit=1`
      );

      if (!response.ok) {
        throw new Error(`Erro na busca: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        onLocationFound([parseFloat(lat), parseFloat(lon)]);
        toast("Localização encontrada!");
      } else {
        toast("Nenhum resultado encontrado para este endereço");
      }
    } catch (error) {
      console.error("Erro ao buscar localização:", error);
      toast("Erro ao buscar localização");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Digite o endereço completo: Rua, número, bairro, cidade, estado..."
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
