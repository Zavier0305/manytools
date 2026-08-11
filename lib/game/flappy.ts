export const CANVAS_WIDTH = 320;
export const CANVAS_HEIGHT = 480;
export const BIRD_X = 60;
export const BIRD_RADIUS = 12;
export const GRAVITY = 0.45;
export const FLAP_VELOCITY = -7.5;
export const PIPE_WIDTH = 52;
export const PIPE_GAP = 150;
export const PIPE_SPEED = 2.4;
export const PIPE_SPACING = 220;

export interface Pipe {
  x: number;
  gapY: number;
  passed: boolean;
}

export function createPipe(x: number): Pipe {
  const gapY = 90 + Math.random() * (CANVAS_HEIGHT - 180);
  return { x, gapY, passed: false };
}

export function circleRectOverlap(
  cx: number,
  cy: number,
  r: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number
): boolean {
  const closestX = Math.max(rx, Math.min(cx, rx + rw));
  const closestY = Math.max(ry, Math.min(cy, ry + rh));
  const dx = cx - closestX;
  const dy = cy - closestY;
  return dx * dx + dy * dy < r * r;
}

export function pipeCollides(pipe: Pipe, birdY: number): boolean {
  const topRect = { x: pipe.x, y: 0, w: PIPE_WIDTH, h: pipe.gapY - PIPE_GAP / 2 };
  const bottomRect = {
    x: pipe.x,
    y: pipe.gapY + PIPE_GAP / 2,
    w: PIPE_WIDTH,
    h: CANVAS_HEIGHT - (pipe.gapY + PIPE_GAP / 2),
  };
  return (
    circleRectOverlap(BIRD_X, birdY, BIRD_RADIUS, topRect.x, topRect.y, topRect.w, topRect.h) ||
    circleRectOverlap(BIRD_X, birdY, BIRD_RADIUS, bottomRect.x, bottomRect.y, bottomRect.w, bottomRect.h)
  );
}
