export const CANVAS_WIDTH = 360;
export const CANVAS_HEIGHT = 480;
export const SHIP_WIDTH = 36;
export const SHIP_HEIGHT = 22;
export const SHIP_Y = CANVAS_HEIGHT - SHIP_HEIGHT - 12;
export const SHIP_SPEED = 6;

export interface Meteor {
  x: number;
  y: number;
  radius: number;
  vy: number;
}

export function createMeteor(elapsedSeconds: number): Meteor {
  const radius = 10 + Math.random() * 14;
  const baseSpeed = 2.2 + Math.min(elapsedSeconds * 0.08, 4.5);
  return {
    x: radius + Math.random() * (CANVAS_WIDTH - radius * 2),
    y: -radius,
    radius,
    vy: baseSpeed + Math.random() * 1.5,
  };
}

export function spawnIntervalMs(elapsedSeconds: number): number {
  return Math.max(220, 650 - elapsedSeconds * 10);
}

export function circleRectCollide(meteor: Meteor, shipX: number): boolean {
  const closestX = Math.max(shipX, Math.min(meteor.x, shipX + SHIP_WIDTH));
  const closestY = Math.max(SHIP_Y, Math.min(meteor.y, SHIP_Y + SHIP_HEIGHT));
  const dx = meteor.x - closestX;
  const dy = meteor.y - closestY;
  return dx * dx + dy * dy < meteor.radius * meteor.radius;
}
