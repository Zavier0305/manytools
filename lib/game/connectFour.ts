export const C4_ROWS = 6;
export const C4_COLS = 7;
export type C4Cell = 0 | 1 | 2;
export type C4Board = C4Cell[][];

export function createC4Board(): C4Board {
  return Array.from({ length: C4_ROWS }, () => Array(C4_COLS).fill(0));
}

export function dropDisc(board: C4Board, col: number, player: C4Cell): C4Board | null {
  for (let row = C4_ROWS - 1; row >= 0; row--) {
    if (board[row][col] === 0) {
      const next = board.map((r) => [...r]);
      next[row][col] = player;
      return next;
    }
  }
  return null;
}

export function checkC4Winner(board: C4Board): C4Cell | null {
  const dirs = [
    [0, 1], [1, 0], [1, 1], [1, -1],
  ];
  for (let r = 0; r < C4_ROWS; r++) {
    for (let c = 0; c < C4_COLS; c++) {
      const player = board[r][c];
      if (player === 0) continue;
      for (const [dr, dc] of dirs) {
        let count = 1;
        for (let i = 1; i < 4; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;
          if (nr < 0 || nr >= C4_ROWS || nc < 0 || nc >= C4_COLS || board[nr][nc] !== player) break;
          count++;
        }
        if (count >= 4) return player;
      }
    }
  }
  return null;
}

export function isC4Full(board: C4Board): boolean {
  return board[0].every((c) => c !== 0);
}

export function chooseC4Move(board: C4Board): number {
  const validCols = Array.from({ length: C4_COLS }, (_, c) => c).filter((c) => board[0][c] === 0);

  for (const col of validCols) {
    const attempt = dropDisc(board, col, 2);
    if (attempt && checkC4Winner(attempt) === 2) return col;
  }
  for (const col of validCols) {
    const attempt = dropDisc(board, col, 1);
    if (attempt && checkC4Winner(attempt) === 1) return col;
  }
  const center = Math.floor(C4_COLS / 2);
  validCols.sort((a, b) => Math.abs(a - center) - Math.abs(b - center));
  return validCols[0];
}
