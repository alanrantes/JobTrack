import './ConfirmModal.css'

function ConfirmModal({
  isOpen,
  title = 'Excluir candidatura',
  message = 'Tem certeza que deseja excluir esta candidatura?',
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!isOpen) return null

  return (
    <div className="confirm-overlay" onMouseDown={onCancel}>
      <div
        className="confirm-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="confirm-icon">
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
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v5" />
            <path d="M14 11v5" />
          </svg>
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <span className="confirm-warning">
          Essa ação não poderá ser desfeita.
        </span>

        <div className="confirm-actions">
          <button
            type="button"
            className="confirm-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="confirm-delete"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Excluindo...' : 'Excluir vaga'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal