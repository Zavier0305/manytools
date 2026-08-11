"use client";

import { useEffect, useRef, useState } from "react";
import {
  createInitialSnake,
  GRID_SIZE,
  isOpposite,
  isOutOfBounds,
  isSelfCollision,
  nextHead,
  randomFood,
  type Direction,
  type Point,
} from "@/lib/game/snake";

const CELL_SIZE = 18;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;
const BASE_SPEED_MS = 140;

const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

interface GameState {
  snake: Point[];
  direction: Direction;
  pendingDirection: Direction;
  food: Point;
  running: boolean;
  gameOver: boolean;
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState | null>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [ready, setReady] = useState(false);

  function draw() {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    if (!canvas || !state) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.fillStyle = "#ef4444";
    ctx.fillRect(state.food.x * CELL_SIZE, state.food.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);

    state.snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? "#4f46e5" : "#818cf8";
      ctx.fillRect(seg.x * CELL_SIZE, seg.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    });
  }

  function resetGame() {
    const snake = createInitialSnake();
    stateRef.current = {
      snake,
      direction: "right",
      pendingDirection: "right",
      food: randomFood(snake),
      running: true,
      gameOver: false,
    };
    setScore(0);
    setGameOver(false);
    draw();
  }

  useEffect(() => {
    const savedBest = Number(localStorage.getItem("snake-best") ?? 0);
    // Reading localStorage and seeding the initial food position both require the
    // browser, so this setup runs once client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBest(savedBest);
    resetGame();
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const direction = KEY_TO_DIRECTION[e.key];
      if (!direction || !stateRef.current) return;
      e.preventDefault();
      if (isOpposite(direction, stateRef.current.direction)) return;
      stateRef.current.pendingDirection = direction;
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(() => {
      const state = stateRef.current;
      if (!state || !state.running) return;

      state.direction = state.pendingDirection;
      const head = nextHead(state.snake[0], state.direction);

      if (isOutOfBounds(head) || isSelfCollision(head, state.snake)) {
        state.running = false;
        setGameOver(true);
        setBest((b) => {
          const nb = Math.max(b, state.snake.length - 3);
          localStorage.setItem("snake-best", String(nb));
          return nb;
        });
        return;
      }

      const ateFood = head.x === state.food.x && head.y === state.food.y;
      state.snake = [head, ...state.snake];
      if (ateFood) {
        state.food = randomFood(state.snake);
        setScore((s) => s + 1);
      } else {
        state.snake.pop();
      }
      draw();
    }, BASE_SPEED_MS);
    return () => clearInterval(interval);
  }, [ready]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">スコア</div>
            <div className="text-xl font-bold text-indigo-600">{score}</div>
          </div>
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">ベスト</div>
            <div className="text-xl font-bold text-indigo-600">{best}</div>
          </div>
        </div>
        <button type="button" className="btn-secondary" onClick={resetGame}>
          リセット
        </button>
      </div>
      <div className="relative mx-auto" style={{ width: CANVAS_SIZE }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="mx-auto rounded-xl border border-slate-300"
        />
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-white/85 text-center">
            <p className="text-2xl font-bold text-slate-800">ゲームオーバー</p>
            <button type="button" className="btn" onClick={resetGame}>
              もう一度
            </button>
          </div>
        )}
      </div>
      <p className="text-center text-sm text-slate-500">矢印キーでヘビを操作します</p>
    </div>
  );
}
