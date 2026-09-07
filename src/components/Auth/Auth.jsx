import { useState } from 'react'

import './Auth.css'

import {
  criarConta,
  entrar,
  enviarRecuperacaoSenha,
} from '../../services/authService'

const MODO = {
  LOGIN: 'login',
  CADASTRO: 'cadastro',
  RECUPERACAO: 'recuperacao',
}

function Auth() {
  const [modo, setModo] = useState(MODO.LOGIN)

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const [carregando, setCarregando] = useState(false)

  const [mensagem, setMensagem] = useState({
    tipo: '',
    texto: '',
  })

  const modoCadastro = modo === MODO.CADASTRO
  const modoRecuperacao = modo === MODO.RECUPERACAO

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

  function mostrarSucesso(texto) {
    setMensagem({
      tipo: 'sucesso',
      texto,
    })
  }

  function limparFormulario({
    manterEmail = false,
  } = {}) {
    setNome('')

    if (!manterEmail) {
      setEmail('')
    }

    setSenha('')
    limparMensagem()
  }

  function alterarModo(novoModo) {
    if (carregando) return

    setModo(novoModo)

    limparFormulario({
      manterEmail:
        novoModo === MODO.RECUPERACAO,
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
    const nomeLimpo = nome.trim()
    const emailLimpo = email.trim()

    if (modoCadastro && !nomeLimpo) {
      mostrarErro('Informe seu nome.')
      return false
    }

    if (!emailLimpo) {
      mostrarErro('Informe seu e-mail.')
      return false
    }

    if (modoRecuperacao) {
      return true
    }

    if (!senha) {
      mostrarErro('Informe sua senha.')
      return false
    }

    if (senha.length < 6) {
      mostrarErro(
        'A senha deve ter pelo menos 6 caracteres.'
      )

      return false
    }

    return true
  }

  async function cadastrarUsuario() {
    const { error } = await criarConta({
      nome: nome.trim(),
      email: email.trim(),
      senha,
    })

    if (!error) {
      return true
    }

    console.error(
      'Erro ao criar conta:',
      error
    )

    const mensagemErro =
      error.message.toLowerCase()

    if (
      mensagemErro.includes(
        'already registered'
      )
    ) {
      mostrarErro(
        'Já existe uma conta cadastrada com este e-mail.'
      )
    } else {
      mostrarErro(error.message)
    }

    return false
  }

  async function autenticarUsuario() {
    const { error } = await entrar({
      email: email.trim(),
      senha,
    })

    if (!error) {
      return true
    }

    console.error(
      'Erro ao entrar:',
      error
    )

    mostrarErro(
      error.message ===
        'Invalid login credentials'
        ? 'E-mail ou senha inválidos.'
        : error.message
    )

    return false
  }

  async function recuperarSenha() {
    const { error } =
      await enviarRecuperacaoSenha(
        email.trim()
      )

    if (error) {
      console.error(
        'Erro ao solicitar recuperação de senha:',
        error
      )

      mostrarErro(
        'Não foi possível enviar o e-mail de recuperação.'
      )

      return
    }

    mostrarSucesso(
      'Enviamos um link de recuperação para o seu e-mail.'
    )
  }

  async function enviarFormulario(event) {
    event.preventDefault()

    if (!validarFormulario()) {
      return
    }

    setCarregando(true)
    limparMensagem()

    try {
      if (modoRecuperacao) {
        await recuperarSenha()
        return
      }

      if (modoCadastro) {
        await cadastrarUsuario()
        return
      }

      await autenticarUsuario()
    } finally {
      setCarregando(false)
    }
  }

  function obterTitulo() {
    if (modoRecuperacao) {
      return 'Recuperar senha'
    }

    if (modoCadastro) {
      return 'Criar sua conta'
    }

    return 'Entrar na sua conta'
  }

  function obterDescricao() {
    if (modoRecuperacao) {
      return 'Informe seu e-mail para receber o link de recuperação.'
    }

    if (modoCadastro) {
      return 'Crie sua conta e comece a acompanhar suas candidaturas.'
    }

    return 'Acesse suas candidaturas e continue de onde parou.'
  }

  function obterTextoBotao() {
    if (carregando) {
      return 'Aguarde...'
    }

    if (modoRecuperacao) {
      return 'Enviar link de recuperação'
    }

    if (modoCadastro) {
      return 'Criar conta'
    }

    return 'Entrar'
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
          <h2>{obterTitulo()}</h2>

          <p>{obterDescricao()}</p>
        </div>

        <form
          className="auth-form"
          onSubmit={enviarFormulario}
        >
          {modoCadastro && (
            <div className="auth-field">
              <label htmlFor="auth-name">
                Nome
              </label>

              <input
                id="auth-name"
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={atualizarCampo(
                  setNome
                )}
                autoComplete="name"
                disabled={carregando}
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">
              E-mail
            </label>

            <input
              id="auth-email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={atualizarCampo(
                setEmail
              )}
              autoComplete="email"
              disabled={carregando}
            />
          </div>

          {!modoRecuperacao && (
            <div className="auth-field">
              <label htmlFor="auth-password">
                Senha
              </label>

              <input
                id="auth-password"
                type="password"
                placeholder={
                  modoCadastro
                    ? 'Crie uma senha'
                    : 'Digite sua senha'
                }
                value={senha}
                onChange={atualizarCampo(
                  setSenha
                )}
                autoComplete={
                  modoCadastro
                    ? 'new-password'
                    : 'current-password'
                }
                disabled={carregando}
              />

              {modoCadastro && (
                <span className="auth-password-help">
                  Mínimo de 6 caracteres.
                </span>
              )}

              {!modoCadastro && (
                <button
                  type="button"
                  className="forgot-password-button"
                  onClick={() =>
                    alterarModo(
                      MODO.RECUPERACAO
                    )
                  }
                  disabled={carregando}
                >
                  Esqueceu a senha?
                </button>
              )}
            </div>
          )}

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
            {obterTextoBotao()}
          </button>
        </form>

        <div className="auth-switch">
          {modoRecuperacao ? (
            <button
              type="button"
              onClick={() =>
                alterarModo(MODO.LOGIN)
              }
              disabled={carregando}
            >
              Voltar para o login
            </button>
          ) : (
            <>
              <span>
                {modoCadastro
                  ? 'Já possui uma conta?'
                  : 'Ainda não possui uma conta?'}
              </span>

              <button
                type="button"
                onClick={() =>
                  alterarModo(
                    modoCadastro
                      ? MODO.LOGIN
                      : MODO.CADASTRO
                  )
                }
                disabled={carregando}
              >
                {modoCadastro
                  ? 'Entrar'
                  : 'Criar conta'}
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default Auth