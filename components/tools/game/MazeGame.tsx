"use client";

import { useEffect, useRef, useState } from "react";
import { canMove, generateMaze, type Maze } from "@/lib/game/maze";

const CELL_SIZE = 24;

export default function MazeGame({ config }: { config?: Record<string, unknown> }) {
  const size = (config?.size as number) ?? 10;
  const [maze, setMaze] = useState<Maze | null>(null);
  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const [seconds, setSeconds] = useState(0);
  const [won, setWon] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function newMaze() {
    setMaze(generateMaze(size, size));
    setPlayer({ x: 0, y: 0 });
    setSeconds(0);
    setWon(false);
  }

  useEffect(() => {
    // Maze generation uses randomness, so it happens client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    newMaze();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (won || !maze) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [won, maze]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!maze || won) return;
      const dirMap: Record<string, ["top" | "right" | "bottom" | "left", number, number]> = {
        ArrowUp: ["top", 0, -1],
        ArrowDown: ["bottom", 0, 1],
        ArrowLeft: ["left", -1, 0],
        ArrowRight: ["right", 1, 0],
      };
      const entry = dirMap[e.key];
      if (!entry) return;
      e.preventDefault();
      const [dir, dx, dy] = entry;
      setPlayer((p) => {
        if (!canMove(maze, p.x, p.y, dir)) return p;
        const next = { x: p.x + dx, y: p.y + dy };
        if (next.x === size - 1 && next.y === size - 1) setWon(true);
        return next;
      });
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [maze, won, size]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !maze) return;
    const px = size * CELL_SIZE;
    ctx.clearRect(0, 0, px, px);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, px, px);
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const cell = maze[y][x];
        const x0 = x * CELL_SIZE;
        const y0 = y * CELL_SIZE;
        if (cell.top) {
          ctx.moveTo(x0, y0);
          ctx.lineTo(x0 + CELL_SIZE, y0);
        }
        if (cell.left) {
          ctx.moveTo(x0, y0);
          ctx.lineTo(x0, y0 + CELL_SIZE);
        }
        if (cell.right) {
          ctx.moveTo(x0 + CELL_SIZE, y0);
          ctx.lineTo(x0 + CELL_SIZE, y0 + CELL_SIZE);
        }
        if (cell.bottom) {
          ctx.moveTo(x0, y0 + CELL_SIZE);
          ctx.lineTo(x0 + CELL_SIZE, y0 + CELL_SIZE);
        }
      }
    }
    ctx.stroke();

    ctx.fillStyle = "#22c55e";
    ctx.fillRect((size - 1) * CELL_SIZE + 4, (size - 1) * CELL_SIZE + 4, CELL_SIZE - 8, CELL_SIZE - 8);

    ctx.fillStyle = "#4f46e5";
    ctx.beginPath();
    ctx.arc(player.x * CELL_SIZE + CELL_SIZE / 2, player.y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 3, 0, Math.PI * 2);
    ctx.fill();
  }, [maze, player, size]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">経過時間</div>
          <div className="text-xl font-bold text-indigo-600">{seconds}秒</div>
        </div>
        <button type="button" className="btn-secondary" onClick={newMaze}>
          新しい迷路
        </button>
      </div>
      <div className="relative mx-auto" style={{ width: size * CELL_SIZE }}>
        <canvas
          ref={canvasRef}
          width={size * CELL_SIZE}
          height={size * CELL_SIZE}
          className="mx-auto rounded-lg border border-slate-300"
        />
        {won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg bg-white/90 text-center">
            <p className="text-2xl font-bold text-indigo-600">ゴール!🎉 {seconds}秒</p>
            <button type="button" className="btn" onClick={newMaze}>
              もう一度
            </button>
          </div>
        )}
      </div>
      <p className="text-center text-sm text-slate-500">矢印キーで青い丸を操作し、緑のゴールを目指そう</p>
    </div>
  );
}
