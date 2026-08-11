export interface Point {
  x: number;
  y: number;
}

export type Direction = "up" | "down" | "left" | "right";

export const GRID_SIZE = 20;

const DELTA: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export function isOpposite(a: Direction, b: Direction): boolean {
  return DELTA[a].x === -DELTA[b].x && DELTA[a].y === -DELTA[b].y;
}

export function nextHead(head: Point, direction: Direction): Point {
  const d = DELTA[direction];
  return { x: head.x + d.x, y: head.y + d.y };
}

export function createInitialSnake(gridSize = GRID_SIZE): Point[] {
  const mid = Math.floor(gridSize / 2);
  return [
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid },
  ];
}

export function randomFood(occupied: Point[], gridSize = GRID_SIZE): Point {
  const free: Point[] = [];
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      if (!occupied.some((p) => p.x === x && p.y === y)) free.push({ x, y });
    }
  }
  if (free.length === 0) return { x: 0, y: 0 };
  return free[Math.floor(Math.random() * free.length)];
}

export function isOutOfBounds(p: Point, gridSize = GRID_SIZE): boolean {
  return p.x < 0 || p.y < 0 || p.x >= gridSize || p.y >= gridSize;
}

export function wrapPoint(p: Point, gridSize = GRID_SIZE): Point {
  return { x: (p.x + gridSize) % gridSize, y: (p.y + gridSize) % gridSize };
}

export function isSelfCollision(head: Point, body: Point[]): boolean {
  return body.some((p) => p.x === head.x && p.y === head.y);
}
