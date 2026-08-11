export const PONG_WIDTH = 480;
export const PONG_HEIGHT = 300;
export const PADDLE_WIDTH = 10;
export const PADDLE_HEIGHT = 60;
export const BALL_SIZE = 10;
export const WIN_SCORE = 5;

export interface PongState {
  ballX: number;
  ballY: number;
  vx: number;
  vy: number;
  playerY: number;
  cpuY: number;
  playerScore: number;
  cpuScore: number;
}

export function createPongState(): PongState {
  return {
    ballX: PONG_WIDTH / 2,
    ballY: PONG_HEIGHT / 2,
    vx: 3,
    vy: 2,
    playerY: PONG_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    cpuY: PONG_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    playerScore: 0,
    cpuScore: 0,
  };
}
