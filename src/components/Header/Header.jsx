import './Header.css'

function Header({
  nome,
  onLogout,
  logoutLoading = false,
}) {
  const inicial =
    nome?.trim()?.charAt(0)?.toUpperCase() || 'U'

  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-brand-icon">
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="7"
              width="18"
              height="13"
              rx="2"
            />

            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M3 12h18" />
          </svg>
        </div>

        <div className="header-brand-text">
          <h1>Minhas Vagas</h1>

          <p>
            Controle simples dos seus processos seletivos.
          </p>
        </div>
      </div>

      <div className="header-actions">
        <div className="header-user">
          <div className="header-avatar">
            {inicial}
          </div>

          <div className="header-user-text">
            <span>Seja bem-vindo,</span>
            <strong>{nome}!</strong>
          </div>
        </div>

        <button
          type="button"
          className="header-logout"
          onClick={onLogout}
          disabled={logoutLoading}
        >
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 17l5-5-5-5" />
            <path d="M15 12H3" />
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          </svg>

          {logoutLoading ? 'Saindo...' : 'Sair'}
        </button>
      </div>
    </header>
  )
}

export default Header