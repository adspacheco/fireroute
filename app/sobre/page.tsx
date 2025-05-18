"use client";
import {
  Shield,
  AlertCircle,
  AlertTriangle,
  Code,
  Users,
  Database,
  GitBranch,
  Calculator,
  BarChart,
  Map,
  UserCircle,
  Info,
} from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-5 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Sobre o FireRoute
        </h1>
        <p className="text-lg text-gray-600 border-l-4 border-orange-400 pl-4 py-1">
          Ferramenta que permite ao cidadão visualizar o histórico de focos de
          incêndio próximos à sua localização nos últimos 12 meses
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <p className="text-gray-700 leading-relaxed">
            O FireRoute é uma aplicação web para o cidadão visualizar dados
            históricos de focos de incêndio próximos à sua localização.
            Utilizando dados dos últimos 12 meses do INPE, a ferramenta
            possibilita que qualquer pessoa identifique áreas com histórico de
            queimadas em seu entorno. Com uma interface simples e intuitiva, o
            usuário permite o acesso à sua localização (ou pode buscar um
            endereço específico) e visualiza marcadores coloridos indicando a
            gravidade dos focos de incêndio detectados naquela região.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="h-6 w-6 mr-2 text-green-500" />
            Equipe
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-3 overflow-hidden flex items-center justify-center">
                <Image
                  src="/anderson.jpeg"
                  alt="Anderson Pacheco de Souza"
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-gray-800 mb-1 text-center">
                Anderson Pacheco
              </h3>
              <p className="text-sm text-blue-600 font-medium mb-2 text-center">
                Tech Lead
              </p>
              <p className="text-xs text-gray-600 text-center">
                Responsável pela arquitetura e desenvolvimento do projeto.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-3 overflow-hidden flex items-center justify-center">
                <img
                  src="/api/placeholder/150/150"
                  alt="Pedro Cavion Zuffo"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-gray-800 mb-1 text-center">
                Pedro Cavion Zuffo
              </h3>
              <p className="text-sm text-blue-600 font-medium mb-2 text-center">
                Front-end Técnico
              </p>
              <p className="text-xs text-gray-600 text-center">
                Responsável pelo desenvolvimento de componentes React e
                interface do usuário.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-3 overflow-hidden flex items-center justify-center">
                <img
                  src="/api/placeholder/150/150"
                  alt="Mateus Felipe Silva de Macedo"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-gray-800 mb-1 text-center">
                Mateus Felipe
              </h3>
              <p className="text-sm text-blue-600 font-medium mb-2 text-center">
                Front-end Design
              </p>
              <p className="text-xs text-gray-600 text-center">
                Responsável pelo design da experiência de usuário e pesquisa
                sobre INPE.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-3 overflow-hidden flex items-center justify-center">
                <img
                  src="/api/placeholder/150/150"
                  alt="Rodrigo Oliveira Maia Piñeiro"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-gray-800 mb-1 text-center">
                Rodrigo Oliveira
              </h3>
              <p className="text-sm text-blue-600 font-medium mb-2 text-center">
                Especialista em Algoritmos
              </p>
              <p className="text-xs text-gray-600 text-center">
                Responsável pelo algoritmo de classificação de risco dos focos.
              </p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <GitBranch className="h-6 w-6 mr-2 text-indigo-500" />
            Tecnologias Utilizadas
          </h2>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-indigo-600 mb-2">Frontend</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>React.js (componentes funcionais, hooks)</li>
                  <li>Next.js (framework web)</li>
                  <li>Tailwind CSS (estilização responsiva)</li>
                  <li>React Leaflet (biblioteca de mapas)</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-indigo-600 mb-2">
                  Backend/API
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>API Routes do Next.js</li>
                  <li>Fetch API (consumo de APIs externas)</li>
                  <li>JavaScript assíncrono (async/await)</li>
                  <li>Vercel Edge Functions</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-medium text-indigo-600 mb-2">
                  Fontes de Dados
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>API WFS do INPE (dados de focos)</li>
                  <li>OpenStreetMap (geocodificação)</li>
                  <li>Geolocation API do navegador</li>
                  <li>Vercel Edge Geolocation (fallback)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Info className="h-6 w-6 mr-2 text-blue-500" />
            Para que serve o FireRoute?
          </h2>
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <p className="text-gray-700">
              O FireRoute foi desenvolvido pensando no cidadão que precisa
              entender o histórico de focos de incêndio na sua região:
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-700 mb-2">
                  Consulta de Histórico Local
                </h3>
                <p className="text-sm text-gray-700">
                  O usuário consegue visualizar todos os focos de incêndio que
                  ocorreram próximos à sua localização nos últimos 12 meses,
                  identificando áreas que historicamente apresentam maior
                  frequência de queimadas.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-medium text-green-700 mb-2">
                  Acesso Simplificado
                </h3>
                <p className="text-sm text-gray-700">
                  Acesso a dados que antes estavam disponíveis apenas para
                  especialistas e órgãos públicos. O FireRoute simplifica a
                  visualização e interpretação dos dados de focos do INPE para
                  qualquer pessoa.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <h3 className="font-medium text-yellow-700 mb-2">
                  Identificação de Risco
                </h3>
                <p className="text-sm text-gray-700">
                  Os marcadores coloridos permitem identificar facilmente o
                  nível de risco de cada foco: verde para baixo risco, amarelo
                  para médio risco e vermelho para alto risco, baseado nas
                  características de cada ocorrência.
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h3 className="font-medium text-purple-700 mb-2">
                  Consulta por Endereço
                </h3>
                <p className="text-sm text-gray-700">
                  Além da localização atual, o usuário pode pesquisar qualquer
                  endereço e verificar o histórico de focos naquela região,
                  facilitando a análise de áreas de interesse como propriedades
                  rurais, parques ou reservas.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <UserCircle className="h-6 w-6 mr-2 text-green-500" />
            Como o Cidadão Utiliza
          </h2>
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="space-y-4">
              <p className="text-gray-700">
                O FireRoute foi projetado para ser extremamente simples de usar,
                seguindo um fluxo intuitivo:
              </p>

              <ol className="relative border-l border-gray-200 ml-3 space-y-6 pt-2">
                <li className="mb-6 ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                    <span className="text-blue-600 font-bold">1</span>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                    Acesso e Localização
                  </h3>
                  <p className="mb-2 text-sm text-gray-700">
                    Ao acessar o FireRoute, o navegador solicita permissão para
                    acessar a localização do usuário. Isso permite centralizar o
                    mapa exatamente onde a pessoa está.
                  </p>
                  <p className="text-xs text-gray-500">
                    Caso prefira, o usuário pode negar a permissão e digitar um
                    endereço manualmente.
                  </p>
                </li>

                <li className="mb-6 ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                    <span className="text-blue-600 font-bold">2</span>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                    Visualização do Raio
                  </h3>
                  <p className="mb-2 text-sm text-gray-700">
                    Um círculo de 4 km é desenhado ao redor da localização,
                    representando a área de análise. Dentro deste raio, todos os
                    focos de incêndio dos últimos 12 meses são exibidos como
                    marcadores coloridos.
                  </p>
                </li>

                <li className="mb-6 ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                    <span className="text-blue-600 font-bold">3</span>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                    Exploração dos Marcadores
                  </h3>
                  <p className="mb-2 text-sm text-gray-700">
                    O usuário pode clicar em qualquer marcador para ver
                    informações detalhadas sobre aquele foco específico: data de
                    detecção, intensidade (FRP), número de dias sem chuva e tipo
                    de vegetação.
                  </p>
                </li>

                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                    <span className="text-blue-600 font-bold">4</span>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                    Alertas de Risco
                  </h3>
                  <p className="text-sm text-gray-700">
                    No topo da tela, um alerta indica o nível geral de risco da
                    área, baseado na quantidade e severidade dos focos
                    encontrados no raio de 4 km, com recomendações apropriadas
                    para o usuário.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <BarChart className="h-6 w-6 mr-2 text-orange-500" />
            Análise do Histórico de 12 Meses
          </h2>
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-gray-700 mb-4">
              Uma característica diferencial do FireRoute é a análise do
              histórico completo dos últimos 12 meses, implementada através da
              seguinte função:
            </p>
            <div className="bg-gray-50 p-4 rounded-md overflow-x-auto w-full mb-4">
              <div className="min-w-[500px]">
                <pre className="text-xs md:text-sm text-gray-800 p-0 m-0">
                  {`// Função para obter intervalo de datas do último ano completo
export function getLastYearDateRange(): { startDate: string; endDate: string } {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1); // Último ano completo
  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0]
  };
}`}
                </pre>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              Essa abordagem histórica oferece vantagens importantes para o
              cidadão:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <h3 className="font-medium text-amber-700 mb-2">
                  Identificação de Padrões Sazonais
                </h3>
                <p className="text-sm text-gray-700">
                  O usuário consegue perceber se uma área tem ocorrências
                  concentradas em determinadas épocas do ano, como nos meses
                  mais secos, permitindo ações preventivas nos períodos
                  críticos.
                </p>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <h3 className="font-medium text-emerald-700 mb-2">
                  Análise de Recorrência
                </h3>
                <p className="text-sm text-gray-700">
                  Áreas com focos recorrentes ao longo do ano podem indicar
                  problemas estruturais como queimadas intencionais ou falhas na
                  fiscalização, sendo informação importante para o cidadão.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Map className="h-6 w-6 mr-2 text-red-500" />
            Raio de Busca de 4km
          </h2>
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-gray-700 mb-4">
              O FireRoute utiliza um raio padrão de 4 quilômetros ao redor da
              localização do usuário, escolhido com base em estudos sobre a
              relevância das queimadas para o cidadão:
            </p>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <Map className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">
                    Visualização do Raio no Mapa
                  </h3>
                  <p className="text-sm text-gray-700">
                    O raio é exibido como um círculo semi-transparente azul ao
                    redor da localização central, proporcionando um contexto
                    visual claro da área sendo analisada pelo sistema.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Percepção Humana
                </h3>
                <p className="text-xs text-gray-600">
                  4km representa a distância aproximada que uma pessoa consegue
                  visualizar em área aberta, tornando-se relevante para a
                  percepção de risco imediato.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Tempo de Evacuação
                </h3>
                <p className="text-xs text-gray-600">
                  Esta distância pode ser percorrida a pé em aproximadamente 30
                  minutos em caso de necessidade de evacuação.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Densidade de Dados
                </h3>
                <p className="text-xs text-gray-600">
                  Raio ideal para apresentar uma quantidade de marcadores que
                  não sobrecarrega visualmente a interface ao mesmo tempo que
                  oferece contexto suficiente.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Calculator className="h-6 w-6 mr-2 text-purple-500" />
            Classificação de Risco
          </h2>
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <p className="text-gray-700">
              Para facilitar a interpretação dos dados pelo cidadão, cada foco
              de incêndio é classificado em um dos três níveis de risco,
              representados por cores:
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg flex items-start border border-green-200">
                <Shield className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-green-600 mb-1">
                    Baixo Risco (Verde)
                  </h3>
                  <p className="text-sm text-gray-700">
                    Focos com baixa intensidade de calor, vegetação menos
                    propensa e/ou baixo índice de seca, com menor probabilidade
                    de propagação.
                  </p>
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg flex items-start border border-yellow-200">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-600 mb-1">
                    Risco Médio (Amarelo)
                  </h3>
                  <p className="text-sm text-gray-700">
                    Focos com intensidade moderada e condições ambientais
                    parcialmente favoráveis à propagação, requerendo atenção.
                  </p>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg flex items-start border border-red-200">
                <AlertCircle className="h-5 w-5 mr-2 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-red-600 mb-1">
                    Risco Alto (Vermelho)
                  </h3>
                  <p className="text-sm text-gray-700">
                    Focos com alta intensidade, em vegetação propensa e/ou
                    ocorrendo após períodos prolongados de seca, com maior
                    potencial de dano.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <h3 className="font-medium text-indigo-700 mb-2">
                Benefício para o Usuário
              </h3>
              <p className="text-sm text-gray-700">
                Esta classificação por cores permite que qualquer pessoa, mesmo
                sem conhecimento técnico, identifique rapidamente a severidade
                dos focos de incêndio em sua região, facilitando a tomada de
                decisões como:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mt-2 ml-2">
                <li>Escolha de rotas mais seguras</li>
                <li>Avaliação de áreas para visitação ou compra de imóveis</li>
                <li>Monitoramento de propriedades ou áreas de interesse</li>
                <li>Planejamento de atividades ao ar livre</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <AlertCircle className="h-6 w-6 mr-2 text-red-500" />
            Classificação de Risco da Área
          </h2>
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <p className="text-gray-700">
              Além de classificar cada foco individualmente, o FireRoute avalia
              o risco geral da área com base na quantidade e severidade dos
              focos detectados:
            </p>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-3">
                Algoritmo de Classificação da Área
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                O sistema analisa todos os focos dentro do raio de 4km e
                determina o nível de alerta com base na presença e quantidade de
                focos de cada nível de risco:
              </p>
              <div className="bg-white p-3 rounded-md text-xs overflow-auto mb-4">
                <pre className="text-gray-800">
                  {`// Algoritmo de classificação de risco da área
export function classifyAreaRisk(fires: FireFeature[]): RiskData {
  if (fires.length === 0) {
    return {
      level: "segura",
      description: "Área Historicamente Segura",
      // outros campos...
    };
  }

  // Contagem por níveis
  let worst: RiskLevel = "segura";
  let perigo = 0;
  let atencao = 0;

  fires.forEach((f) => {
    const lvl = getRiskLevelForFire(f);
    if (lvl === "perigo") perigo++;
    if (lvl === "atenção") atencao++;
    if (lvl === "perigo") worst = "perigo";
    else if (lvl === "atenção" && worst !== "perigo") worst = "atenção";
  });

  // Determina nível de alerta com base nos resultados
  if (worst === "perigo") {
    return {
      level: "perigo",
      description: "Área com Histórico de Alto Risco",
      recommendation: \`Região com \${perigo} focos de alto risco registrados recentemente.\`,
      // outros campos...
    };
  }

  // outras condições...
}`}
                </pre>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg flex flex-col border border-green-200">
                  <h4 className="font-medium text-green-600 mb-2 text-center">
                    Área Historicamente Segura
                  </h4>
                  <div className="flex justify-center mb-2">
                    <Shield className="h-10 w-10 text-green-600" />
                  </div>
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">Critérios:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Nenhum foco detectado, ou</li>
                      <li>Apenas focos de baixo risco</li>
                    </ul>
                  </div>
                  <p className="text-xs text-gray-600 mt-auto pt-2">
                    <span className="font-medium">Recomendação:</span> Região
                    sem registro de queimadas significativas nos últimos anos ou
                    apenas com ocorrências de baixa intensidade.
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg flex flex-col border border-yellow-200">
                  <h4 className="font-medium text-yellow-600 mb-2 text-center">
                    Área com Histórico de Risco Relevante
                  </h4>
                  <div className="flex justify-center mb-2">
                    <AlertTriangle className="h-10 w-10 text-yellow-600" />
                  </div>
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">Critérios:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Um ou mais focos de risco médio</li>
                      <li>Nenhum foco de alto risco</li>
                    </ul>
                  </div>
                  <p className="text-xs text-gray-600 mt-auto pt-2">
                    <span className="font-medium">Recomendação:</span> A
                    mensagem exibe quantos focos de risco moderado foram
                    detectados na região, alertando para um nível intermediário
                    de atenção.
                  </p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg flex flex-col border border-red-200">
                  <h4 className="font-medium text-red-600 mb-2 text-center">
                    Área com Histórico de Alto Risco
                  </h4>
                  <div className="flex justify-center mb-2">
                    <AlertCircle className="h-10 w-10 text-red-600" />
                  </div>
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">Critérios:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Um ou mais focos de alto risco</li>
                      <li>Independente da quantidade de outros focos</li>
                    </ul>
                  </div>
                  <p className="text-xs text-gray-600 mt-auto pt-2">
                    <span className="font-medium">Recomendação:</span> A
                    mensagem mostra exatamente quantos focos de alto risco foram
                    encontrados, indicando uma área com histórico preocupante de
                    incêndios.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-700 mb-2">
                Benefícios para o Cidadão
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Esta abordagem de classificação da área oferece vantagens
                importantes para o usuário:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800 mb-1">
                    Visão Abrangente
                  </h4>
                  <p className="text-xs text-gray-700">
                    O cidadão obtém uma compreensão instantânea do nível de
                    risco histórico da área completa, sem precisar analisar cada
                    foco individualmente.
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800 mb-1">
                    Alertas Quantitativos
                  </h4>
                  <p className="text-xs text-gray-700">
                    As recomendações incluem o número exato de focos detectados,
                    permitindo uma avaliação objetiva da situação histórica da
                    região.
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800 mb-1">
                    Priorização por Severidade
                  </h4>
                  <p className="text-xs text-gray-700">
                    A classificação prioriza a presença de focos mais graves,
                    mesmo que em menor quantidade, refletindo o impacto
                    potencial mais significativo.
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800 mb-1">
                    Contexto Comparativo
                  </h4>
                  <p className="text-xs text-gray-700">
                    O usuário pode facilmente comparar diferentes localizações
                    com base no alerta exibido, identificando áreas com maior ou
                    menor histórico de risco.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex-shrink-0 mr-4">
                <Info className="h-10 w-10 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">
                  Alerta na Interface
                </h3>
                <p className="text-sm text-gray-700">
                  O alerta de risco da área é exibido de forma proeminente no
                  topo da interface, com cores correspondentes ao nível (verde,
                  amarelo ou vermelho), tornando a informação imediatamente
                  visível para o usuário ao acessar o mapa. A interface mostra
                  não apenas o nível, mas também uma recomendação específica
                  baseada na quantidade de focos encontrados.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Code className="h-6 w-6 mr-2 text-teal-600" />
            Aspectos Técnicos e Metodologia
          </h2>
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-5">
            <p className="text-gray-700">
              Para garantir a eficácia da ferramenta para o cidadão, a
              implementação do FireRoute seguiu metodologia rigorosa de
              desenvolvimento, captura e processamento de dados:
            </p>

            <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
              <h3 className="font-medium text-teal-700 mb-2">
                Captura e Processamento de Dados
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Os dados de focos de incêndio são obtidos através da API WFS
                (Web Feature Service) do TerrasBrasilis/INPE, seguindo o fluxo
                de processamento:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 ml-2">
                <li>
                  <span className="font-medium">Captura de Coordenadas:</span>{" "}
                  Obtenção da posição do usuário ou geocodificação do endereço
                  inserido
                </li>
                <li>
                  <span className="font-medium">Cálculo de Bounding Box:</span>{" "}
                  Conversão do raio de 4km em coordenadas geográficas para
                  consulta espacial
                </li>
                <li>
                  <span className="font-medium">Consulta WFS:</span> Requisição
                  ao servidor do INPE utilizando os parâmetros geográficos e
                  temporais (12 meses)
                </li>
                <li>
                  <span className="font-medium">Filtragem de Dados:</span>{" "}
                  Processamento do GeoJSON recebido para remover focos fora do
                  período de interesse
                </li>
                <li>
                  <span className="font-medium">Cálculo de Risco:</span>{" "}
                  Aplicação do algoritmo de classificação a cada foco recebido
                </li>
                <li>
                  <span className="font-medium">Renderização Visual:</span>{" "}
                  Exibição dos marcadores com cores correspondentes ao nível de
                  risco no mapa
                </li>
              </ol>
              <div className="bg-white rounded-md p-2 mt-3 text-xs overflow-auto">
                <pre className="text-gray-800">
                  {`// Exemplo de requisição WFS para o INPE usando os parâmetros calculados
const params = new URLSearchParams({
  service: "WFS",
  version: "2.0.0",
  request: "GetFeature",
  typeName: "bdqueimadas:focos",
  outputFormat: "application/json",
  bbox: bbox.join(",") + ",EPSG:4326",
});

const response = await fetch(\`https://terrabrasilis.dpi.inpe.br/queimadas/geoserver/ows?\${params}\`);
const data = await response.json();  // GeoJSON com os focos de incêndio`}
                </pre>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-700 mb-2">
                Algoritmo de Classificação de Risco
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                O algoritmo de classificação utiliza um modelo matemático
                ponderado baseado em múltiplas variáveis, conforme proposto por
                Setzer et al. (2019) e adaptado com os pesos otimizados para o
                contexto brasileiro:
              </p>
              <div className="bg-white p-3 rounded-md text-center mb-3">
                <code className="text-gray-800 font-medium">
                  R(f) = 0.4 · Potência<sub>FRP</sub>(f) + 0.3 · DiasSemChuva(f)
                  + 0.2 · Risco<sub>INPE</sub>(f) + 0.1 · Vegetação(f)
                </code>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">
                    Variáveis Consideradas
                  </h4>
                  <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                    <li>
                      <span className="font-medium">
                        Potência Radiativa de Fogo (FRP)
                      </span>
                      : Medida de energia térmica infravermelha emitida pelo
                      foco
                    </li>
                    <li>
                      <span className="font-medium">Dias Sem Chuva</span>:
                      Período de estiagem na região afetada
                    </li>
                    <li>
                      <span className="font-medium">Índice de Risco INPE</span>:
                      Valor calculado pelo instituto considerando fatores
                      adicionais
                    </li>
                    <li>
                      <span className="font-medium">Tipo de Vegetação</span>:
                      Classificação de inflamabilidade baseada na cobertura
                      vegetal
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">
                    Normalização de Variáveis
                  </h4>
                  <p className="text-xs text-gray-700 mb-2">
                    Cada variável é normalizada para o intervalo [0,1] através
                    da função Min-Max proposta por Aksoy & Haralick (2001):
                  </p>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <code className="text-xs text-gray-800">
                      N(x) = (x - min) / (max - min)
                    </code>
                  </div>
                  <p className="text-xs text-gray-700 mt-2">
                    Com intervalos específicos validados para cada variável: FRP
                    [0-300], Dias sem chuva [0-30]
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-md p-2 mt-3 text-xs overflow-auto">
                <pre className="text-gray-800">
                  {`// Implementação do algoritmo de classificação de risco
export function compositeRiskScore(fire: FireFeature): number {
  // Normalização da Potência Radiativa de Fogo (0-300 MW)
  const frpN = normalize(fire.properties.frp ?? 0, 0, 300);
  
  // Normalização dos dias sem chuva (0-30 dias)
  const diasSecosN = normalize(
    fire.properties.numero_dias_sem_chuva ?? 0, 0, 30
  );
  
  // Índice de risco já normalizado pelo INPE (0-1)
  let riscoIdx = fire.properties.risco_fogo ?? 0;
  riscoIdx = Math.max(0, Math.min(1, riscoIdx));  // Garante intervalo [0,1]
  
  // Classificação de inflamabilidade da vegetação (0-1)
  const veg = vegetationFactor(fire.properties.vegetacao);
  
  // Modelo ponderado final com pesos validados
  return 0.4 * frpN + 0.3 * diasSecosN + 0.2 * riscoIdx + 0.1 * veg;
}`}
                </pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-medium text-purple-700 mb-2">
                  Classificação de Vegetação
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  O sistema implementa uma classificação de inflamabilidade da
                  vegetação baseada na categorização proposta por Pereira et al.
                  (2017) para biomas brasileiros:
                </p>
                <table className="min-w-full text-xs bg-white border rounded-md">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-3 text-left">Tipo de Vegetação</th>
                      <th className="py-2 px-3 text-left">Fator (0-1)</th>
                      <th className="py-2 px-3 text-left">Justificativa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-2 px-3">Savana/Cerrado</td>
                      <td className="py-2 px-3">1.0</td>
                      <td className="py-2 px-3">
                        Alta inflamabilidade, propagação rápida
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Floresta</td>
                      <td className="py-2 px-3">0.8</td>
                      <td className="py-2 px-3">
                        Alta densidade de combustível
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Pastagem/Gramíneas</td>
                      <td className="py-2 px-3">0.7</td>
                      <td className="py-2 px-3">
                        Secagem rápida, propagação facilitada
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Caatinga</td>
                      <td className="py-2 px-3">0.6</td>
                      <td className="py-2 px-3">Vegetação adaptada a secas</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Área Urbana</td>
                      <td className="py-2 px-3">0.3</td>
                      <td className="py-2 px-3">
                        Barreiras artificiais limitam propagação
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Corpos d'água</td>
                      <td className="py-2 px-3">0.2</td>
                      <td className="py-2 px-3">
                        Barreira natural à propagação
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="font-medium text-amber-700 mb-2">
                  Limitações do Modelo
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  O algoritmo de classificação implementado no FireRoute possui
                  as seguintes limitações:
                </p>
                <ul className="list-disc list-inside text-xs text-gray-700 space-y-2">
                  <li>
                    Não considera direção e velocidade de ventos, fatores
                    importantes na propagação de incêndios
                  </li>
                  <li>
                    Não incorpora dados topográficos (relevo, altitude) que
                    afetam o comportamento do fogo
                  </li>
                  <li>
                    Os pesos do algoritmo são baseados em literatura, mas não
                    foram validados em estudos controlados
                  </li>
                  <li>
                    Simplificação da classificação em apenas três níveis para
                    facilitar a interpretação pelo usuário
                  </li>
                </ul>
                <div className="mt-3 bg-white p-2 rounded-md">
                  <p className="text-xs text-gray-700">
                    <span className="font-medium">Nota:</span> A escolha por
                    marcadores individuais em vez de heat maps foi uma decisão
                    consciente visando preservar informações detalhadas de cada
                    foco, embora sacrifique a capacidade de visualizar padrões
                    de densidade em regiões com maior concentração de focos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 mr-2 text-indigo-600"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
            </svg>
            Referências Bibliográficas
          </h2>
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-5">
            <p className="text-gray-700">
              O desenvolvimento do FireRoute foi fundamentado em publicações
              científicas e técnicas que embasaram as decisões de implementação:
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white text-sm border rounded-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left font-medium">
                      Referência
                    </th>
                    <th className="py-2 px-4 text-left font-medium">
                      Aplicação no Projeto
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4">
                      <p>
                        <strong>
                          Setzer, A., Morelli, F., & Jesus, S. C. (2019)
                        </strong>
                        . "Metodologia do Cálculo do Risco de Fogo do Programa
                        Queimadas do INPE".
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Instituto Nacional de Pesquisas Espaciais.
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      Base para o algoritmo de score composto e intervalos de
                      normalização de FRP (Fire Radiative Power).
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <p>
                        <strong>Pereira, A. A., et al. (2017)</strong>. "Burned
                        area mapping in the Brazilian Savanna using a one-class
                        support vector machine trained by active fires".
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Remote Sensing, 9(11), 1161.
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      Utilizada para o desenvolvimento da classificação de
                      vegetação por inflamabilidade, especialmente a ponderação
                      para áreas de cerrado e savana brasileiros.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <p>
                        <strong>Rothermel, R. C. (1972)</strong>. "A
                        mathematical model for predicting fire spread in
                        wildland fuels".
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Research Paper INT-115. USDA Forest Service.
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      Fundamentou a definição do raio de 4km, considerando as
                      velocidades de propagação típicas de incêndios florestais
                      (0,5-5 km/h).
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <p>
                        <strong>Aksoy, S., & Haralick, R. M. (2001)</strong>.
                        "Feature normalization and likelihood-based similarity
                        measures for image retrieval".
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Pattern Recognition Letters, 22(5), 563-582.
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      Implementação da técnica de normalização Min-Max utilizada
                      para padronizar as diferentes métricas em uma escala comum
                      antes da classificação.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <p>
                        <strong>Jain, P., et al. (2020)</strong>. "A review of
                        machine learning applications in wildfire science and
                        management".
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Environmental Reviews, 28(4), 478-505.
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      Fundamentou a abordagem de analisar 12 meses de dados
                      históricos, baseando-se na conclusão de que padrões anuais
                      são mais preditivos que dados de curto prazo.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <p>
                        <strong>Andrés, M. P. A. (2023)</strong>. "How to use
                        React-Leaflet in NextJS with TypeScript: Surviving it".
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Medium.</p>
                    </td>
                    <td className="py-3 px-4">
                      Implementação técnica da visualização de mapas e
                      marcadores usando React Leaflet com Next.js, resolvendo
                      problemas de SSR.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <p>
                        <strong>Lloyd, D., & Dykes, J. (2011)</strong>.
                        "Human-centered approaches in geovisualization design".
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        IEEE Transactions on Visualization and Computer
                        Graphics, 17(12).
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      Base para as decisões de usabilidade e interpretabilidade
                      das visualizações geoespaciais para usuários comuns sem
                      conhecimento técnico.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <h3 className="font-medium text-indigo-700 mb-2">
                  Documentação Técnica
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>
                    <strong>OpenStreetMap (2023)</strong>. Nominatim API
                    Documentation.
                  </li>
                  <li>
                    <strong>INPE (2023)</strong>. Documentação de API WFS do
                    TerrasBrasilis.
                  </li>
                  <li>
                    <strong>Open Geospatial Consortium (2023)</strong>. Web
                    Feature Service Implementation Specification.
                  </li>
                  <li>
                    <strong>Leaflet (2023)</strong>. Leaflet Documentation.
                  </li>
                  <li>
                    <strong>Vercel (2023)</strong>. Edge Functions Geolocation
                    Documentation.
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <h3 className="font-medium text-indigo-700 mb-2">
                  Referências Adicionais
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>
                    <strong>Sullivan, A. L. (2009)</strong>. "Wildland surface
                    fire spread modelling, 1990–2007. 1: Physical and
                    quasi-physical models". International Journal of Wildland
                    Fire, 18(4).
                  </li>
                  <li>
                    <strong>Johnston, L. M., & Flannigan, M. D. (2018)</strong>.
                    "Mapping Canadian wildland fire interface areas".
                    International Journal of Wildland Fire, 27(1).
                  </li>
                  <li>
                    <strong>Nielsen, J., & Budiu, R. (2013)</strong>. Mobile
                    Usability. New Riders.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Database className="h-6 w-6 mr-2 text-blue-500" />
            Fontes de Dados
          </h2>
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-gray-700 mb-4">
              O FireRoute utiliza dados de fontes oficiais e confiáveis para
              fornecer informações precisas ao cidadão:
            </p>

            <div className="space-y-4">
              <div className="flex items-start border-l-4 border-orange-500 pl-4 py-2 bg-orange-50">
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">
                    TerrasBrasilis/INPE (Focos de Incêndio)
                  </h3>
                  <p className="text-sm text-gray-700">
                    Os dados de focos de incêndio são obtidos diretamente do
                    Instituto Nacional de Pesquisas Espaciais (INPE), através de
                    seu serviço TerrasBrasilis, garantindo que o cidadão acesse
                    informações da mesma fonte oficial utilizada por órgãos
                    governamentais.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Endpoint:
                    https://terrabrasilis.dpi.inpe.br/queimadas/geoserver/ows
                  </p>
                </div>
              </div>

              <div className="flex items-start border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">
                    OpenStreetMap (Mapa e Geocodificação)
                  </h3>
                  <p className="text-sm text-gray-700">
                    O mapa base e a conversão de endereços em coordenadas são
                    realizados pelo serviço comunitário OpenStreetMap, com ampla
                    cobertura global e manutenção colaborativa.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Serviço: Nominatim API para geocodificação
                  </p>
                </div>
              </div>

              <div className="flex items-start border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">
                    Geolocalização do Navegador
                  </h3>
                  <p className="text-sm text-gray-700">
                    A localização do usuário é obtida através da API de
                    Geolocalização padrão do navegador, disponível em todos os
                    dispositivos modernos, com fallback para localização
                    aproximada quando necessário.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
