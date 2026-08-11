export interface MazeCell {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  visited: boolean;
}

export type Maze = MazeCell[][];

export function generateMaze(cols: number, rows: number): Maze {
  const grid: Maze = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ top: true, right: true, bottom: true, left: true, visited: false }))
  );

  function carve(cx: number, cy: number) {
    grid[cy][cx].visited = true;
    const dirs = [
      [0, -1, "top", "bottom"],
      [1, 0, "right", "left"],
      [0, 1, "bottom", "top"],
      [-1, 0, "left", "right"],
    ] as const;
    const shuffled = [...dirs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    for (const [dx, dy, wall, opposite] of shuffled) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows || grid[ny][nx].visited) continue;
      grid[cy][cx][wall] = false;
      grid[ny][nx][opposite] = false;
      carve(nx, ny);
    }
  }

  carve(0, 0);
  return grid;
}

export function canMove(maze: Maze, x: number, y: number, dir: "top" | "right" | "bottom" | "left"): boolean {
  return !maze[y][x][dir];
}
