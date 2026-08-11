export type LightsOutBoard = boolean[][];

export function createSolvedBoard(size: number): LightsOutBoard {
  return Array.from({ length: size }, () => Array(size).fill(false));
}

export function toggleCell(board: LightsOutBoard, row: number, col: number): LightsOutBoard {
  const size = board.length;
  const next = board.map((r) => [...r]);
  function flip(r: number, c: number) {
    if (r >= 0 && r < size && c >= 0 && c < size) next[r][c] = !next[r][c];
  }
  flip(row, col);
  flip(row - 1, col);
  flip(row + 1, col);
  flip(row, col - 1);
  flip(row, col + 1);
  return next;
}

export function scrambleBoard(size: number, clicks: number): LightsOutBoard {
  let board = createSolvedBoard(size);
  for (let i = 0; i < clicks; i++) {
    const r = Math.floor(Math.random() * size);
    const c = Math.floor(Math.random() * size);
    board = toggleCell(board, r, c);
  }
  return board;
}

export function isCleared(board: LightsOutBoard): boolean {
  return board.every((row) => row.every((cell) => !cell));
}
