export type Board = number[][];
export type Direction = "up" | "down" | "left" | "right";

export const BOARD_SIZE = 4;

export function createEmptyBoard(size = BOARD_SIZE): Board {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

function emptyCells(board: Board): [number, number][] {
  const cells: [number, number][] = [];
  board.forEach((row, r) =>
    row.forEach((v, c) => {
      if (v === 0) cells.push([r, c]);
    })
  );
  return cells;
}

export function addRandomTile(board: Board): Board {
  const cells = emptyCells(board);
  if (cells.length === 0) return board;
  const [r, c] = cells[Math.floor(Math.random() * cells.length)];
  const next = board.map((row) => [...row]);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function slideLeftRow(row: number[]): { row: number[]; scoreGained: number } {
  const nonZero = row.filter((v) => v !== 0);
  const merged: number[] = [];
  let scoreGained = 0;
  let i = 0;
  while (i < nonZero.length) {
    if (i + 1 < nonZero.length && nonZero[i] === nonZero[i + 1]) {
      const value = nonZero[i] * 2;
      merged.push(value);
      scoreGained += value;
      i += 2;
    } else {
      merged.push(nonZero[i]);
      i += 1;
    }
  }
  while (merged.length < row.length) merged.push(0);
  return { row: merged, scoreGained };
}

function transpose(board: Board): Board {
  return board[0].map((_, c) => board.map((row) => row[c]));
}

export function move(board: Board, direction: Direction): { board: Board; scoreGained: number; moved: boolean } {
  let rows: number[][];
  if (direction === "left") rows = board.map((r) => [...r]);
  else if (direction === "right") rows = board.map((r) => [...r].reverse());
  else if (direction === "up") rows = transpose(board);
  else rows = transpose(board).map((r) => [...r].reverse());

  let scoreGained = 0;
  const slid = rows.map((row) => {
    const result = slideLeftRow(row);
    scoreGained += result.scoreGained;
    return result.row;
  });

  let newBoard: Board;
  if (direction === "left") newBoard = slid;
  else if (direction === "right") newBoard = slid.map((r) => [...r].reverse());
  else if (direction === "up") newBoard = transpose(slid);
  else newBoard = transpose(slid.map((r) => [...r].reverse()));

  const moved = JSON.stringify(newBoard) !== JSON.stringify(board);
  return { board: newBoard, scoreGained, moved };
}

export function isGameOver(board: Board): boolean {
  if (emptyCells(board).length > 0) return false;
  const size = board.length;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const v = board[r][c];
      if (c + 1 < size && board[r][c + 1] === v) return false;
      if (r + 1 < size && board[r + 1][c] === v) return false;
    }
  }
  return true;
}

export function hasWon(board: Board, target = 2048): boolean {
  return board.some((row) => row.some((v) => v >= target));
}

export function createInitialBoard(size = BOARD_SIZE): Board {
  let board = createEmptyBoard(size);
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
}
