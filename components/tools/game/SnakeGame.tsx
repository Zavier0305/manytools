"use client";

import { useEffect, useRef, useState } from "react";
import {
  createInitialSnake,
  isOpposite,
  isOutOfBounds,
  isSelfCollision,
  nextHead,
  randomFood,
  wrapPoint,
  type Direction,
  type Point,
} from "@/lib/game/snake";

const CELL_SIZE = 18;

const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

const MODE_PRESETS = [
  { id: "standard", gridSize: 20, speedMs: 140, wraparound: false, label: "標準" },
  { id: "fast", gridSize: 20, speedMs: 80, wraparound: false, label: "高速" },
  { id: "large", gridSize: 30, speedMs: 140, wraparound: false, label: "広いフィールド" },
  { id: "wrap", gridSize: 20, speedMs: 140, wraparound: true, label: "壁抜け" },
  { id: "hardcore", gridSize: 15, speedMs: 90, wraparound: true, label: "ハードコア" },
];

interface GameState {
  snake: Point[];
  direction: Direction;
  pendingDirection: Direction;
  food: Point;
  running: boolean;
  gameOver: boolean;
}

export default function SnakeGame({ config }: { config?: Record<string, unknown> }) {
  const defaultModeId = (config?.variantId as string) ?? "standard";
  const defaultModeIndex = Math.max(
    0,
    MODE_PRESETS.findIndex((m) => m.id === defaultModeId)
  );
  const [modeIndex, setModeIndex] = useState(defaultModeIndex === -1 ? 0 : defaultModeIndex);
  const mode = MODE_PRESETS[modeIndex];
  const canvasSize = mode.gridSize * CELL_SIZE;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState | null>(null);
  const modeRef = useRef(mode);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    modeRef.current = mode;
  });

  function storageKeyFor(m: typeof mode) {
    return `snake-best-${m.id}`;
  }

  function draw() {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    const activeMode = modeRef.current;
    if (!canvas || !state) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = activeMode.gridSize * CELL_SIZE;
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = "#ef4444";
    ctx.fillRect(state.food.x * CELL_SIZE, state.food.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);

    state.snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? "#4f46e5" : "#818cf8";
      ctx.fillRect(seg.x * CELL_SIZE, seg.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    });
  }

  function resetGame(nextModeIndex = modeIndex) {
    const nextMode = MODE_PRESETS[nextModeIndex];
    const snake = createInitialSnake(nextMode.gridSize);
    stateRef.current = {
      snake,
      direction: "right",
      pendingDirection: "right",
      food: randomFood(snake, nextMode.gridSize),
      running: true,
      gameOver: false,
    };
    setModeIndex(nextModeIndex);
    setScore(0);
    setGameOver(false);
    setBest(Number(localStorage.getItem(storageKeyFor(nextMode)) ?? 0));
    requestAnimationFrame(draw);
  }

  useEffect(() => {
    const savedBest = Number(localStorage.getItem(storageKeyFor(mode)) ?? 0);
    // Reading localStorage and seeding the initial food position both require the
    // browser, so this setup runs once client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBest(savedBest);
    resetGame(modeIndex);
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

    function tick() {
      const state = stateRef.current;
      const activeMode = modeRef.current;
      if (!state || !state.running) return;

      state.direction = state.pendingDirection;
      let head = nextHead(state.snake[0], state.direction);

      if (isOutOfBounds(head, activeMode.gridSize)) {
        if (activeMode.wraparound) {
          head = wrapPoint(head, activeMode.gridSize);
        } else {
          state.running = false;
          setGameOver(true);
          setBest((b) => {
            const nb = Math.max(b, state.snake.length - 3);
            localStorage.setItem(storageKeyFor(activeMode), String(nb));
            return nb;
          });
          return;
        }
      }
      if (isSelfCollision(head, state.snake)) {
        state.running = false;
        setGameOver(true);
        setBest((b) => {
          const nb = Math.max(b, state.snake.length - 3);
          localStorage.setItem(storageKeyFor(activeMode), String(nb));
          return nb;
        });
        return;
      }

      const ateFood = head.x === state.food.x && head.y === state.food.y;
      state.snake = [head, ...state.snake];
      if (ateFood) {
        state.food = randomFood(state.snake, activeMode.gridSize);
        setScore((s) => s + 1);
      } else {
        state.snake.pop();
      }
      draw();
    }

    const interval = setInterval(tick, mode.speedMs);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, modeIndex]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
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
        <div className="flex items-center gap-2">
          <select
            value={modeIndex}
            onChange={(e) => resetGame(Number(e.target.value))}
            className="rounded-lg border border-slate-300 px-2 py-2 text-sm"
          >
            {MODE_PRESETS.map((m, i) => (
              <option key={m.id} value={i}>
                {m.label}
              </option>
            ))}
          </select>
          <button type="button" className="btn-secondary" onClick={() => resetGame()}>
            リセット
          </button>
        </div>
      </div>
      <div className="relative mx-auto" style={{ width: canvasSize }}>
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          className="mx-auto rounded-xl border border-slate-300"
        />
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-white/85 text-center">
            <p className="text-2xl font-bold text-slate-800">ゲームオーバー</p>
            <button type="button" className="btn" onClick={() => resetGame()}>
              もう一度
            </button>
          </div>
        )}
      </div>
      <p className="text-center text-sm text-slate-500">
        矢印キーでヘビを操作します{mode.wraparound ? "(壁を突き抜けます)" : ""}
      </p>
    </div>
  );
}
