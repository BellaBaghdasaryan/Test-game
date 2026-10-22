import './SudokuCell.css'

interface SudokuCellProps {
  value: number
  isFixed: boolean
  isValid: boolean
  isSelected: boolean
  onClick: () => void
}

function SudokuCell({ value, isFixed, isValid, isSelected, onClick }: SudokuCellProps) {
  const className = [
    'sudoku-cell',
    isFixed && 'fixed',
    !isValid && 'invalid',
    isSelected && 'selected',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={isFixed}
      role="gridcell"
      aria-label={`Cell with value ${value || 'empty'}`}
    >
      {value || ''}
    </button>
  )
}

export default SudokuCell
