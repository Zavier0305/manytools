export interface SokobanPuzzle {
  walls: Set<string>;
  targets: Set<string>;
  rows: number;
  cols: number;
}

export interface SokobanState {
  boxes: Set<string>;
  player: [number, number];
}

export const SOKOBAN_LEVELS: string[][] = [
  ["#######", "#.....#", "#.P.B.#", "#.....#", "#...T.#", "#.....#", "#######"],
  [
    "#########",
    "#.......#",
    "#..B..B.#",
    "#.......#",
    "#..T..T.#",
    "#.......#",
    "#...P...#",
    "#########",
  ],
  [
    "###########",
    "#.........#",
    "#..B.B.B..#",
    "#.........#",
    "#..T.T.T..#",
    "#.........#",
    "#....P....#",
    "###########",
  ],
];

function key(r: number, c: number): string {
  return `${r}-${c}`;
}

export function parseLevel(rows: string[]): { puzzle: SokobanPuzzle; initial: SokobanState } {
  const walls = new Set<string>();
  const targets = new Set<string>();
  const boxes = new Set<string>();
  let player: [number, number] = [0, 0];
  rows.forEach((rowStr, r) => {
    for (let c = 0; c < rowStr.length; c++) {
      const ch = rowStr[c];
      if (ch === "#") walls.add(key(r, c));
      if (ch === "T") targets.add(key(r, c));
      if (ch === "B") boxes.add(key(r, c));
      if (ch === "P") player = [r, c];
    }
  });
  return {
    puzzle: { walls, targets, rows: rows.length, cols: Math.max(...rows.map((r) => r.length)) },
    initial: { boxes, player },
  };
}

const DIRS: Record<string, [number, number]> = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
};

export function move(puzzle: SokobanPuzzle, state: SokobanState, dirKey: string): SokobanState {
  const dir = DIRS[dirKey];
  if (!dir) return state;
  const [pr, pc] = state.player;
  const nr = pr + dir[0];
  const nc = pc + dir[1];
  const nextKey = key(nr, nc);
  if (puzzle.walls.has(nextKey)) return state;

  if (state.boxes.has(nextKey)) {
    const br = nr + dir[0];
    const bc = nc + dir[1];
    const boxNextKey = key(br, bc);
    if (puzzle.walls.has(boxNextKey) || state.boxes.has(boxNextKey)) return state;
    const newBoxes = new Set(state.boxes);
    newBoxes.delete(nextKey);
    newBoxes.add(boxNextKey);
    return { boxes: newBoxes, player: [nr, nc] };
  }

  return { boxes: state.boxes, player: [nr, nc] };
}

export function isSolved(puzzle: SokobanPuzzle, state: SokobanState): boolean {
  return [...state.boxes].every((b) => puzzle.targets.has(b));
}
