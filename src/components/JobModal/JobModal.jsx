import { useEffect, useState } from 'react'
import './JobModal.css'

const statusOptions = [
  'Candidatado',
  'Entrevista RH',
  'Aguardando retorno RH',
  'Entrevista Gestor',
  'Aguardando retorno Gestor',
  'Teste Técnico',
  'Aprovado',
  'Reprovado',
]

const plataformas = [
  'LinkedIn',
  'Gupy',
  'Indeed',
  'Glassdoor',
  'Site da empresa',
  'Outro',
]

const formularioInicial = {
  empresa: '',
  vaga: '',
  plataforma: '',
  data: '',
  link: '',
  status: 'Candidatado',
  proximaEtapa: '',
}

function JobModal({
  isOpen,
  onClose,
  onSave,
  vagaEditando,
}) {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [dropdownAberto, setDropdownAberto] = useState(null)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (vagaEditando) {
      setFormulario({
        empresa: vagaEditando.empresa || '',
        vaga: vagaEditando.vaga || '',
        plataforma: vagaEditando.plataforma || '',
        data: vagaEditando.data_candidatura || '',
        link: vagaEditando.link || '',
        status: vagaEditando.status || 'Candidatado',
        proximaEtapa: vagaEditando.proxima_etapa || '',
      })
    } else {
      setFormulario(formularioInicial)
    }

    setDropdownAberto(null)
  }, [isOpen, vagaEditando])

  if (!isOpen) {
    return null
  }

  function atualizarCampo(event) {
    const { name, value } = event.target

    setFormulario((formAtual) => ({
      ...formAtual,
      [name]: value,
    }))
  }

  function selecionarPlataforma(plataforma) {
    setFormulario((formAtual) => ({
      ...formAtual,
      plataforma,
    }))

    setDropdownAberto(null)
  }

  function selecionarStatus(status) {
    setFormulario((formAtual) => ({
      ...formAtual,
      status,
    }))

    setDropdownAberto(null)
  }

  function fechar() {
    if (salvando) {
      return
    }

    setDropdownAberto(null)
    onClose()
  }

  async function salvar(event) {
    event.preventDefault()

    if (
      !formulario.empresa.trim() ||
      !formulario.vaga.trim() ||
      !formulario.plataforma ||
      !formulario.data
    ) {
      alert('Preencha Empresa, Vaga, Plataforma e Data.')
      return
    }

    setSalvando(true)

    const salvou = await onSave({
      empresa: formulario.empresa.trim(),
      vaga: formulario.vaga.trim(),
      plataforma: formulario.plataforma,
      data: formulario.data,
      link: formulario.link.trim(),
      status: formulario.status,
      proximaEtapa: formulario.proximaEtapa.trim(),
    })

    setSalvando(false)

    if (salvou) {
      setFormulario(formularioInicial)
      setDropdownAberto(null)
    }
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={fechar}
    >
      <div
        className="job-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>
              {vagaEditando ? 'Editar vaga' : 'Nova vaga'}
            </h2>

            <p>
              {vagaEditando
                ? 'Atualize as informações da candidatura.'
                : 'Adicione uma nova candidatura ao seu controle.'}
            </p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={fechar}
            aria-label="Fechar"
            disabled={salvando}
          >
            ×
          </button>
        </div>

        <form className="job-form" onSubmit={salvar}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="empresa">Empresa</label>

              <input
                id="empresa"
                name="empresa"
                type="text"
                placeholder="Ex: Wabtec"
                value={formulario.empresa}
                onChange={atualizarCampo}
                autoComplete="off"
                disabled={salvando}
              />
            </div>

            <div className="form-group">
              <label htmlFor="vaga">Vaga</label>

              <input
                id="vaga"
                name="vaga"
                type="text"
                placeholder="Ex: Analista de Dados Jr"
                value={formulario.vaga}
                onChange={atualizarCampo}
                autoComplete="off"
                disabled={salvando}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Plataforma</label>

              <div className="custom-select">
                <button
                  type="button"
                  className="custom-select-button"
                  onClick={() =>
                    setDropdownAberto(
                      dropdownAberto === 'plataforma'
                        ? null
                        : 'plataforma'
                    )
                  }
                  disabled={salvando}
                >
                  <span
                    className={
                      !formulario.plataforma ? 'placeholder' : ''
                    }
                  >
                    {formulario.plataforma || 'Selecione'}
                  </span>

                  <span className="custom-select-arrow">⌄</span>
                </button>

                {dropdownAberto === 'plataforma' && (
                  <div className="custom-select-options">
                    {plataformas.map((plataforma) => (
                      <button
                        key={plataforma}
                        type="button"
                        className={`custom-select-option ${
                          formulario.plataforma === plataforma
                            ? 'selected'
                            : ''
                        }`}
                        onClick={() =>
                          selecionarPlataforma(plataforma)
                        }
                      >
                        {plataforma}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="data">
                Data da candidatura
              </label>

              <input
                id="data"
                name="data"
                type="date"
                value={formulario.data}
                onChange={atualizarCampo}
                disabled={salvando}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="link">
              Link da vaga
              <span className="optional-label">
                Opcional
              </span>
            </label>

            <input
              id="link"
              name="link"
              type="url"
              placeholder="Cole o link da vaga"
              value={formulario.link}
              onChange={atualizarCampo}
              autoComplete="off"
              disabled={salvando}
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <div className="custom-select">
              <button
                type="button"
                className="custom-select-button"
                onClick={() =>
                  setDropdownAberto(
                    dropdownAberto === 'status'
                      ? null
                      : 'status'
                  )
                }
                disabled={salvando}
              >
                <span>{formulario.status}</span>
                <span className="custom-select-arrow">⌄</span>
              </button>

              {dropdownAberto === 'status' && (
                <div className="custom-select-options">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={`custom-select-option ${
                        formulario.status === status
                          ? 'selected'
                          : ''
                      }`}
                      onClick={() => selecionarStatus(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="proximaEtapa">
              Próxima etapa
              <span className="optional-label">
                Opcional
              </span>
            </label>

            <input
              id="proximaEtapa"
              name="proximaEtapa"
              type="text"
              placeholder="Ex: Entrevista dia 10/09 às 14h"
              value={formulario.proximaEtapa}
              onChange={atualizarCampo}
              autoComplete="off"
              disabled={salvando}
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={fechar}
              disabled={salvando}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="save-button"
              disabled={salvando}
            >
              {salvando
                ? 'Salvando...'
                : vagaEditando
                  ? 'Salvar alterações'
                  : 'Salvar vaga'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobModal