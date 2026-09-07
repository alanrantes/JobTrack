import './UserBar.css'

function UserBar({
  nome,
  onLogout,
  loading = false,
}) {
  const inicial =
    nome?.trim()?.charAt(0)?.toUpperCase() ||
    'U'

  return (
    <div className="user-bar">
      <div className="user-bar-profile">
        <div className="user-avatar">
          {inicial}
        </div>

        <div className="user-bar-text">
          <span>Seja bem-vindo,</span>

          <strong>{nome}!</strong>
        </div>
      </div>

      <button
        type="button"
        className="logout-button"
        onClick={onLogout}
        disabled={loading}
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

        {loading ? 'Saindo...' : 'Sair'}
      </button>
    </div>
  )
}

export default UserBar