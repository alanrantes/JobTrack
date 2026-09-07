import { useState } from 'react'

import './Auth.css'

import {
  atualizarSenha,
} from '../../services/authService'

function UpdatePassword({
  onSuccess,
}) {
  const [novaSenha, setNovaSenha] =
    useState('')

  const [
    confirmarSenha,
    setConfirmarSenha,
  ] = useState('')

  const [carregando, setCarregando] =
    useState(false)

  const [mensagem, setMensagem] =
    useState({
      tipo: '',
      texto: '',
    })

  function limparMensagem() {
    setMensagem({
      tipo: '',
      texto: '',
    })
  }

  function mostrarErro(texto) {
    setMensagem({
      tipo: 'erro',
      texto,
    })
  }

  function atualizarCampo(setter) {
    return (event) => {
      setter(event.target.value)

      if (mensagem.texto) {
        limparMensagem()
      }
    }
  }

  function validarFormulario() {
    if (!novaSenha) {
      mostrarErro(
        'Informe sua nova senha.'
      )

      return false
    }

    if (novaSenha.length < 6) {
      mostrarErro(
        'A senha deve ter pelo menos 6 caracteres.'
      )

      return false
    }

    if (!confirmarSenha) {
      mostrarErro(
        'Confirme sua nova senha.'
      )

      return false
    }

    if (
      novaSenha !== confirmarSenha
    ) {
      mostrarErro(
        'As senhas não coincidem.'
      )

      return false
    }

    return true
  }

  async function enviarFormulario(event) {
    event.preventDefault()

    if (!validarFormulario()) {
      return
    }

    setCarregando(true)
    limparMensagem()

    try {
      const { error } =
        await atualizarSenha(novaSenha)

      if (error) {
        console.error(
          'Erro ao atualizar senha:',
          error
        )

        mostrarErro(
          'Não foi possível atualizar sua senha.'
        )

        return
      }

      const finalizou =
        await onSuccess()

      if (!finalizou) {
        mostrarErro(
          'A senha foi alterada, mas não foi possível encerrar a sessão.'
        )
      }
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand">
          <div className="auth-logo">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect
                width="20"
                height="14"
                x="2"
                y="7"
                rx="2"
              />

              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>

          <div>
            <h1>JobTrack</h1>

            <p>
              Organize seus processos seletivos.
            </p>
          </div>
        </div>

        <div className="auth-heading">
          <h2>Definir nova senha</h2>

          <p>
            Escolha uma nova senha para acessar
            sua conta.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={enviarFormulario}
        >
          <div className="auth-field">
            <label htmlFor="new-password">
              Nova senha
            </label>

            <input
              id="new-password"
              type="password"
              placeholder="Digite sua nova senha"
              value={novaSenha}
              onChange={atualizarCampo(
                setNovaSenha
              )}
              autoComplete="new-password"
              disabled={carregando}
            />

            <span className="auth-password-help">
              Mínimo de 6 caracteres.
            </span>
          </div>

          <div className="auth-field">
            <label htmlFor="confirm-password">
              Confirmar nova senha
            </label>

            <input
              id="confirm-password"
              type="password"
              placeholder="Digite novamente"
              value={confirmarSenha}
              onChange={atualizarCampo(
                setConfirmarSenha
              )}
              autoComplete="new-password"
              disabled={carregando}
            />
          </div>

          {mensagem.texto && (
            <div
              className={
                mensagem.tipo === 'sucesso'
                  ? 'auth-success'
                  : 'auth-error'
              }
            >
              {mensagem.texto}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={carregando}
          >
            {carregando
              ? 'Alterando senha...'
              : 'Salvar nova senha'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default UpdatePassword