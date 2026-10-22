import { describe, it, expect } from 'vitest'
import { generateSudoku } from './utils/sudokuGenerator'

describe('Sudoku Generator', () => {
  it('should generate a 9x9 board', () => {
    const board = generateSudoku()
    expect(board.length).toBe(9)
    expect(board[0].length).toBe(9)
  })

  it('should have some fixed cells', () => {
    const board = generateSudoku()
    const fixedCells = board.flat().filter((cell) => cell.isFixed)
    expect(fixedCells.length).toBeGreaterThan(0)
  })

  it('should have some empty cells', () => {
    const board = generateSudoku()
    const emptyCells = board.flat().filter((cell) => cell.value === 0)
    expect(emptyCells.length).toBeGreaterThan(0)
  })
})
