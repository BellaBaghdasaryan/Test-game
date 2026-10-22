import './SudokuBoard.css'
import SudokuCell from './SudokuCell'
import { SudokuBoard as Board } from '../types/sudoku'

interface SudokuBoardProps {
  board: Board
  selectedCell: [number, number] | null
  onCellSelect: (cell: [number, number] | null) => void
  onCellChange: (row: number, col: number, value: number) => void
}

function SudokuBoard({ board, selectedCell, onCellSelect, onCellChange }: SudokuBoardProps) {
  const handleCellClick = (row: number, col: number) => {
    if (!board[row][col].isFixed) {
      onCellSelect([row, col])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!selectedCell) return

    const [row, col] = selectedCell
    const key = e.key

    if (key >= '1' && key <= '9') {
      const value = parseInt(key)
      onCellChange(row, col, value)
    } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
      onCellChange(row, col, 0)
    } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      e.preventDefault()
      let newRow = row
      let newCol = col

      switch (key) {
        case 'ArrowUp':
          newRow = row > 0 ? row - 1 : 8
          break
        case 'ArrowDown':
          newRow = row < 8 ? row + 1 : 0
          break
        case 'ArrowLeft':
          newCol = col > 0 ? col - 1 : 8
          break
        case 'ArrowRight':
          newCol = col < 8 ? col + 1 : 0
          break
      }

      onCellSelect([newRow, newCol])
    }
  }

  return (
    <div
      className="sudoku-board"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="grid"
      aria-label="Sudoku game board"
    >
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row" role="row">
          {row.map((cell, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              value={cell.value}
              isFixed={cell.isFixed}
              isValid={cell.isValid}
              isSelected={
                selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex
              }
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default SudokuBoard
