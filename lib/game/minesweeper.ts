export interface MineCell {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
}

export type MineBoard = MineCell[][];

export function createBoard(rows: number, cols: number, mineCount: number): MineBoard {
  const board: MineBoard = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ mine: false, revealed: false, flagged: false, adjacent: 0 }))
  );

  let placed = 0;
  while (placed < mineCount) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!board[r][c].mine) {
      board[r][c].mine = true;
      placed++;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].mine) count++;
        }
      }
      board[r][c].adjacent = count;
    }
  }
  return board;
}

export function revealCell(board: MineBoard, row: number, col: number): MineBoard {
  const next = board.map((r) => r.map((c) => ({ ...c })));
  const rows = next.length;
  const cols = next[0].length;

  function flood(r: number, c: number) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    const cell = next[r][c];
    if (cell.revealed || cell.flagged) return;
    cell.revealed = true;
    if (cell.adjacent === 0 && !cell.mine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr !== 0 || dc !== 0) flood(r + dr, c + dc);
        }
      }
    }
  }

  flood(row, col);
  return next;
}

export function isWon(board: MineBoard): boolean {
  return board.every((row) => row.every((c) => c.mine || c.revealed));
}
