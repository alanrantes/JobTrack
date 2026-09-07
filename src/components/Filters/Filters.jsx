import { useState } from 'react'
import './Filters.css'

const empresas = [
  'Wabtec',
  'SolvePlan',
  'Grupo Zelo',
  'Stellantis',
  'Ambev',
  'Itaú',
  'Accenture',
  'Stone',
]

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

function Filters() {
  const [empresasSelecionadas, setEmpresasSelecionadas] = useState([])
  const [statusSelecionados, setStatusSelecionados] = useState([])

  const [filtroAberto, setFiltroAberto] = useState(null)
  const [buscaEmpresa, setBuscaEmpresa] = useState('')

  const empresasFiltradas = empresas.filter((empresa) =>
    empresa.toLowerCase().includes(buscaEmpresa.toLowerCase())
  )

  function alternarEmpresa(empresa) {
    setEmpresasSelecionadas((selecionadas) =>
      selecionadas.includes(empresa)
        ? selecionadas.filter((item) => item !== empresa)
        : [...selecionadas, empresa]
    )
  }

  function alternarStatus(itemStatus) {
    setStatusSelecionados((selecionados) =>
      selecionados.includes(itemStatus)
        ? selecionados.filter((item) => item !== itemStatus)
        : [...selecionados, itemStatus]
    )
  }

  function textoEmpresas() {
    if (empresasSelecionadas.length === 0) {
      return 'Todas as empresas'
    }

    if (empresasSelecionadas.length === 1) {
      return empresasSelecionadas[0]
    }

    return `${empresasSelecionadas.length} empresas selecionadas`
  }

  function textoStatus() {
    if (statusSelecionados.length === 0) {
      return 'Todos os status'
    }

    if (statusSelecionados.length === 1) {
      return statusSelecionados[0]
    }

    return `${statusSelecionados.length} status selecionados`
  }

  return (
    <section className="filters">
      {/* Busca geral */}

      <div className="search-box">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Buscar empresa ou vaga..."
        />
      </div>

      {/* Empresas */}

      <div className="filter-container">
        <button
          type="button"
          className="filter-button"
          onClick={() =>
            setFiltroAberto(
              filtroAberto === 'empresa' ? null : 'empresa'
            )
          }
        >
          <span>{textoEmpresas()}</span>
          <span className="filter-arrow">⌄</span>
        </button>

        {filtroAberto === 'empresa' && (
          <div className="filter-dropdown">
            <div className="filter-search">
              <input
                type="text"
                placeholder="Buscar empresa..."
                value={buscaEmpresa}
                onChange={(e) => setBuscaEmpresa(e.target.value)}
              />
            </div>

            <div className="filter-options">
              {empresasFiltradas.map((empresa) => (
                <label
                  className="filter-option"
                  key={empresa}
                >
                  <input
                    type="checkbox"
                    checked={empresasSelecionadas.includes(empresa)}
                    onChange={() => alternarEmpresa(empresa)}
                  />

                  <span>{empresa}</span>
                </label>
              ))}
            </div>

            {empresasSelecionadas.length > 0 && (
              <button
                type="button"
                className="clear-filter"
                onClick={() => setEmpresasSelecionadas([])}
              >
                Limpar seleção
              </button>
            )}
          </div>
        )}
      </div>

      {/* Status */}

      <div className="filter-container">
        <button
          type="button"
          className="filter-button"
          onClick={() =>
            setFiltroAberto(
              filtroAberto === 'status' ? null : 'status'
            )
          }
        >
          <span>{textoStatus()}</span>
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
                    checked={statusSelecionados.includes(itemStatus)}
                    onChange={() => alternarStatus(itemStatus)}
                  />

                  <span>{itemStatus}</span>
                </label>
              ))}
            </div>

            {statusSelecionados.length > 0 && (
              <button
                type="button"
                className="clear-filter"
                onClick={() => setStatusSelecionados([])}
              >
                Limpar seleção
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Filters