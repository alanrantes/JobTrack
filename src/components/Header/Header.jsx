import './Header.css'

function Header({ onNewJob }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-icon">
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
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M3 12h18" />
          </svg>
        </div>

        <div className="brand-text">
          <h1>Minhas Vagas</h1>
          <p>Controle simples dos seus processos seletivos.</p>
        </div>
      </div>

      <button
        type="button"
        className="new-job-button"
        onClick={onNewJob}
      >
        <span aria-hidden="true">+</span>
        Nova vaga
      </button>
    </header>
  )
}

export default Header