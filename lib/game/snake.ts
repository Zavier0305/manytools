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

export function createInitialSnake(): Point[] {
  const mid = Math.floor(GRID_SIZE / 2);
  return [
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid },
  ];
}

export function randomFood(occupied: Point[]): Point {
  const free: Point[] = [];
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      if (!occupied.some((p) => p.x === x && p.y === y)) free.push({ x, y });
    }
  }
  if (free.length === 0) return { x: 0, y: 0 };
  return free[Math.floor(Math.random() * free.length)];
}

export function isOutOfBounds(p: Point): boolean {
  return p.x < 0 || p.y < 0 || p.x >= GRID_SIZE || p.y >= GRID_SIZE;
}

export function isSelfCollision(head: Point, body: Point[]): boolean {
  return body.some((p) => p.x === head.x && p.y === head.y);
}
