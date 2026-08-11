"use client";

import { useEffect, useRef, useState } from "react";
import {
  BALL_RADIUS,
  BRICK_HEIGHT,
  BRICK_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  createBricks,
  type Brick,
} from "@/lib/game/breakout";

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  launched: boolean;
}

interface GameState {
  paddleX: number;
  ball: Ball;
  bricks: Brick[];
  lives: number;
  score: number;
  running: boolean;
}

function createInitialState(rows: number): GameState {
  return {
    paddleX: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2,
    ball: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - PADDLE_HEIGHT - BALL_RADIUS - 2,
      vx: 0,
      vy: 0,
      launched: false,
    },
    bricks: createBricks(rows),
    lives: 3,
    score: 0,
    running: true,
  };
}

export default function BreakoutGame({ config }: { config?: Record<string, unknown> }) {
  const rows = (config?.rows as number) ?? 5;
  const ballSpeed = (config?.ballSpeed as number) ?? 1;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(createInitialState(rows));
  const keysRef = useRef<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [status, setStatus] = useState<"ready" | "playing" | "over" | "won">("ready");

  function draw() {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (const brick of state.bricks) {
      if (!brick.alive) continue;
      ctx.fillStyle = brick.color;
      ctx.fillRect(brick.x, brick.y, BRICK_WIDTH, BRICK_HEIGHT);
    }

    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(state.paddleX, CANVAS_HEIGHT - PADDLE_HEIGHT - 4, PADDLE_WIDTH, PADDLE_HEIGHT);

    ctx.beginPath();
    ctx.arc(state.ball.x, state.ball.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = "#f8fafc";
    ctx.fill();
  }

  function launchBall() {
    const state = stateRef.current;
    if (state.ball.launched) return;
    state.ball.launched = true;
    state.ball.vx = 3 * ballSpeed * (Math.random() < 0.5 ? -1 : 1);
    state.ball.vy = -4 * ballSpeed;
  }

  function resetGame() {
    stateRef.current = createInitialState(rows);
    setScore(0);
    setLives(3);
    setStatus("playing");
    draw();
  }

  useEffect(() => {
    draw();
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      keysRef.current.add(e.key);
      if (e.key === " ") launchBall();
    }
    function handleKeyUp(e: KeyboardEvent) {
      keysRef.current.delete(e.key);
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePointerMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const relativeX = ((e.clientX - rect.left) / rect.width) * CANVAS_WIDTH;
    stateRef.current.paddleX = Math.min(
      CANVAS_WIDTH - PADDLE_WIDTH,
      Math.max(0, relativeX - PADDLE_WIDTH / 2)
    );
  }

  useEffect(() => {
    if (status !== "playing") return;
    let frame: number;

    function tick() {
      const state = stateRef.current;

      if (keysRef.current.has("ArrowLeft")) state.paddleX -= 6;
      if (keysRef.current.has("ArrowRight")) state.paddleX += 6;
      state.paddleX = Math.min(CANVAS_WIDTH - PADDLE_WIDTH, Math.max(0, state.paddleX));

      if (!state.ball.launched) {
        state.ball.x = state.paddleX + PADDLE_WIDTH / 2;
      } else {
        state.ball.x += state.ball.vx;
        state.ball.y += state.ball.vy;

        if (state.ball.x <= BALL_RADIUS || state.ball.x >= CANVAS_WIDTH - BALL_RADIUS) {
          state.ball.vx *= -1;
        }
        if (state.ball.y <= BALL_RADIUS) {
          state.ball.vy *= -1;
        }

        const paddleTop = CANVAS_HEIGHT - PADDLE_HEIGHT - 4;
        if (
          state.ball.vy > 0 &&
          state.ball.y + BALL_RADIUS >= paddleTop &&
          state.ball.y - BALL_RADIUS <= paddleTop + PADDLE_HEIGHT &&
          state.ball.x >= state.paddleX &&
          state.ball.x <= state.paddleX + PADDLE_WIDTH
        ) {
          const hitPos = (state.ball.x - state.paddleX) / PADDLE_WIDTH - 0.5;
          state.ball.vx = hitPos * 8;
          state.ball.vy = -Math.abs(state.ball.vy);
        }

        for (const brick of state.bricks) {
          if (!brick.alive) continue;
          if (
            state.ball.x + BALL_RADIUS > brick.x &&
            state.ball.x - BALL_RADIUS < brick.x + BRICK_WIDTH &&
            state.ball.y + BALL_RADIUS > brick.y &&
            state.ball.y - BALL_RADIUS < brick.y + BRICK_HEIGHT
          ) {
            brick.alive = false;
            state.ball.vy *= -1;
            state.score += 10;
            setScore(state.score);
            break;
          }
        }

        if (state.ball.y > CANVAS_HEIGHT + BALL_RADIUS) {
          state.lives -= 1;
          setLives(state.lives);
          if (state.lives <= 0) {
            state.running = false;
            setStatus("over");
          } else {
            state.ball = {
              x: state.paddleX + PADDLE_WIDTH / 2,
              y: CANVAS_HEIGHT - PADDLE_HEIGHT - BALL_RADIUS - 6,
              vx: 0,
              vy: 0,
              launched: false,
            };
          }
        }

        if (state.bricks.every((b) => !b.alive)) {
          state.running = false;
          setStatus("won");
        }
      }

      draw();
      if (state.running) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [status]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">スコア</div>
            <div className="text-xl font-bold text-indigo-600">{score}</div>
          </div>
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">残機</div>
            <div className="text-xl font-bold text-indigo-600">{"❤️".repeat(Math.max(lives, 0)) || "0"}</div>
          </div>
        </div>
        <button type="button" className="btn-secondary" onClick={resetGame}>
          {status === "ready" ? "スタート" : "リセット"}
        </button>
      </div>
      <div className="relative mx-auto" style={{ width: CANVAS_WIDTH }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onMouseMove={handlePointerMove}
          onClick={launchBall}
          className="mx-auto cursor-none rounded-xl border border-slate-300"
        />
        {(status === "ready" || status === "over" || status === "won") && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-slate-900/70 text-center text-white">
            <p className="text-2xl font-bold">
              {status === "ready" ? "ブロック崩し" : status === "won" ? "クリア!🎉" : "ゲームオーバー"}
            </p>
            <button type="button" className="btn" onClick={resetGame}>
              {status === "ready" ? "スタート" : "もう一度"}
            </button>
          </div>
        )}
      </div>
      <p className="text-center text-sm text-slate-500">
        マウスまたは矢印キーでパドルを操作、クリックまたはスペースキーでボールを発射します
      </p>
    </div>
  );
}
