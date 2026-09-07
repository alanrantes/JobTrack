import { useState } from 'react'
import './JobModal.css'
import CustomSelect from './CustomSelect'
import BrandLogo from '../BrandLogo/BrandLogo'

import {
  PLATFORM_OPTIONS,
  STATUS_OPTIONS,
} from '../../constants/jobOptions.js'

const FORMULARIO_INICIAL = {
  empresa: '',
  vaga: '',
  plataforma: '',
  data: '',
  link: '',
  status: 'Candidatado',
  proximaEtapa: '',
}

function obterFormularioInicial(vagaEditando) {
  if (!vagaEditando) {
    return { ...FORMULARIO_INICIAL }
  }

  return {
    empresa: vagaEditando.empresa || '',
    vaga: vagaEditando.vaga || '',
    plataforma: vagaEditando.plataforma || '',
    data: vagaEditando.data_candidatura || '',
    link: vagaEditando.link || '',
    status: vagaEditando.status || 'Candidatado',
    proximaEtapa: vagaEditando.proxima_etapa || '',
  }
}

function obterDataHoje() {
  const hoje = new Date()
  const ano = hoje.getFullYear()
  const mes = String(hoje.getMonth() + 1).padStart(2, '0')
  const dia = String(hoje.getDate()).padStart(2, '0')

  return `${ano}-${mes}-${dia}`
}

function JobModal({ onClose, onSave, vagaEditando }) {
  const [formulario, setFormulario] = useState(() =>
    obterFormularioInicial(vagaEditando)
  )
  const [dropdownAberto, setDropdownAberto] = useState(null)
  const [salvando, setSalvando] = useState(false)

  const [camposComErro, setCamposComErro] = useState({
    empresa: false,
    vaga: false,
    plataforma: false,
    data: false,
  })

  const modoEdicao = Boolean(vagaEditando)
  const dataHoje = obterDataHoje()

  function atualizarCampo(event) {
    const { name, value } = event.target

    setFormulario((atual) => ({
      ...atual,
      [name]: value,
    }))

    if (camposComErro[name]) {
      setCamposComErro((atual) => ({
        ...atual,
        [name]: false,
      }))
    }
  }

  function selecionar(campo, value) {
    setFormulario((atual) => ({
      ...atual,
      [campo]: value,
    }))

    setDropdownAberto(null)

    if (camposComErro[campo]) {
      setCamposComErro((atual) => ({
        ...atual,
        [campo]: false,
      }))
    }
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

    const novosErros = {
      empresa: !formulario.empresa.trim(),
      vaga: !formulario.vaga.trim(),
      plataforma: !formulario.plataforma,
      data: !formulario.data,
    }

    setCamposComErro(novosErros)

    const possuiErro = Object.values(novosErros).some(Boolean)

    if (possuiErro) {
      return
    }

    if (formulario.data > dataHoje) {
      setCamposComErro((atual) => ({
        ...atual,
        data: true,
      }))

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
      setFormulario({ ...FORMULARIO_INICIAL })
      setDropdownAberto(null)

      setCamposComErro({
        empresa: false,
        vaga: false,
        plataforma: false,
        data: false,
      })
    }
  }

  return (
    <div className="modal-overlay" onMouseDown={fechar}>
      <div
        className={`job-modal ${
          modoEdicao ? 'job-modal-editing' : ''
        }`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header modal-header-centered">
          <div>
            <h2>
              {modoEdicao
                ? 'Atualizar candidatura'
                : 'Nova candidatura'}
            </h2>

            {!modoEdicao && (
              <p>
                Adicione uma nova oportunidade ao seu controle.
              </p>
            )}
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
          {modoEdicao && (
            <div className="editing-job-info">
              <div className="editing-job-icon">
                <BrandLogo
                  name={formulario.empresa}
                  size={32}
                />
              </div>

              <div className="editing-job-text">
                <strong>{formulario.vaga}</strong>
                <span>{formulario.empresa}</span>
              </div>
            </div>
          )}

          {!modoEdicao && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="empresa">
                    Empresa
                    <span className="required-label">*</span>
                  </label>

                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    placeholder="Ex: Wabtec"
                    value={formulario.empresa}
                    onChange={atualizarCampo}
                    autoComplete="off"
                    disabled={salvando}
                    className={
                      camposComErro.empresa
                        ? 'input-error'
                        : ''
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="vaga">
                    Vaga
                    <span className="required-label">*</span>
                  </label>

                  <input
                    id="vaga"
                    name="vaga"
                    type="text"
                    placeholder="Ex: Analista de Dados Jr"
                    value={formulario.vaga}
                    onChange={atualizarCampo}
                    autoComplete="off"
                    disabled={salvando}
                    className={
                      camposComErro.vaga
                        ? 'input-error'
                        : ''
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Plataforma
                    <span className="required-label">*</span>
                  </label>

                  <div
                    className={
                      camposComErro.plataforma
                        ? 'custom-select-error'
                        : ''
                    }
                  >
                    <CustomSelect
                      value={formulario.plataforma}
                      options={PLATFORM_OPTIONS}
                      isOpen={dropdownAberto === 'plataforma'}
                      onToggle={() =>
                        alternarDropdown('plataforma')
                      }
                      onSelect={(value) =>
                        selecionar('plataforma', value)
                      }
                      disabled={salvando}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="data">
                    Data da candidatura
                    <span className="required-label">*</span>
                  </label>

                  <input
                    id="data"
                    name="data"
                    type="date"
                    max={dataHoje}
                    value={formulario.data}
                    onChange={atualizarCampo}
                    disabled={salvando}
                    className={
                      camposComErro.data
                        ? 'input-error'
                        : ''
                    }
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
            </>
          )}

          <div className="form-group">
            <label>Status</label>

            <CustomSelect
              value={formulario.status}
              options={STATUS_OPTIONS}
              isOpen={dropdownAberto === 'status'}
              onToggle={() =>
                alternarDropdown('status')
              }
              onSelect={(value) =>
                selecionar('status', value)
              }
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

          <div className="modal-actions modal-actions-full">
            <button
              type="submit"
              className="save-button"
              disabled={salvando}
            >
              {salvando
                ? 'Salvando...'
                : modoEdicao
                  ? 'Salvar alterações'
                  : 'Adicionar vaga'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobModal