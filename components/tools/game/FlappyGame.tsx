"use client";

import { useEffect, useRef, useState } from "react";
import {
  BIRD_RADIUS,
  BIRD_X,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  FLAP_VELOCITY,
  GRAVITY,
  PIPE_SPACING,
  PIPE_SPEED,
  PIPE_WIDTH,
  createPipe,
  pipeCollides,
  type Pipe,
} from "@/lib/game/flappy";

interface GameState {
  birdY: number;
  velocity: number;
  pipes: Pipe[];
  alive: boolean;
  score: number;
}

function createInitialState(): GameState {
  return {
    birdY: CANVAS_HEIGHT / 2,
    velocity: 0,
    pipes: [createPipe(CANVAS_WIDTH + 100)],
    alive: true,
    score: 0,
  };
}

export default function FlappyGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(createInitialState());
  const [status, setStatus] = useState<"ready" | "playing" | "over">("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    // localStorage is only available client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBest(Number(localStorage.getItem("flappy-best") ?? 0));
  }, []);

  function draw() {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = "#7dd3fc";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "#22c55e";
    for (const pipe of state.pipes) {
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.gapY - 75);
      ctx.fillRect(pipe.x, pipe.gapY + 75, PIPE_WIDTH, CANVAS_HEIGHT - (pipe.gapY + 75));
    }

    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(BIRD_X, state.birdY, BIRD_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }

  function start() {
    stateRef.current = createInitialState();
    setScore(0);
    setStatus("playing");
  }

  function flap() {
    if (status !== "playing") return;
    stateRef.current.velocity = FLAP_VELOCITY;
  }

  useEffect(() => {
    if (status !== "playing") return;
    let frame: number;

    function tick() {
      const state = stateRef.current;
      if (!state.alive) return;

      state.velocity += GRAVITY;
      state.birdY += state.velocity;

      if (state.birdY - BIRD_RADIUS < 0 || state.birdY + BIRD_RADIUS > CANVAS_HEIGHT) {
        state.alive = false;
        setStatus("over");
        setBest((b) => {
          const nb = Math.max(b, state.score);
          localStorage.setItem("flappy-best", String(nb));
          return nb;
        });
        return;
      }

      for (const pipe of state.pipes) {
        pipe.x -= PIPE_SPEED;
        if (!pipe.passed && pipe.x + PIPE_WIDTH < BIRD_X) {
          pipe.passed = true;
          state.score += 1;
          setScore(state.score);
        }
        if (pipeCollides(pipe, state.birdY)) {
          state.alive = false;
          setStatus("over");
          setBest((b) => {
            const nb = Math.max(b, state.score);
            localStorage.setItem("flappy-best", String(nb));
            return nb;
          });
          return;
        }
      }

      state.pipes = state.pipes.filter((p) => p.x + PIPE_WIDTH > 0);
      const lastPipe = state.pipes[state.pipes.length - 1];
      if (!lastPipe || CANVAS_WIDTH - lastPipe.x >= PIPE_SPACING) {
        state.pipes.push(createPipe(CANVAS_WIDTH + 20));
      }

      draw();
      if (state.alive) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [status]);

  useEffect(() => {
    draw();
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === " ") {
        e.preventDefault();
        if (status === "playing") flap();
        else start();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div className="text-xs text-slate-500">ベスト</div>
            <div className="text-xl font-bold text-indigo-600">{best}</div>
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
          onClick={() => (status === "playing" ? flap() : start())}
          className="mx-auto cursor-pointer rounded-xl border border-slate-300"
        />
        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-slate-900/60 text-center text-white">
            <p className="text-2xl font-bold">{status === "ready" ? "フラッピー風フライトゲーム" : "ゲームオーバー"}</p>
            <button type="button" className="btn" onClick={start}>
              {status === "ready" ? "スタート" : "もう一度"}
            </button>
          </div>
        )}
      </div>
      <p className="text-center text-sm text-slate-500">クリックまたはスペースキーで羽ばたいて、土管の隙間をすり抜けよう</p>
    </div>
  );
}
