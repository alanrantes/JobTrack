function CustomSelect({
  value,
  placeholder = 'Selecione',
  options,
  isOpen,
  onToggle,
  onSelect,
  disabled = false,
}) {
  return (
    <div className="custom-select">
      <button
        type="button"
        className={`custom-select-button ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
        disabled={disabled}
      >
        <span className={!value ? 'placeholder' : ''}>
          {value || placeholder}
        </span>

        <svg
          className="custom-select-arrow"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="custom-select-options">
          {options.map((option) => {
            const isSelected = value === option

            return (
              <button
                key={option}
                type="button"
                className={`custom-select-option ${
                  isSelected ? 'selected' : ''
                }`}
                onClick={() => onSelect(option)}
              >
                <span>{option}</span>

                {isSelected && (
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CustomSelect