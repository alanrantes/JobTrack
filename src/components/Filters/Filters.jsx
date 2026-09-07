import { useState } from 'react'
import './Filters.css'

const status = [
  'Candidatado',
  'Entrevista RH',
  'Aguardando retorno RH',
  'Entrevista Gestor',
  'Aguardando retorno Gestor',
  'Teste Técnico',
  'Aprovado',
  'Reprovado',
]

function Filters({
  empresas,
  busca,
  onBuscaChange,
  empresasSelecionadas,
  onEmpresasChange,
  statusSelecionados,
  onStatusChange,
  onClearFilters,
}) {
  const [filtroAberto, setFiltroAberto] = useState(null)
  const [buscaEmpresa, setBuscaEmpresa] = useState('')

  const empresasFiltradas = empresas.filter((empresa) =>
    empresa.toLowerCase().includes(buscaEmpresa.toLowerCase())
  )

  const possuiFiltros =
    busca.trim() ||
    empresasSelecionadas.length > 0 ||
    statusSelecionados.length > 0

  function alternarEmpresa(empresa) {
    if (empresasSelecionadas.includes(empresa)) {
      onEmpresasChange(
        empresasSelecionadas.filter((item) => item !== empresa)
      )
    } else {
      onEmpresasChange([
        ...empresasSelecionadas,
        empresa,
      ])
    }
  }

  function alternarStatus(itemStatus) {
    if (statusSelecionados.includes(itemStatus)) {
      onStatusChange(
        statusSelecionados.filter(
          (item) => item !== itemStatus
        )
      )
    } else {
      onStatusChange([
        ...statusSelecionados,
        itemStatus,
      ])
    }
  }

  function textoEmpresas() {
    if (empresasSelecionadas.length === 0) {
      return 'Todas as empresas'
    }

    if (empresasSelecionadas.length === 1) {
      return empresasSelecionadas[0]
    }

    return `${empresasSelecionadas.length} empresas`
  }

  function textoStatus() {
    if (statusSelecionados.length === 0) {
      return 'Todos os status'
    }

    if (statusSelecionados.length === 1) {
      return statusSelecionados[0]
    }

    return `${statusSelecionados.length} status`
  }

  return (
    <section className="filters">
      <div className="search-box">
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
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>

        <input
          type="text"
          placeholder="Buscar empresa ou vaga..."
          value={busca}
          onChange={(event) =>
            onBuscaChange(event.target.value)
          }
        />
      </div>

      <div className="filter-container">
        <button
          type="button"
          className="filter-button"
          onClick={() =>
            setFiltroAberto(
              filtroAberto === 'empresa'
                ? null
                : 'empresa'
            )
          }
        >
          <div className="filter-button-content">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 21h18" />
              <path d="M6 21V5h12v16" />
              <path d="M9 9h2" />
              <path d="M13 9h2" />
              <path d="M9 13h2" />
              <path d="M13 13h2" />
            </svg>

            <span>{textoEmpresas()}</span>
          </div>

          <span className="filter-arrow">⌄</span>
        </button>

        {filtroAberto === 'empresa' && (
          <div className="filter-dropdown">
            <div className="filter-search">
              <input
                type="text"
                placeholder="Buscar empresa..."
                value={buscaEmpresa}
                onChange={(event) =>
                  setBuscaEmpresa(event.target.value)
                }
              />
            </div>

            <div className="filter-options">
              {empresasFiltradas.length === 0 ? (
                <div className="filter-option">
                  Nenhuma empresa encontrada
                </div>
              ) : (
                empresasFiltradas.map((empresa) => (
                  <label
                    className="filter-option"
                    key={empresa}
                  >
                    <input
                      type="checkbox"
                      checked={empresasSelecionadas.includes(
                        empresa
                      )}
                      onChange={() =>
                        alternarEmpresa(empresa)
                      }
                    />

                    <span>{empresa}</span>
                  </label>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <div className="filter-container">
        <button
          type="button"
          className="filter-button"
          onClick={() =>
            setFiltroAberto(
              filtroAberto === 'status'
                ? null
                : 'status'
            )
          }
        >
          <div className="filter-button-content">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.59 13.41 11 3.83V3H4v7h.83l9.58 9.59a2 2 0 0 0 2.82 0l3.36-3.36a2 2 0 0 0 0-2.82Z" />
              <circle cx="7.5" cy="6.5" r="1" />
            </svg>

            <span>{textoStatus()}</span>
          </div>

          <span className="filter-arrow">⌄</span>
        </button>

        {filtroAberto === 'status' && (
          <div className="filter-dropdown">
            <div className="filter-options">
              {status.map((itemStatus) => (
                <label
                  className="filter-option"
                  key={itemStatus}
                >
                  <input
                    type="checkbox"
                    checked={statusSelecionados.includes(
                      itemStatus
                    )}
                    onChange={() =>
                      alternarStatus(itemStatus)
                    }
                  />

                  <span>{itemStatus}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        className="clear-all-button"
        onClick={onClearFilters}
        disabled={!possuiFiltros}
      >
        Limpar filtros
      </button>
    </section>
  )
}

export default Filters