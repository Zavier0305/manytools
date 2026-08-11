"use client";

import { useEffect, useRef, useState } from "react";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  SHIP_HEIGHT,
  SHIP_SPEED,
  SHIP_WIDTH,
  SHIP_Y,
  circleRectCollide,
  createMeteor,
  spawnIntervalMs,
  type Meteor,
} from "@/lib/game/meteorDodge";

interface GameState {
  shipX: number;
  meteors: Meteor[];
  startTime: number;
  lastSpawn: number;
  alive: boolean;
}

const SPEED_PRESETS = [
  { speedMultiplier: 1, id: "normal", label: "標準" },
  { speedMultiplier: 1.5, id: "fast", label: "高速" },
  { speedMultiplier: 2, id: "extreme", label: "超高速" },
];

export default function MeteorDodgeGame({ config }: { config?: Record<string, unknown> }) {
  const defaultVariantId = (config?.variantId as string) ?? "normal";
  const defaultPresetIndex = Math.max(
    0,
    SPEED_PRESETS.findIndex((p) => p.id === defaultVariantId)
  );
  const [presetIndex, setPresetIndex] = useState(defaultPresetIndex === -1 ? 0 : defaultPresetIndex);
  const preset = SPEED_PRESETS[presetIndex];
  const speedMultiplier = preset.speedMultiplier;
  const storageKey = `meteor-dodge-best-${preset.id}`;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState | null>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const [status, setStatus] = useState<"ready" | "playing" | "over">("ready");
  const [elapsed, setElapsed] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    // localStorage is only available client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBest(Number(localStorage.getItem(storageKey) ?? 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function draw() {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !state) return;

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "#fbbf24";
    for (const m of state.meteors) {
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.moveTo(state.shipX + SHIP_WIDTH / 2, SHIP_Y);
    ctx.lineTo(state.shipX, SHIP_Y + SHIP_HEIGHT);
    ctx.lineTo(state.shipX + SHIP_WIDTH, SHIP_Y + SHIP_HEIGHT);
    ctx.closePath();
    ctx.fill();
  }

  function start() {
    stateRef.current = {
      shipX: CANVAS_WIDTH / 2 - SHIP_WIDTH / 2,
      meteors: [],
      startTime: performance.now(),
      lastSpawn: 0,
      alive: true,
    };
    setElapsed(0);
    setStatus("playing");
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      keysRef.current.add(e.key);
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
  }, []);

  function handlePointerMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const state = stateRef.current;
    const canvas = canvasRef.current;
    if (!state || !canvas || status !== "playing") return;
    const rect = canvas.getBoundingClientRect();
    const relativeX = ((e.clientX - rect.left) / rect.width) * CANVAS_WIDTH;
    state.shipX = Math.min(CANVAS_WIDTH - SHIP_WIDTH, Math.max(0, relativeX - SHIP_WIDTH / 2));
  }

  useEffect(() => {
    if (status !== "playing") return;
    let frame: number;

    function tick(now: number) {
      const state = stateRef.current;
      if (!state || !state.alive) return;

      if (keysRef.current.has("ArrowLeft")) state.shipX -= SHIP_SPEED;
      if (keysRef.current.has("ArrowRight")) state.shipX += SHIP_SPEED;
      state.shipX = Math.min(CANVAS_WIDTH - SHIP_WIDTH, Math.max(0, state.shipX));

      const elapsedSeconds = (now - state.startTime) / 1000;
      setElapsed(elapsedSeconds);

      if (now - state.lastSpawn > spawnIntervalMs(elapsedSeconds, speedMultiplier)) {
        state.lastSpawn = now;
        state.meteors.push(createMeteor(elapsedSeconds, speedMultiplier));
      }

      state.meteors.forEach((m) => (m.y += m.vy));
      state.meteors = state.meteors.filter((m) => m.y - m.radius < CANVAS_HEIGHT);

      for (const m of state.meteors) {
        if (circleRectCollide(m, state.shipX)) {
          state.alive = false;
          setStatus("over");
          setBest((b) => {
            const nb = Math.max(b, Math.floor(elapsedSeconds));
            localStorage.setItem(storageKey, String(nb));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="flex items-center gap-2">
          <select
            value={presetIndex}
            onChange={(e) => {
              const nextIndex = Number(e.target.value);
              setPresetIndex(nextIndex);
              setBest(Number(localStorage.getItem(`meteor-dodge-best-${SPEED_PRESETS[nextIndex].id}`) ?? 0));
              setStatus("ready");
            }}
            className="rounded-lg border border-slate-300 px-2 py-2 text-sm"
          >
            {SPEED_PRESETS.map((p, i) => (
              <option key={p.id} value={i}>
                {p.label}
              </option>
            ))}
          </select>
          <button type="button" className="btn-secondary" onClick={start}>
            {status === "ready" ? "スタート" : "リセット"}
          </button>
        </div>
      </div>
      <div className="relative mx-auto" style={{ width: CANVAS_WIDTH }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onMouseMove={handlePointerMove}
          className="mx-auto cursor-none rounded-xl border border-slate-300"
        />
        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-slate-900/70 text-center text-white">
            <p className="text-2xl font-bold">{status === "ready" ? "隕石よけ" : "ゲームオーバー"}</p>
            <button type="button" className="btn" onClick={start}>
              {status === "ready" ? "スタート" : "もう一度"}
            </button>
          </div>
        )}
      </div>
      <p className="text-center text-sm text-slate-500">
        マウス移動または左右矢印キーで自機を操作し、隕石を避け続けよう
      </p>
    </div>
  );
}
