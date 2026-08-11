"use client";

import { useEffect, useState } from "react";

const HOLE_COUNT = 9;
const DURATION_SECONDS = 30;

export default function WhackAMoleGame({ config }: { config?: Record<string, unknown> }) {
  const emoji = (config?.emoji as string) ?? "🐹";
  const popDurationMs = (config?.popDurationMs as number) ?? 700;
  const [status, setStatus] = useState<"ready" | "playing" | "over">("ready");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION_SECONDS);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hitIndex, setHitIndex] = useState<number | null>(null);

  function start() {
    setScore(0);
    setTimeLeft(DURATION_SECONDS);
    setActiveIndex(null);
    setStatus("playing");
  }

  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setStatus("over");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [status]);

  useEffect(() => {
    if (status !== "playing") return;
    let cancelled = false;
    let hideTimeout: ReturnType<typeof setTimeout>;
    let spawnTimeout: ReturnType<typeof setTimeout>;

    function spawn() {
      if (cancelled) return;
      const idx = Math.floor(Math.random() * HOLE_COUNT);
      setActiveIndex(idx);
      hideTimeout = setTimeout(() => {
        if (cancelled) return;
        setActiveIndex((cur) => (cur === idx ? null : cur));
        spawnTimeout = setTimeout(spawn, 300 + Math.random() * 500);
      }, popDurationMs);
    }

    spawnTimeout = setTimeout(spawn, 400);
    return () => {
      cancelled = true;
      clearTimeout(hideTimeout);
      clearTimeout(spawnTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function handleWhack(idx: number) {
    if (status !== "playing" || activeIndex !== idx) return;
    setScore((s) => s + 1);
    setActiveIndex(null);
    setHitIndex(idx);
    setTimeout(() => setHitIndex((cur) => (cur === idx ? null : cur)), 150);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">スコア</div>
            <div className="text-xl font-bold text-indigo-600">{score}</div>
          </div>
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">残り時間</div>
            <div className="text-xl font-bold text-indigo-600">{timeLeft}秒</div>
          </div>
        </div>
        <button type="button" className="btn-secondary" onClick={start}>
          {status === "ready" ? "スタート" : "リセット"}
        </button>
      </div>

      <div className="relative mx-auto grid max-w-sm grid-cols-3 gap-3">
        {Array.from({ length: HOLE_COUNT }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleWhack(i)}
            className={`flex aspect-square items-center justify-center rounded-full bg-amber-800 text-4xl transition ${
              hitIndex === i ? "scale-90" : ""
            }`}
          >
            <span
              className={`transition-transform ${
                activeIndex === i ? "scale-100" : "scale-0"
              }`}
            >
              {emoji}
            </span>
          </button>
        ))}

        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-white/90 text-center">
            <p className="text-2xl font-bold text-slate-800">
              {status === "ready" ? "もぐらたたき" : `結果: ${score}点`}
            </p>
            <button type="button" className="btn" onClick={start}>
              {status === "ready" ? "スタート" : "もう一度"}
            </button>
          </div>
        )}
      </div>
      <p className="text-center text-sm text-slate-500">出てきたモグラをクリックしよう({DURATION_SECONDS}秒間)</p>
    </div>
  );
}
