import { useEffect, useState } from 'react'
import './JobModal.css'

const STATUS = [
  'Candidatado',
  'Entrevista RH',
  'Aguardando retorno RH',
  'Entrevista Gestor',
  'Aguardando retorno Gestor',
  'Teste Técnico',
  'Aprovado',
  'Reprovado',
]

const PLATAFORMAS = [
  'LinkedIn',
  'Gupy',
  'Indeed',
  'Glassdoor',
  'Site da empresa',
  'Outro',
]

const FORMULARIO_INICIAL = {
  empresa: '',
  vaga: '',
  plataforma: '',
  data: '',
  link: '',
  status: 'Candidatado',
  proximaEtapa: '',
}

function CustomSelect({
  value,
  placeholder,
  options,
  aberto,
  onToggle,
  onSelect,
  disabled,
}) {
  return (
    <div className="custom-select">
      <button
        type="button"
        className="custom-select-button"
        onClick={onToggle}
        disabled={disabled}
      >
        <span className={!value ? 'placeholder' : ''}>
          {value || placeholder}
        </span>

        <span className="custom-select-arrow" aria-hidden="true">
          ⌄
        </span>
      </button>

      {aberto && (
        <div className="custom-select-options">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`custom-select-option ${
                value === option ? 'selected' : ''
              }`}
              onClick={() => onSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function JobModal({
  isOpen,
  onClose,
  onSave,
  vagaEditando,
}) {
  const [formulario, setFormulario] = useState(FORMULARIO_INICIAL)
  const [dropdownAberto, setDropdownAberto] = useState(null)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    setFormulario(
      vagaEditando
        ? {
            empresa: vagaEditando.empresa || '',
            vaga: vagaEditando.vaga || '',
            plataforma: vagaEditando.plataforma || '',
            data: vagaEditando.data_candidatura || '',
            link: vagaEditando.link || '',
            status: vagaEditando.status || 'Candidatado',
            proximaEtapa: vagaEditando.proxima_etapa || '',
          }
        : FORMULARIO_INICIAL
    )

    setDropdownAberto(null)
  }, [isOpen, vagaEditando])

  if (!isOpen) return null

  function atualizarCampo(event) {
    const { name, value } = event.target

    setFormulario((atual) => ({
      ...atual,
      [name]: value,
    }))
  }

  function selecionar(campo, value) {
    setFormulario((atual) => ({
      ...atual,
      [campo]: value,
    }))

    setDropdownAberto(null)
  }

  function alternarDropdown(nome) {
    setDropdownAberto((atual) =>
      atual === nome ? null : nome
    )
  }

  function fechar() {
    if (salvando) return

    setDropdownAberto(null)
    onClose()
  }

  async function salvar(event) {
    event.preventDefault()

    const {
      empresa,
      vaga,
      plataforma,
      data,
      link,
      status,
      proximaEtapa,
    } = formulario

    if (
      !empresa.trim() ||
      !vaga.trim() ||
      !plataforma ||
      !data
    ) {
      alert('Preencha Empresa, Vaga, Plataforma e Data.')
      return
    }

    setSalvando(true)

    const salvou = await onSave({
      empresa: empresa.trim(),
      vaga: vaga.trim(),
      plataforma,
      data,
      link: link.trim(),
      status,
      proximaEtapa: proximaEtapa.trim(),
    })

    setSalvando(false)

    if (salvou) {
      setFormulario(FORMULARIO_INICIAL)
      setDropdownAberto(null)
    }
  }

  return (
    <div className="modal-overlay" onMouseDown={fechar}>
      <div
        className="job-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>{vagaEditando ? 'Editar vaga' : 'Nova vaga'}</h2>

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

              <CustomSelect
                value={formulario.plataforma}
                placeholder="Selecione"
                options={PLATAFORMAS}
                aberto={dropdownAberto === 'plataforma'}
                onToggle={() => alternarDropdown('plataforma')}
                onSelect={(value) =>
                  selecionar('plataforma', value)
                }
                disabled={salvando}
              />
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

            <CustomSelect
              value={formulario.status}
              options={STATUS}
              aberto={dropdownAberto === 'status'}
              onToggle={() => alternarDropdown('status')}
              onSelect={(value) => selecionar('status', value)}
              disabled={salvando}
            />
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