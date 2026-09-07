import './JobsTable.css'

const vagas = [
  {
    id: 1,
    empresa: 'Wabtec',
    vaga: 'Jr Customer Integration Analyst',
    data: '03/09/2026',
    plataforma: 'LinkedIn',
    status: 'Candidatado',
    proximaEtapa: '-',
  },
  {
    id: 2,
    empresa: 'SolvePlan',
    vaga: 'Programa de Estágio — TI',
    data: '02/09/2026',
    plataforma: 'Gupy',
    status: 'Entrevista RH',
    proximaEtapa: 'Entrevista dia 10/09 às 14h',
  },
  {
    id: 3,
    empresa: 'Grupo Zelo',
    vaga: 'Analista de Dados Jr',
    data: '01/09/2026',
    plataforma: 'Indeed',
    status: 'Aguardando retorno RH',
    proximaEtapa: '-',
  },
]

function gerarClasseStatus(status) {
  return status
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
}

function JobsTable() {
  return (
    <section className="jobs-table-container">
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Vaga</th>
            <th>Data</th>
            <th>Plataforma</th>
            <th>Status</th>
            <th>Próxima etapa</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {vagas.map((vaga) => (
            <tr key={vaga.id}>
              <td>
                <div className="company-cell">
                  <div className="company-logo">
                    {vaga.empresa.charAt(0)}
                  </div>

                  <span>{vaga.empresa}</span>
                </div>
              </td>

              <td>{vaga.vaga}</td>

              <td>{vaga.data}</td>

              <td>{vaga.plataforma}</td>

              <td>
                <span
                  className={`status-badge status-${gerarClasseStatus(
                    vaga.status
                  )}`}
                >
                  {vaga.status}
                </span>
              </td>

              <td>{vaga.proximaEtapa}</td>

              <td>
                <div className="actions">
                  <button
                    type="button"
                    className="edit-button"
                    title="Editar vaga"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="17"
                      height="17"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    title="Excluir vaga"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="17"
                      height="17"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M8 6V4h8v2" />
                      <path d="M19 6l-1 14H6L5 6" />
                      <path d="M10 11v5" />
                      <path d="M14 11v5" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default JobsTable