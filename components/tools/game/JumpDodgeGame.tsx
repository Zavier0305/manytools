"use client";

import { useEffect, useRef, useState } from "react";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  GRAVITY,
  GROUND_Y,
  JUMP_VELOCITY,
  PLAYER_SIZE,
  PLAYER_X,
  createObstacle,
  obstacleSpeed,
  type Obstacle,
} from "@/lib/game/jumpDodge";

interface GameState {
  playerY: number;
  velocity: number;
  obstacles: Obstacle[];
  startTime: number;
  lastSpawn: number;
  alive: boolean;
}

export default function JumpDodgeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState | null>(null);
  const [status, setStatus] = useState<"ready" | "playing" | "over">("ready");
  const [elapsed, setElapsed] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBest(Number(localStorage.getItem("jump-dodge-best") ?? 0));
  }, []);

  function draw() {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !state) return;
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, 4);

    ctx.fillStyle = "#4f46e5";
    ctx.fillRect(PLAYER_X, state.playerY - PLAYER_SIZE, PLAYER_SIZE, PLAYER_SIZE);

    ctx.fillStyle = "#ef4444";
    for (const o of state.obstacles) {
      ctx.fillRect(o.x, GROUND_Y - o.height, o.width, o.height);
    }
  }

  function jump() {
    const state = stateRef.current;
    if (!state || status !== "playing") return;
    if (state.playerY >= GROUND_Y) state.velocity = JUMP_VELOCITY;
  }

  function start() {
    stateRef.current = {
      playerY: GROUND_Y,
      velocity: 0,
      obstacles: [],
      startTime: performance.now(),
      lastSpawn: 0,
      alive: true,
    };
    setElapsed(0);
    setStatus("playing");
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (status !== "playing") return;
    let frame: number;

    function tick(now: number) {
      const state = stateRef.current;
      if (!state || !state.alive) return;

      state.velocity += GRAVITY;
      state.playerY = Math.min(GROUND_Y, state.playerY + state.velocity);
      if (state.playerY >= GROUND_Y) {
        state.playerY = GROUND_Y;
        state.velocity = 0;
      }

      const elapsedSeconds = (now - state.startTime) / 1000;
      setElapsed(elapsedSeconds);
      const speed = obstacleSpeed(elapsedSeconds);

      if (now - state.lastSpawn > Math.max(700, 1400 - elapsedSeconds * 20)) {
        state.lastSpawn = now;
        state.obstacles.push(createObstacle());
      }
      state.obstacles.forEach((o) => (o.x -= speed));
      state.obstacles = state.obstacles.filter((o) => o.x + o.width > 0);

      for (const o of state.obstacles) {
        const playerBottom = state.playerY;
        const playerTop = state.playerY - PLAYER_SIZE;
        const collide =
          PLAYER_X + PLAYER_SIZE > o.x &&
          PLAYER_X < o.x + o.width &&
          playerBottom > GROUND_Y - o.height &&
          playerTop < GROUND_Y;
        if (collide) {
          state.alive = false;
          setStatus("over");
          setBest((b) => {
            const nb = Math.max(b, Math.floor(elapsedSeconds));
            localStorage.setItem("jump-dodge-best", String(nb));
            return nb;
          });
          break;
        }
      }

      draw();
      if (state.alive) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [status]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">生存時間</div>
            <div className="text-xl font-bold text-indigo-600">{elapsed.toFixed(1)}秒</div>
          </div>
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">ベスト</div>
            <div className="text-xl font-bold text-indigo-600">{best}秒</div>
          </div>
        </div>
        <button type="button" className="btn-secondary" onClick={start}>
          {status === "ready" ? "スタート" : "リセット"}
        </button>
      </div>
      <div className="relative mx-auto" style={{ width: CANVAS_WIDTH }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={jump}
          className="mx-auto rounded-xl border border-slate-300"
        />
        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-white/85 text-center">
            <p className="text-2xl font-bold text-slate-800">{status === "ready" ? "障害物ジャンプゲーム" : "ゲームオーバー"}</p>
            <button type="button" className="btn" onClick={start}>
              {status === "ready" ? "スタート" : "もう一度"}
            </button>
          </div>
        )}
      </div>
      <p className="text-center text-sm text-slate-500">スペースキー・上矢印・クリックでジャンプして障害物を避けよう</p>
    </div>
  );
}
