import './JobsTable.css'
import BrandLogo from '../BrandLogo/BrandLogo'

function Icon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
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

function gerarClasseStatus(status) {
  return status
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
}

function formatarData(data) {
  if (!data) return '-'

  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

function JobsTable({
  vagas,
  carregando,
  onEdit,
  onDelete,
  paginaAtual,
  totalPaginas,
  onPaginaChange,
  totalFiltrado,
  totalVagas,
  vagasPorPagina,
}) {
  const inicio = totalFiltrado
    ? (paginaAtual - 1) * vagasPorPagina + 1
    : 0

  const fim = Math.min(
    paginaAtual * vagasPorPagina,
    totalFiltrado
  )

  const filtrando = totalFiltrado !== totalVagas

  const paginas = Array.from(
    { length: totalPaginas },
    (_, index) => index + 1
  )

  return (
    <section className="jobs-table-container">
      <div className="table-scroll">
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Vaga</th>
              <th>Data candidatura</th>
              <th>Plataforma</th>
              <th>Status</th>
              <th>Próxima etapa</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {carregando ? (
              <tr>
                <td colSpan="7" className="table-message">
                  Carregando vagas...
                </td>
              </tr>
            ) : !vagas.length ? (
              <tr>
                <td colSpan="7" className="table-message">
                  Nenhuma vaga encontrada.
                </td>
              </tr>
            ) : (
              vagas.map((vaga) => (
                <tr key={vaga.id}>
                  <td>
                    <div className="company-cell">
                      <div className="company-logo-wrapper">
                        <BrandLogo
                          name={vaga.empresa}
                          size={32}
                        />
                      </div>

                      <span>{vaga.empresa}</span>
                    </div>
                  </td>

                  <td>
                    {vaga.link ? (
                      <a
                        href={vaga.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="job-link"
                      >
                        {vaga.vaga}
                      </a>
                    ) : (
                      vaga.vaga
                    )}
                  </td>

                  <td>{formatarData(vaga.data_candidatura)}</td>

                  <td>
                    <div className="platform-cell">
                      <BrandLogo
                        name={vaga.plataforma}
                        size={22}
                      />

                      <span>{vaga.plataforma}</span>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`status-badge status-${gerarClasseStatus(
                        vaga.status
                      )}`}
                    >
                      <span className="status-dot" />
                      {vaga.status}
                    </span>
                  </td>

                  <td>{vaga.proxima_etapa || '-'}</td>

                  <td>
                    <div className="actions">
                      <button
                        type="button"
                        className="edit-button"
                        title="Editar vaga"
                        aria-label="Editar vaga"
                        onClick={() => onEdit(vaga)}
                      >
                        <Icon>
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                        </Icon>
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        title="Excluir vaga"
                        aria-label="Excluir vaga"
                        onClick={() => onDelete(vaga.id)}
                      >
                        <Icon>
                          <path d="M3 6h18" />
                          <path d="M8 6V4h8v2" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v5" />
                          <path d="M14 11v5" />
                        </Icon>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!carregando && (
        <div className="table-footer">
          <div className="table-count">
            Mostrando {inicio}–{fim} de {totalFiltrado}{' '}
            {filtrando ? 'vagas filtradas' : 'vagas'}
          </div>

          {totalPaginas > 1 && (
            <div className="pagination">
              <button
                type="button"
                className="pagination-arrow"
                onClick={() =>
                  onPaginaChange(paginaAtual - 1)
                }
                disabled={paginaAtual === 1}
                aria-label="Página anterior"
              >
                ‹
              </button>

              {paginas.map((pagina) => (
                <button
                  type="button"
                  key={pagina}
                  className={`pagination-button ${
                    pagina === paginaAtual ? 'active' : ''
                  }`}
                  onClick={() => onPaginaChange(pagina)}
                  aria-current={
                    pagina === paginaAtual ? 'page' : undefined
                  }
                >
                  {pagina}
                </button>
              ))}

              <button
                type="button"
                className="pagination-arrow"
                onClick={() =>
                  onPaginaChange(paginaAtual + 1)
                }
                disabled={paginaAtual === totalPaginas}
                aria-label="Próxima página"
              >
                ›
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default JobsTable