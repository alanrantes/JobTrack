import { useState } from 'react'
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

function JobModal({ isOpen, onClose, onSave }) {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [dropdownAberto, setDropdownAberto] = useState(null)

  if (!isOpen) {
    return null
  }

  function atualizarCampo(event) {
    const { name, value } = event.target

    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }))
  }

  function selecionarPlataforma(plataforma) {
    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      plataforma,
    }))

    setDropdownAberto(null)
  }

  function selecionarStatus(status) {
    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      status,
    }))

    setDropdownAberto(null)
  }

  function limparFormulario() {
    setFormulario(formularioInicial)
    setDropdownAberto(null)
  }

  function fecharModal() {
    limparFormulario()
    onClose()
  }

  function salvarVaga(event) {
    event.preventDefault()

    if (
      !formulario.empresa.trim() ||
      !formulario.vaga.trim() ||
      !formulario.plataforma ||
      !formulario.data
    ) {
      return
    }

    onSave({
      ...formulario,
      empresa: formulario.empresa.trim(),
      vaga: formulario.vaga.trim(),
      link: formulario.link.trim(),
      proximaEtapa: formulario.proximaEtapa.trim(),
    })

    limparFormulario()
  }

  return (
    <div className="modal-overlay" onMouseDown={fecharModal}>
      <div
        className="job-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>Nova vaga</h2>
            <p>Adicione uma nova candidatura ao seu controle.</p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={fecharModal}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <form className="job-form" onSubmit={salvarVaga}>
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
                required
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
                required
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
              <label htmlFor="data">Data da candidatura</label>

              <input
                id="data"
                name="data"
                type="date"
                value={formulario.data}
                onChange={atualizarCampo}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="link">
              Link da vaga
              <span className="optional-label">Opcional</span>
            </label>

            <input
              id="link"
              name="link"
              type="url"
              placeholder="Cole o link da vaga"
              value={formulario.link}
              onChange={atualizarCampo}
              autoComplete="off"
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
              <span className="optional-label">Opcional</span>
            </label>

            <input
              id="proximaEtapa"
              name="proximaEtapa"
              type="text"
              placeholder="Ex: Entrevista dia 10/09 às 14h"
              value={formulario.proximaEtapa}
              onChange={atualizarCampo}
              autoComplete="off"
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={fecharModal}
            >
              Cancelar
            </button>

            <button type="submit" className="save-button">
              Salvar vaga
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobModal