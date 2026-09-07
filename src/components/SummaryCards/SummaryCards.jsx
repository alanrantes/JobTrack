import './SummaryCards.css'

function Icon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function SummaryCards({ vagas }) {
  const resumo = vagas.reduce(
    (dados, vaga) => {
      dados.candidaturas++

      if (
        vaga.status === 'Entrevista RH' ||
        vaga.status === 'Entrevista Gestor'
      ) {
        dados.entrevistas++
      }

      if (vaga.status === 'Aprovado') {
        dados.aprovadas++
      } else if (vaga.status === 'Reprovado') {
        dados.reprovacoes++
      } else {
        dados.emAndamento++
      }

      return dados
    },
    {
      candidaturas: 0,
      entrevistas: 0,
      emAndamento: 0,
      aprovadas: 0,
      reprovacoes: 0,
    }
  )

  const cards = [
    {
      titulo: 'candidaturas',
      valor: resumo.candidaturas,
      tipo: 'blue',
      icone: (
        <Icon>
          <path d="M6 2h9l5 5v15H6z" />
          <path d="M14 2v6h6" />
          <path d="M9 13h6" />
          <path d="M9 17h6" />
        </Icon>
      ),
    },
    {
      titulo: 'entrevistas',
      valor: resumo.entrevistas,
      tipo: 'purple',
      icone: (
        <Icon>
          <circle cx="9" cy="7" r="4" />
          <path d="M2 21v-2a6 6 0 0 1 6-6h2" />
          <circle cx="17" cy="11" r="3" />
          <path d="M13 21v-1a4 4 0 0 1 8 0v1" />
        </Icon>
      ),
    },
    {
      titulo: 'em andamento',
      valor: resumo.emAndamento,
      tipo: 'yellow',
      icone: (
        <Icon>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </Icon>
      ),
    },
    {
      titulo: 'aprovadas',
      valor: resumo.aprovadas,
      tipo: 'green',
      icone: (
        <Icon>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16 9" />
        </Icon>
      ),
    },
    {
      titulo: 'reprovações',
      valor: resumo.reprovacoes,
      tipo: 'red',
      icone: (
        <Icon>
          <circle cx="12" cy="12" r="9" />
          <path d="m9 9 6 6" />
          <path d="m15 9-6 6" />
        </Icon>
      ),
    },
  ]

  return (
    <section className="summary-cards">
      {cards.map(({ titulo, valor, tipo, icone }) => (
        <div
          key={titulo}
          className={`summary-card summary-card-${tipo}`}
        >
          <div className="summary-card-icon">{icone}</div>

          <div className="summary-card-content">
            <strong>{valor}</strong>
            <span>{titulo}</span>
          </div>
        </div>
      ))}
    </section>
  )
}

export default SummaryCards