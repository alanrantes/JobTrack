import { useState } from 'react'
import './Filters.css'
import { STATUS_OPTIONS } from '../../constants/jobOptions.js'

function alternarSelecao(item, selecionados, onChange) {
  const novaSelecao = selecionados.includes(item)
    ? selecionados.filter((selecionado) => selecionado !== item)
    : [...selecionados, item]

  onChange(novaSelecao)
}

function textoFiltro(selecionados, vazio, plural) {
  if (!selecionados.length) return vazio
  if (selecionados.length === 1) return selecionados[0]

  return `${selecionados.length} ${plural}`
}

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
    empresa.toLowerCase().includes(buscaEmpresa.trim().toLowerCase())
  )

  const possuiFiltros =
    Boolean(busca.trim()) ||
    empresasSelecionadas.length > 0 ||
    statusSelecionados.length > 0

  function alternarDropdown(filtro) {
    setFiltroAberto((atual) =>
      atual === filtro ? null : filtro
    )
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
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>

        <input
          type="text"
          placeholder="Buscar empresa ou vaga..."
          value={busca}
          onChange={(event) => onBuscaChange(event.target.value)}
        />
      </div>

      <div className="filter-container">
        <button
          type="button"
          className="filter-button"
          onClick={() => alternarDropdown('empresa')}
        >
          <div className="filter-button-content">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M3 21h18" />
              <path d="M6 21V5h12v16" />
              <path d="M9 9h2" />
              <path d="M13 9h2" />
              <path d="M9 13h2" />
              <path d="M13 13h2" />
            </svg>

            <span>
              {textoFiltro(
                empresasSelecionadas,
                'Todas as empresas',
                'empresas'
              )}
            </span>
          </div>

          <span className="filter-arrow" aria-hidden="true">
            ⌄
          </span>
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
              {empresasFiltradas.length ? (
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
                        alternarSelecao(
                          empresa,
                          empresasSelecionadas,
                          onEmpresasChange
                        )
                      }
                    />

                    <span>{empresa}</span>
                  </label>
                ))
              ) : (
                <div className="filter-option">
                  Nenhuma empresa encontrada
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="filter-container">
        <button
          type="button"
          className="filter-button"
          onClick={() => alternarDropdown('status')}
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
              aria-hidden="true"
            >
              <path d="M20.59 13.41 11 3.83V3H4v7h.83l9.58 9.59a2 2 0 0 0 2.82 0l3.36-3.36a2 2 0 0 0 0-2.82Z" />
              <circle cx="7.5" cy="6.5" r="1" />
            </svg>

            <span>
              {textoFiltro(
                statusSelecionados,
                'Todos os status',
                'status'
              )}
            </span>
          </div>

          <span className="filter-arrow" aria-hidden="true">
            ⌄
          </span>
        </button>

        {filtroAberto === 'status' && (
          <div className="filter-dropdown">
            <div className="filter-options">
              {STATUS_OPTIONS.map((status) => (
                <label
                  className="filter-option"
                  key={status}
                >
                  <input
                    type="checkbox"
                    checked={statusSelecionados.includes(status)}
                    onChange={() =>
                      alternarSelecao(
                        status,
                        statusSelecionados,
                        onStatusChange
                      )
                    }
                  />

                  <span>{status}</span>
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