export type Match3Board = number[][];

export const COLORS = 5;
export const EMPTY = -1;

function randomColor(): number {
  return Math.floor(Math.random() * COLORS);
}

export function createBoard(size: number): Match3Board {
  const board: number[][] = [];
  for (let r = 0; r < size; r++) {
    const row: number[] = [];
    for (let c = 0; c < size; c++) {
      let color = randomColor();
      let guard = 0;
      while (
        guard < 20 &&
        ((c >= 2 && row[c - 1] === color && row[c - 2] === color) ||
          (r >= 2 && board[r - 1][c] === color && board[r - 2][c] === color))
      ) {
        color = randomColor();
        guard++;
      }
      row.push(color);
    }
    board.push(row);
  }
  return board;
}

export function isAdjacent(a: [number, number], b: [number, number]): boolean {
  const dr = Math.abs(a[0] - b[0]);
  const dc = Math.abs(a[1] - b[1]);
  return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
}

export function swapCells(board: Match3Board, a: [number, number], b: [number, number]): Match3Board {
  const next = board.map((row) => [...row]);
  const [ar, ac] = a;
  const [br, bc] = b;
  [next[ar][ac], next[br][bc]] = [next[br][bc], next[ar][ac]];
  return next;
}

export function findMatches(board: Match3Board): Set<string> {
  const size = board.length;
  const matched = new Set<string>();

  for (let r = 0; r < size; r++) {
    let runStart = 0;
    for (let c = 1; c <= size; c++) {
      const sameAsRunStart = c < size && board[r][c] === board[r][runStart] && board[r][c] !== EMPTY;
      if (sameAsRunStart) continue;
      if (c - runStart >= 3) {
        for (let k = runStart; k < c; k++) matched.add(`${r}-${k}`);
      }
      runStart = c;
    }
  }

  for (let c = 0; c < size; c++) {
    let runStart = 0;
    for (let r = 1; r <= size; r++) {
      const sameAsRunStart = r < size && board[r][c] === board[runStart][c] && board[r][c] !== EMPTY;
      if (sameAsRunStart) continue;
      if (r - runStart >= 3) {
        for (let k = runStart; k < r; k++) matched.add(`${k}-${c}`);
      }
      runStart = r;
    }
  }

  return matched;
}

export function resolveBoard(board: Match3Board): { board: Match3Board; cleared: number } {
  let current = board;
  let totalCleared = 0;
  for (let guard = 0; guard < 50; guard++) {
    const matched = findMatches(current);
    if (matched.size === 0) break;
    totalCleared += matched.size;
    current = clearAndCascade(current, matched);
  }
  return { board: current, cleared: totalCleared };
}

export function clearAndCascade(board: Match3Board, matched: Set<string>): Match3Board {
  const size = board.length;
  const next = board.map((row) => [...row]);
  for (const key of matched) {
    const [r, c] = key.split("-").map(Number);
    next[r][c] = EMPTY;
  }
  for (let c = 0; c < size; c++) {
    const remaining: number[] = [];
    for (let r = 0; r < size; r++) {
      if (next[r][c] !== EMPTY) remaining.push(next[r][c]);
    }
    const missing = size - remaining.length;
    const refilled = [...Array.from({ length: missing }, randomColor), ...remaining];
    for (let r = 0; r < size; r++) next[r][c] = refilled[r];
  }
  return next;
}
