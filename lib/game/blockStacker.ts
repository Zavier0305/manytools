export const COLS = 10;
export const ROWS = 18;

export type StackerBoard = number[][];

export interface Piece {
  id: string;
  rotation: number;
  row: number;
  col: number;
}

const SHAPES: Record<string, number[][][]> = {
  I: [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
  ],
  O: [
    [
      [1, 1],
      [1, 1],
    ],
  ],
  T: [
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  S: [
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
  ],
  Z: [
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ],
  ],
  J: [
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
  ],
  L: [
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
  ],
};

export const PIECE_IDS = Object.keys(SHAPES);

const COLOR_MAP: Record<string, number> = { I: 1, O: 2, T: 3, S: 4, Z: 5, J: 6, L: 7 };

export function randomPieceId(): string {
  return PIECE_IDS[Math.floor(Math.random() * PIECE_IDS.length)];
}

export function getShape(piece: Piece): number[][] {
  const rotations = SHAPES[piece.id];
  return rotations[piece.rotation % rotations.length];
}

export function pieceColor(id: string): number {
  return COLOR_MAP[id];
}

export function createPiece(id: string): Piece {
  const shape = SHAPES[id][0];
  return { id, rotation: 0, row: 0, col: Math.floor((COLS - shape[0].length) / 2) };
}

export function createEmptyBoard(): StackerBoard {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

export function canPlace(
  board: StackerBoard,
  piece: Piece,
  dRow = 0,
  dCol = 0,
  rotation = piece.rotation
): boolean {
  const rotations = SHAPES[piece.id];
  const shape = rotations[rotation % rotations.length];
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const nr = piece.row + r + dRow;
      const nc = piece.col + c + dCol;
      if (nc < 0 || nc >= COLS || nr >= ROWS) return false;
      if (nr >= 0 && board[nr][nc]) return false;
    }
  }
  return true;
}

export function mergePiece(board: StackerBoard, piece: Piece): StackerBoard {
  const next = board.map((row) => [...row]);
  const shape = getShape(piece);
  const color = pieceColor(piece.id);
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const nr = piece.row + r;
      const nc = piece.col + c;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) next[nr][nc] = color;
    }
  }
  return next;
}

export function clearLines(board: StackerBoard): { board: StackerBoard; cleared: number } {
  const remaining = board.filter((row) => row.some((cell) => cell === 0));
  const cleared = ROWS - remaining.length;
  const newRows = Array.from({ length: cleared }, () => Array(COLS).fill(0));
  return { board: [...newRows, ...remaining], cleared };
}
