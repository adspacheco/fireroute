import {
  Flame,
  ArrowRight,
  Target,
  Shield,
  Navigation,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-5 flex flex-col items-center justify-center gap-10 py-10">
      <section className="w-full py-12 md:py-16 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl flex items-center justify-center">
              <Flame className="mr-2 h-10 w-10 text-orange-500" />
              FireRoute
            </h1>
            <p className="text-xl md:text-2xl font-medium text-orange-500">
              Navegue pela Rota do Fogo
            </p>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Visualize e compreenda o histórico de focos de incêndio próximos a
              você
            </p>
          </div>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Link href="/mapa">
                Explorar o Mapa <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-3 w-full">
        <Card className="border-t-4 border-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-500" />
              Radar de Chamas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Visualize todos os pontos de fogo em um raio de 4km ao seu redor.
              O FireRoute revela as zonas de risco que podem estar invisíveis
              para você.
            </p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Alertas de Área
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Receba alertas sobre o risco da região baseados na quantidade e
              severidade dos focos. Verde para áreas seguras, amarelo para
              atenção e vermelho para áreas de perigo.
            </p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-yellow-500" />
              Histórico Completo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Explore os dados dos últimos 12 meses para entender os padrões de
              queimadas na sua região e tomar decisões mais informadas com base
              no histórico completo.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Navigation className="mr-2 h-6 w-6 text-orange-500" />
          Como funciona
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-3">
              <span className="text-orange-600 font-bold text-xl">1</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Localize-se</h3>
            <p className="text-gray-700">
              Posicione o mapa na sua localização atual ou busque qualquer
              endereço específico.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-3">
              <span className="text-orange-600 font-bold text-xl">2</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Visualize os Focos</h3>
            <p className="text-gray-700">
              Veja os marcadores coloridos de cada foco de incêndio detectado no
              último ano. Verde (baixo risco), amarelo (médio) e vermelho
              (alto).
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-3">
              <span className="text-orange-600 font-bold text-xl">3</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Confira o Alerta</h3>
            <p className="text-gray-700">
              Veja o alerta de risco da área completa, calculado com base na
              quantidade e severidade de todos os focos detectados no raio de
              4km.
            </p>
          </div>
        </div>
      </div>

      <div className="border border-orange-200 bg-orange-50 p-6 rounded-lg w-full text-center">
        <h2 className="text-2xl font-bold text-orange-700 mb-4">
          Conheça a história do fogo em sua região
        </h2>
        <p className="text-gray-700 mb-6">
          Dados históricos para você tomar decisões mais informadas
        </p>
        <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
          <Link href="/mapa">
            Acessar o FireRoute agora <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="flex justify-center w-full">
        <Button asChild variant="outline" className="mt-2">
          <Link href="/sobre">
            Saiba mais sobre o FireRoute <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
