"use client";

import { useEffect, useState } from "react";

const COLORS = [
  { id: "red", label: "赤", className: "bg-red-400" },
  { id: "blue", label: "青", className: "bg-blue-400" },
  { id: "green", label: "緑", className: "bg-green-400" },
  { id: "yellow", label: "黄", className: "bg-yellow-400" },
  { id: "purple", label: "紫", className: "bg-purple-400" },
];

const GRID_SIZE = 20;
const DURATION_SECONDS = 30;

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default function BubbleClickGame() {
  const [status, setStatus] = useState<"ready" | "playing" | "over">("ready");
  const [target, setTarget] = useState(COLORS[0]);
  const [bubbles, setBubbles] = useState<(typeof COLORS)[number][]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION_SECONDS);

  function start() {
    setTarget(randomColor());
    setBubbles(Array.from({ length: GRID_SIZE }, randomColor));
    setScore(0);
    setTimeLeft(DURATION_SECONDS);
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

  function handleClick(index: number) {
    if (status !== "playing") return;
    if (bubbles[index].id === target.id) {
      setScore((s) => s + 1);
    } else {
      setScore((s) => Math.max(0, s - 1));
    }
    const next = [...bubbles];
    next[index] = randomColor();
    setBubbles(next);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">残り時間</div>
          <div className="text-xl font-bold text-indigo-600">{timeLeft}秒</div>
        </div>
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">スコア</div>
          <div className="text-xl font-bold text-indigo-600">{score}</div>
        </div>
        {status === "playing" && (
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">対象の色</div>
            <div className={`mx-auto mt-1 h-6 w-6 rounded-full ${target.className}`} />
          </div>
        )}
      </div>

      {status === "playing" ? (
        <div className="mx-auto grid max-w-md grid-cols-5 gap-2">
          {bubbles.map((c, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleClick(i)}
              className={`aspect-square rounded-full ${c.className} transition hover:opacity-80`}
            />
          ))}
        </div>
      ) : (
        <div className="tool-panel space-y-3 text-center">
          {status === "over" && <p className="text-2xl font-bold text-indigo-600">結果: {score}点</p>}
          <button type="button" className="btn" onClick={start}>
            {status === "ready" ? "スタート" : "もう一度"}
          </button>
        </div>
      )}
      <p className="text-center text-sm text-slate-500">表示された色のバブルだけをクリックしよう(まちがえると減点)</p>
    </div>
  );
}
