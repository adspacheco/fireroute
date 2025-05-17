export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-5 py-8">
      <h1 className="text-3xl font-bold mb-6">Sobre o FireRoute</h1>

      <div className="space-y-4">
        <p>
          O FireRoute é uma ferramenta de monitoramento de focos de incêndio que
          utiliza dados em tempo real para fornecer informações precisas sobre
          queimadas em todo o Brasil.
        </p>

        <h2 className="text-xl font-semibold mt-6">Nossa Missão</h2>
        <p>
          Disponibilizar informações atualizadas sobre focos de incêndio para
          ajudar na prevenção e conscientização sobre os riscos de queimadas.
        </p>

        <h2 className="text-xl font-semibold mt-6">Fontes de Dados</h2>
        <p>
          Utilizamos dados de satélites e estações meteorológicas para fornecer
          informações precisas sobre focos de incêndio, condições climáticas e
          riscos associados.
        </p>

        <h2 className="text-xl font-semibold mt-6">Contato</h2>
        <p>
          Para mais informações, entre em contato conosco pelo email:
          <a
            href="mailto:contato@fireroute.com.br"
            className="text-blue-600 hover:underline ml-1"
          >
            contato@fireroute.com.br
          </a>
        </p>
      </div>
    </div>
  );
}
