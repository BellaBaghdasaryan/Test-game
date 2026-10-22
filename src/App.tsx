import { useState } from 'react'
import './App.css'
import SudokuBoard from './components/SudokuBoard'
import { generateSudoku } from './utils/sudokuGenerator'

function App() {
  const [board, setBoard] = useState(generateSudoku())
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null)

  const handleNewGame = () => {
    setBoard(generateSudoku())
    setSelectedCell(null)
  }

  const handleCellChange = (row: number, col: number, value: number) => {
    const newBoard = board.map((r, i) =>
      i === row ? r.map((c, j) => (j === col ? { ...c, value } : c)) : r
    )
    setBoard(newBoard)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sudoku</h1>
        <button className="new-game-btn" onClick={handleNewGame}>
          New Game
        </button>
      </header>
      <SudokuBoard
        board={board}
        selectedCell={selectedCell}
        onCellSelect={setSelectedCell}
        onCellChange={handleCellChange}
      />
    </div>
  )
}

export default App
