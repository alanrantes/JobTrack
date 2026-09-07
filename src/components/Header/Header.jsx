import './Header.css'

function Header({ onNewJob }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-icon">
          <span>J</span>
        </div>

        <div className="brand-text">
          <h1>JobTrack</h1>
          <p>Controle seus processos seletivos.</p>
        </div>
      </div>

      <button
        type="button"
        className="new-job-button"
        onClick={onNewJob}
      >
        <span>+</span>
        Nova vaga
      </button>
    </header>
  )
}

export default Header