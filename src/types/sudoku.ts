export interface SudokuCell {
  value: number
  isFixed: boolean
  isValid: boolean
}

export type SudokuBoard = SudokuCell[][]
