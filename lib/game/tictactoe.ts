export type TTTCell = 0 | 1 | 2;
export type TTTBoard = TTTCell[];

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export function checkWinner(board: TTTBoard): TTTCell | null {
  for (const [a, b, c] of LINES) {
    if (board[a] !== 0 && board[a] === board[b] && board[b] === board[c]) return board[a];
  }
  return null;
}

export function isDraw(board: TTTBoard): boolean {
  return board.every((c) => c !== 0) && !checkWinner(board);
}

function minimax(board: TTTBoard, player: TTTCell): { score: number; move: number } {
  const winner = checkWinner(board);
  if (winner === 2) return { score: 1, move: -1 };
  if (winner === 1) return { score: -1, move: -1 };
  if (board.every((c) => c !== 0)) return { score: 0, move: -1 };

  const moves = board.map((c, i) => (c === 0 ? i : -1)).filter((i) => i !== -1);
  let best = { score: player === 2 ? -Infinity : Infinity, move: moves[0] };
  for (const move of moves) {
    const next = [...board];
    next[move] = player;
    const result = minimax(next, player === 2 ? 1 : 2);
    if (player === 2 && result.score > best.score) best = { score: result.score, move };
    if (player === 1 && result.score < best.score) best = { score: result.score, move };
  }
  return best;
}

export function chooseTTTMove(board: TTTBoard, difficulty: "easy" | "hard"): number {
  const legal = board.map((c, i) => (c === 0 ? i : -1)).filter((i) => i !== -1);
  if (difficulty === "easy" && Math.random() < 0.7) {
    return legal[Math.floor(Math.random() * legal.length)];
  }
  return minimax(board, 2).move;
}
