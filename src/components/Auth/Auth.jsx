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

const CONFIG = {
  login: {
    titulo: 'Entrar na sua conta',
    descricao:
      'Acesse suas candidaturas e continue de onde parou.',
    botao: 'Entrar',
  },
  cadastro: {
    titulo: 'Criar sua conta',
    descricao:
      'Crie sua conta e comece a acompanhar suas candidaturas.',
    botao: 'Criar conta',
  },
  recuperacao: {
    titulo: 'Recuperar senha',
    descricao:
      'Informe seu e-mail para receber o link de recuperação.',
    botao: 'Enviar link de recuperação',
  },
}

const FORM_INICIAL = {
  nome: '',
  email: '',
  senha: '',
}

const ICONS = {
  briefcase: (
    <>
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  document: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h6" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
}

function Auth() {
  const [modo, setModo] = useState(MODO.LOGIN)
  const [form, setForm] = useState(FORM_INICIAL)
  const [carregando, setCarregando] = useState(false)
  const [mensagem, setMensagem] = useState(null)

  const cadastro = modo === MODO.CADASTRO
  const recuperacao = modo === MODO.RECUPERACAO
  const config = CONFIG[modo]

  function erro(texto) {
    setMensagem({ tipo: 'erro', texto })
  }

  function alterarCampo({ target: { name, value } }) {
    setForm((atual) => ({ ...atual, [name]: value }))
    setMensagem(null)
  }

  function alterarModo(novoModo) {
    if (carregando) return

    setModo(novoModo)
    setForm((atual) => ({
      ...FORM_INICIAL,
      email: novoModo === MODO.RECUPERACAO ? atual.email : '',
    }))
    setMensagem(null)
  }

  function validar() {
    if (cadastro && !form.nome.trim()) {
      erro('Informe seu nome.')
      return false
    }

    if (!form.email.trim()) {
      erro('Informe seu e-mail.')
      return false
    }

    if (recuperacao) return true

    if (!form.senha) {
      erro('Informe sua senha.')
      return false
    }

    if (form.senha.length < 6) {
      erro('A senha deve ter pelo menos 6 caracteres.')
      return false
    }

    return true
  }

  async function executarAcao() {
    const dados = {
      nome: form.nome.trim(),
      email: form.email.trim(),
      senha: form.senha,
    }

    if (recuperacao) {
      const { error } = await enviarRecuperacaoSenha(dados.email)

      if (error) {
        console.error('Erro ao recuperar senha:', error)
        erro('Não foi possível enviar o e-mail de recuperação.')
        return
      }

      setMensagem({
        tipo: 'sucesso',
        texto: 'Enviamos um link de recuperação para o seu e-mail.',
      })

      return
    }

    const { error } = cadastro
      ? await criarConta(dados)
      : await entrar({
          email: dados.email,
          senha: dados.senha,
        })

    if (!error) return

    console.error(
      cadastro ? 'Erro ao criar conta:' : 'Erro ao entrar:',
      error
    )

    if (
      cadastro &&
      error.message.toLowerCase().includes('already registered')
    ) {
      erro('Já existe uma conta cadastrada com este e-mail.')
      return
    }

    erro(
      error.message === 'Invalid login credentials'
        ? 'E-mail ou senha inválidos.'
        : error.message
    )
  }

  async function enviarFormulario(event) {
    event.preventDefault()

    if (!validar()) return

    setCarregando(true)
    setMensagem(null)

    try {
      await executarAcao()
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-container">
        <Presentation />

        <section className="auth-form-panel">
          <div className="auth-form-content">
            <MobileBrand />

            <header className="auth-heading">
              <h2>{config.titulo}</h2>
              <p>{config.descricao}</p>
            </header>

            <form className="auth-form" onSubmit={enviarFormulario}>
              {cadastro && (
                <AuthField
                  label="Nome"
                  name="nome"
                  placeholder="Digite seu nome"
                  value={form.nome}
                  onChange={alterarCampo}
                  autoComplete="name"
                  disabled={carregando}
                />
              )}

              <AuthField
                label="E-mail"
                name="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                value={form.email}
                onChange={alterarCampo}
                autoComplete="email"
                disabled={carregando}
              />

              {!recuperacao && (
                <AuthField
                  label="Senha"
                  name="senha"
                  type="password"
                  placeholder={
                    cadastro ? 'Crie uma senha' : 'Digite sua senha'
                  }
                  value={form.senha}
                  onChange={alterarCampo}
                  autoComplete={
                    cadastro ? 'new-password' : 'current-password'
                  }
                  disabled={carregando}
                  helper={cadastro ? 'Mínimo de 6 caracteres.' : null}
                  action={
                    !cadastro && (
                      <button
                        type="button"
                        className="btn btn-link auth-forgot"
                        onClick={() => alterarModo(MODO.RECUPERACAO)}
                        disabled={carregando}
                      >
                        Esqueceu a senha?
                      </button>
                    )
                  }
                />
              )}

              {mensagem && (
                <div className={`feedback feedback-${mensagem.tipo}`}>
                  {mensagem.texto}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary auth-submit"
                disabled={carregando}
              >
                {carregando ? 'Aguarde...' : config.botao}
              </button>
            </form>

            <ModeSwitch
              modo={modo}
              carregando={carregando}
              onChange={alterarModo}
            />
          </div>
        </section>
      </section>
    </main>
  )
}

function Presentation() {
  return (
    <aside className="auth-presentation">
      <div className="auth-shape auth-shape-one" />
      <div className="auth-shape auth-shape-two" />
      <div className="auth-shape auth-shape-three" />

      <div className="auth-presentation-content">
        <div className="auth-presentation-brand">
          <div className="auth-presentation-logo">
            <Icon name="briefcase" />
          </div>

          <div className="auth-brand-info">
            <strong>JobTrack</strong>
            <span>Processos seletivos organizados</span>
          </div>
        </div>

        <PresentationVisual />

        <div className="auth-presentation-copy">
          <h1>Sua busca por oportunidades, organizada.</h1>
          <p>Acompanhe candidaturas e etapas em um só lugar.</p>
        </div>
      </div>
    </aside>
  )
}

function PresentationVisual() {
  return (
    <div className="auth-visual" aria-hidden="true">
      <div className="auth-visual-blob" />

      <div className="auth-visual-document">
        <div className="auth-document-icon">
          <Icon name="document" size={20} />
        </div>

        <div className="auth-document-lines">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="auth-visual-main-card">
        <div className="auth-main-card-top">
          <div className="auth-main-card-company">
            <div className="auth-company-logo">J</div>

            <div>
              <strong>Analista de Dados Jr</strong>
              <span>Nova candidatura</span>
            </div>
          </div>

          <span className="auth-card-status">Em andamento</span>
        </div>

        <div className="auth-main-card-progress">
          <span />
        </div>

        <div className="auth-main-card-footer">
          <div>
            <small>Próxima etapa</small>
            <strong>Entrevista RH</strong>
          </div>

          <div className="auth-card-arrow">
            <Icon name="arrow" size={18} />
          </div>
        </div>
      </div>

      <FloatingCard
        className="auth-floating-left"
        icon="check"
        label="Candidatura"
        value="Registrada"
      />

      <FloatingCard
        className="auth-floating-right"
        dot
        label="Status"
        value="Entrevista"
      />

      <span className="auth-visual-dot auth-dot-one" />
      <span className="auth-visual-dot auth-dot-two" />
      <span className="auth-visual-dot auth-dot-three" />
    </div>
  )
}

function FloatingCard({
  className,
  icon,
  dot,
  label,
  value,
}) {
  return (
    <div className={`auth-visual-floating-card ${className}`}>
      {icon && (
        <Icon
          name={icon}
          size={18}
          strokeWidth={2.3}
        />
      )}

      {dot && <div className="auth-floating-dot" />}

      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  )
}

function AuthField({
  label,
  name,
  action,
  helper,
  type = 'text',
  ...props
}) {
  return (
    <div className="form-field">
      <label htmlFor={`auth-${name}`}>{label}</label>

      <input
        className="form-control"
        id={`auth-${name}`}
        name={name}
        type={type}
        {...props}
      />

      {helper && <span className="form-help">{helper}</span>}

      {action && (
        <div className="auth-field-action">
          {action}
        </div>
      )}
    </div>
  )
}

function ModeSwitch({
  modo,
  carregando,
  onChange,
}) {
  const recuperacao = modo === MODO.RECUPERACAO
  const cadastro = modo === MODO.CADASTRO

  return (
    <div className="auth-switch">
      {!recuperacao && (
        <span>
          {cadastro
            ? 'Já possui uma conta?'
            : 'Ainda não possui uma conta?'}
        </span>
      )}

      <button
        type="button"
        className="btn btn-link"
        onClick={() =>
          onChange(
            recuperacao || cadastro
              ? MODO.LOGIN
              : MODO.CADASTRO
          )
        }
        disabled={carregando}
      >
        {recuperacao
          ? 'Voltar para o login'
          : cadastro
            ? 'Entrar'
            : 'Criar conta'}
      </button>
    </div>
  )
}

function MobileBrand() {
  return (
    <div className="auth-mobile-brand">
      <div className="auth-logo">
        <Icon name="briefcase" />
      </div>

      <div>
        <strong>JobTrack</strong>
        <span>Organize seus processos seletivos.</span>
      </div>
    </div>
  )
}

function Icon({
  name,
  size = 24,
  strokeWidth = 2,
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}

export default Auth