"use client";

import { useEffect, useRef, useState } from "react";
import {
  BALL_SIZE,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  PONG_HEIGHT,
  PONG_WIDTH,
  WIN_SCORE,
  createPongState,
  type PongState,
} from "@/lib/game/pong";

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<PongState>(createPongState());
  const [status, setStatus] = useState<"ready" | "playing" | "over">("ready");
  const [scores, setScores] = useState({ player: 0, cpu: 0 });

  function draw() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const state = stateRef.current;
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, PONG_WIDTH, PONG_HEIGHT);
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(10, state.playerY, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(PONG_WIDTH - 20, state.cpuY, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(state.ballX, state.ballY, BALL_SIZE, BALL_SIZE);
  }

  function start() {
    stateRef.current = createPongState();
    setScores({ player: 0, cpu: 0 });
    setStatus("playing");
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas || status !== "playing") return;
    const rect = canvas.getBoundingClientRect();
    const y = ((e.clientY - rect.top) / rect.height) * PONG_HEIGHT;
    stateRef.current.playerY = Math.min(PONG_HEIGHT - PADDLE_HEIGHT, Math.max(0, y - PADDLE_HEIGHT / 2));
  }

  useEffect(() => {
    draw();
  }, []);

  useEffect(() => {
    if (status !== "playing") return;
    let frame: number;

    function tick() {
      const state = stateRef.current;
      state.ballX += state.vx;
      state.ballY += state.vy;

      if (state.ballY <= 0 || state.ballY >= PONG_HEIGHT - BALL_SIZE) state.vy *= -1;

      const cpuCenter = state.cpuY + PADDLE_HEIGHT / 2;
      if (cpuCenter < state.ballY) state.cpuY += 3.2;
      else if (cpuCenter > state.ballY) state.cpuY -= 3.2;
      state.cpuY = Math.min(PONG_HEIGHT - PADDLE_HEIGHT, Math.max(0, state.cpuY));

      if (
        state.ballX <= 10 + PADDLE_WIDTH &&
        state.ballY + BALL_SIZE >= state.playerY &&
        state.ballY <= state.playerY + PADDLE_HEIGHT &&
        state.vx < 0
      ) {
        state.vx *= -1.05;
      }
      if (
        state.ballX + BALL_SIZE >= PONG_WIDTH - 20 &&
        state.ballY + BALL_SIZE >= state.cpuY &&
        state.ballY <= state.cpuY + PADDLE_HEIGHT &&
        state.vx > 0
      ) {
        state.vx *= -1.05;
      }

      if (state.ballX < 0) {
        state.cpuScore++;
        setScores({ player: state.playerScore, cpu: state.cpuScore });
        Object.assign(state, createPongState(), { playerScore: state.playerScore, cpuScore: state.cpuScore });
      } else if (state.ballX > PONG_WIDTH) {
        state.playerScore++;
        setScores({ player: state.playerScore, cpu: state.cpuScore });
        Object.assign(state, createPongState(), { playerScore: state.playerScore, cpuScore: state.cpuScore });
      }

      if (state.playerScore >= WIN_SCORE || state.cpuScore >= WIN_SCORE) {
        setStatus("over");
        return;
      }

      draw();
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [status]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-slate-700">
          {scores.player} - {scores.cpu}
        </p>
        <button type="button" className="btn-secondary" onClick={start}>
          {status === "ready" ? "スタート" : "リセット"}
        </button>
      </div>
      <div className="relative mx-auto" style={{ width: PONG_WIDTH }}>
        <canvas
          ref={canvasRef}
          width={PONG_WIDTH}
          height={PONG_HEIGHT}
          onMouseMove={handleMouseMove}
          className="mx-auto cursor-none rounded-xl border border-slate-300"
        />
        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-slate-900/70 text-center text-white">
            <p className="text-2xl font-bold">
              {status === "ready" ? "ポン" : scores.player > scores.cpu ? "あなたの勝ちです!🎉" : "CPUの勝ちです"}
            </p>
            <button type="button" className="btn" onClick={start}>
              {status === "ready" ? "スタート" : "もう一度"}
            </button>
          </div>
        )}
      </div>
      <p className="text-center text-sm text-slate-500">マウスでパドルを操作し、{WIN_SCORE}点先取を目指そう</p>
    </div>
  );
}
