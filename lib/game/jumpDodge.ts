export const CANVAS_WIDTH = 480;
export const CANVAS_HEIGHT = 200;
export const GROUND_Y = CANVAS_HEIGHT - 30;
export const PLAYER_X = 60;
export const PLAYER_SIZE = 24;
export const GRAVITY = 0.9;
export const JUMP_VELOCITY = -13;

export interface Obstacle {
  x: number;
  width: number;
  height: number;
}

export function createObstacle(): Obstacle {
  const height = 20 + Math.random() * 20;
  return { x: CANVAS_WIDTH + 20, width: 16 + Math.random() * 10, height };
}

export function obstacleSpeed(elapsedSeconds: number): number {
  return 4 + Math.min(elapsedSeconds * 0.1, 5);
}
