export const CANVAS_WIDTH = 480;
export const CANVAS_HEIGHT = 360;
export const PADDLE_WIDTH = 90;
export const PADDLE_HEIGHT = 12;
export const BALL_RADIUS = 7;
export const BRICK_ROWS = 5;
export const BRICK_COLS = 8;
export const BRICK_HEIGHT = 20;
export const BRICK_PADDING = 4;
export const BRICK_TOP_OFFSET = 40;
export const BRICK_SIDE_OFFSET = 8;

export const BRICK_WIDTH =
  (CANVAS_WIDTH - BRICK_SIDE_OFFSET * 2 - BRICK_PADDING * (BRICK_COLS - 1)) / BRICK_COLS;

export const ROW_COLORS = ["#f87171", "#fb923c", "#facc15", "#4ade80", "#60a5fa"];

export interface Brick {
  x: number;
  y: number;
  alive: boolean;
  color: string;
}

export function createBricks(): Brick[] {
  const bricks: Brick[] = [];
  for (let row = 0; row < BRICK_ROWS; row++) {
    for (let col = 0; col < BRICK_COLS; col++) {
      bricks.push({
        x: BRICK_SIDE_OFFSET + col * (BRICK_WIDTH + BRICK_PADDING),
        y: BRICK_TOP_OFFSET + row * (BRICK_HEIGHT + BRICK_PADDING),
        alive: true,
        color: ROW_COLORS[row % ROW_COLORS.length],
      });
    }
  }
  return bricks;
}
