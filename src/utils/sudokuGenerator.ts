import { SudokuBoard, SudokuCell } from '../types/sudoku'

function isValid(board: number[][], row: number, col: number, num: number): boolean {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) {
      return false
    }
  }

  const startRow = Math.floor(row / 3) * 3
  const startCol = Math.floor(col / 3) * 3

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) {
        return false
      }
    }
  }

  return true
}

function solveSudoku(board: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num

            if (solveSudoku(board)) {
              return true
            }

            board[row][col] = 0
          }
        }
        return false
      }
    }
  }
  return true
}

function generateCompleteSudoku(): number[][] {
  const board: number[][] = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0))

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  for (let i = 0; i < 9; i += 3) {
    const shuffled = [...numbers].sort(() => Math.random() - 0.5)
    let idx = 0
    for (let row = i; row < i + 3; row++) {
      for (let col = i; col < i + 3; col++) {
        board[row][col] = shuffled[idx++]
      }
    }
  }

  solveSudoku(board)
  return board
}

function removeNumbers(board: number[][], difficulty: number = 40): number[][] {
  const result = board.map((row) => [...row])
  let removed = 0

  while (removed < difficulty) {
    const row = Math.floor(Math.random() * 9)
    const col = Math.floor(Math.random() * 9)

    if (result[row][col] !== 0) {
      result[row][col] = 0
      removed++
    }
  }

  return result
}

export function generateSudoku(difficulty: number = 40): SudokuBoard {
  const complete = generateCompleteSudoku()
  const puzzle = removeNumbers(complete, difficulty)

  return puzzle.map((row, rowIndex) =>
    row.map((value, colIndex): SudokuCell => ({
      value,
      isFixed: value !== 0,
      isValid: true,
    }))
  )
}
