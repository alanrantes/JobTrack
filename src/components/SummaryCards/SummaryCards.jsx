import './SummaryCards.css'

function SummaryCards({ vagas }) {
  const total = vagas.length

  const entrevistas = vagas.filter(
    (vaga) =>
      vaga.status === 'Entrevista RH' ||
      vaga.status === 'Entrevista Gestor'
  ).length

  const emAndamento = vagas.filter(
    (vaga) =>
      vaga.status !== 'Aprovado' &&
      vaga.status !== 'Reprovado'
  ).length

  const aprovadas = vagas.filter(
    (vaga) => vaga.status === 'Aprovado'
  ).length

  const reprovacoes = vagas.filter(
    (vaga) => vaga.status === 'Reprovado'
  ).length

  const cards = [
    {
      titulo: 'candidaturas',
      valor: total,
      tipo: 'blue',
      icone: (
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2h9l5 5v15H6z" />
          <path d="M14 2v6h6" />
          <path d="M9 13h6" />
          <path d="M9 17h6" />
        </svg>
      ),
    },
    {
      titulo: 'entrevistas',
      valor: entrevistas,
      tipo: 'purple',
      icone: (
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="7" r="4" />
          <path d="M2 21v-2a6 6 0 0 1 6-6h2" />
          <circle cx="17" cy="11" r="3" />
          <path d="M13 21v-1a4 4 0 0 1 8 0v1" />
        </svg>
      ),
    },
    {
      titulo: 'em andamento',
      valor: emAndamento,
      tipo: 'yellow',
      icone: (
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      ),
    },
    {
      titulo: 'aprovadas',
      valor: aprovadas,
      tipo: 'green',
      icone: (
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      ),
    },
    {
      titulo: 'reprovações',
      valor: reprovacoes,
      tipo: 'red',
      icone: (
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="m9 9 6 6" />
          <path d="m15 9-6 6" />
        </svg>
      ),
    },
  ]

  return (
    <section className="summary-cards">
      {cards.map((card) => (
        <div
          key={card.titulo}
          className={`summary-card summary-card-${card.tipo}`}
        >
          <div className="summary-card-icon">
            {card.icone}
          </div>

          <div className="summary-card-content">
            <strong>{card.valor}</strong>
            <span>{card.titulo}</span>
          </div>
        </div>
      ))}
    </section>
  )
}

export default SummaryCards