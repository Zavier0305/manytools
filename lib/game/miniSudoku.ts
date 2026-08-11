export const SUDOKU_SIZE = 6;
const BOX_ROWS = 2;
const BOX_COLS = 3;

export type SudokuBoard = number[][];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isValidPlacement(board: SudokuBoard, row: number, col: number, val: number): boolean {
  for (let i = 0; i < SUDOKU_SIZE; i++) {
    if (board[row][i] === val) return false;
    if (board[i][col] === val) return false;
  }
  const boxRowStart = Math.floor(row / BOX_ROWS) * BOX_ROWS;
  const boxColStart = Math.floor(col / BOX_COLS) * BOX_COLS;
  for (let r = boxRowStart; r < boxRowStart + BOX_ROWS; r++) {
    for (let c = boxColStart; c < boxColStart + BOX_COLS; c++) {
      if (board[r][c] === val) return false;
    }
  }
  return true;
}

function solve(board: SudokuBoard, cells: [number, number][], index: number): boolean {
  if (index >= cells.length) return true;
  const [row, col] = cells[index];
  if (board[row][col] !== 0) return solve(board, cells, index + 1);
  for (const n of shuffle([1, 2, 3, 4, 5, 6])) {
    if (isValidPlacement(board, row, col, n)) {
      board[row][col] = n;
      if (solve(board, cells, index + 1)) return true;
      board[row][col] = 0;
    }
  }
  return false;
}

function allCells(): [number, number][] {
  const cells: [number, number][] = [];
  for (let r = 0; r < SUDOKU_SIZE; r++) {
    for (let c = 0; c < SUDOKU_SIZE; c++) cells.push([r, c]);
  }
  return cells;
}

export function generateSolvedBoard(): SudokuBoard {
  const board: SudokuBoard = Array.from({ length: SUDOKU_SIZE }, () => Array(SUDOKU_SIZE).fill(0));
  solve(board, allCells(), 0);
  return board;
}

export function generatePuzzle(clues = 20): { puzzle: SudokuBoard; solution: SudokuBoard; givens: boolean[][] } {
  const solution = generateSolvedBoard();
  const puzzle = solution.map((row) => [...row]);
  const cellsToClear = shuffle(allCells()).slice(0, SUDOKU_SIZE * SUDOKU_SIZE - clues);
  for (const [r, c] of cellsToClear) puzzle[r][c] = 0;
  const givens = puzzle.map((row) => row.map((v) => v !== 0));
  return { puzzle, solution, givens };
}

export function isBoardComplete(board: SudokuBoard): boolean {
  for (let r = 0; r < SUDOKU_SIZE; r++) {
    const rowSet = new Set(board[r]);
    if (rowSet.size !== SUDOKU_SIZE || rowSet.has(0)) return false;
  }
  for (let c = 0; c < SUDOKU_SIZE; c++) {
    const colVals = board.map((row) => row[c]);
    const colSet = new Set(colVals);
    if (colSet.size !== SUDOKU_SIZE || colSet.has(0)) return false;
  }
  for (let br = 0; br < SUDOKU_SIZE; br += BOX_ROWS) {
    for (let bc = 0; bc < SUDOKU_SIZE; bc += BOX_COLS) {
      const vals: number[] = [];
      for (let r = br; r < br + BOX_ROWS; r++) {
        for (let c = bc; c < bc + BOX_COLS; c++) vals.push(board[r][c]);
      }
      const boxSet = new Set(vals);
      if (boxSet.size !== SUDOKU_SIZE || boxSet.has(0)) return false;
    }
  }
  return true;
}
