export const BOARD_SIZE = 8;
export type Cell = 0 | 1 | 2;
export type ReversiBoard = Cell[][];

export interface LegalMove {
  row: number;
  col: number;
  flips: [number, number][];
}

const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1],
];

export function createInitialBoard(): ReversiBoard {
  const board: ReversiBoard = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
  board[3][3] = 2;
  board[3][4] = 1;
  board[4][3] = 1;
  board[4][4] = 2;
  return board;
}

function inBounds(r: number, c: number): boolean {
  return r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE;
}

function findFlipsForDirection(
  board: ReversiBoard,
  row: number,
  col: number,
  dr: number,
  dc: number,
  player: Cell
): [number, number][] {
  const opponent = player === 1 ? 2 : 1;
  const flips: [number, number][] = [];
  let r = row + dr;
  let c = col + dc;
  while (inBounds(r, c) && board[r][c] === opponent) {
    flips.push([r, c]);
    r += dr;
    c += dc;
  }
  if (inBounds(r, c) && board[r][c] === player && flips.length > 0) {
    return flips;
  }
  return [];
}

export function getLegalMoves(board: ReversiBoard, player: Cell): LegalMove[] {
  const moves: LegalMove[] = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] !== 0) continue;
      const flips = DIRECTIONS.flatMap(([dr, dc]) =>
        findFlipsForDirection(board, row, col, dr, dc, player)
      );
      if (flips.length > 0) moves.push({ row, col, flips });
    }
  }
  return moves;
}

export function applyMove(board: ReversiBoard, move: LegalMove, player: Cell): ReversiBoard {
  const next = board.map((r) => [...r]);
  next[move.row][move.col] = player;
  for (const [r, c] of move.flips) next[r][c] = player;
  return next;
}

const CORNER_BONUS = 5;

export function chooseCpuMove(moves: LegalMove[]): LegalMove {
  let best = moves[0];
  let bestScore = -Infinity;
  for (const move of moves) {
    const isCorner =
      (move.row === 0 || move.row === BOARD_SIZE - 1) && (move.col === 0 || move.col === BOARD_SIZE - 1);
    const score = move.flips.length + (isCorner ? CORNER_BONUS : 0);
    if (score > bestScore) {
      bestScore = score;
      best = move;
    }
  }
  return best;
}

export function countStones(board: ReversiBoard): { black: number; white: number } {
  let black = 0;
  let white = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell === 1) black++;
      else if (cell === 2) white++;
    }
  }
  return { black, white };
}
