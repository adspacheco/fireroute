import { MapPin, AlertTriangle, ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-5 flex flex-col items-center justify-center gap-10 py-10">
      <section className="py-8 w-full">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Monitoramento de Focos de Incêndio
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Acompanhe em tempo real os focos de incêndio na sua região e
                receba alertas sobre riscos potenciais.
              </p>
            </div>
            <div className="space-x-4 mt-6">
              <Button asChild size="lg" className="bg-red-500 hover:bg-red-600">
                <Link href="/mapa">
                  Ver Mapa <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-3 w-full">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              Localize Focos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Identifique focos de incêndio próximos à sua localização ou em
              qualquer região de interesse no Brasil.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Avalie Riscos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Receba informações sobre o nível de risco e recomendações de
              segurança baseadas em dados atualizados.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-green-500" />
              Dados Detalhados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Acesse dados como intensidade do foco, dias sem chuva, tipo de
              vegetação e outras informações relevantes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
