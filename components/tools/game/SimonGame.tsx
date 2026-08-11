"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = [
  { id: 0, active: "bg-red-400", base: "bg-red-200" },
  { id: 1, active: "bg-blue-400", base: "bg-blue-200" },
  { id: 2, active: "bg-yellow-400", base: "bg-yellow-200" },
  { id: 3, active: "bg-green-400", base: "bg-green-200" },
];

function randomColorId(): number {
  return Math.floor(Math.random() * 4);
}

export default function SimonGame() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [litIndex, setLitIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<"ready" | "showing" | "input" | "over">("ready");
  const [best, setBest] = useState(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimeouts() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }

  function playSequence(seq: number[]) {
    setStatus("showing");
    seq.forEach((colorId, i) => {
      timeoutsRef.current.push(
        setTimeout(() => setLitIndex(colorId), i * 700)
      );
      timeoutsRef.current.push(
        setTimeout(() => setLitIndex(null), i * 700 + 400)
      );
    });
    timeoutsRef.current.push(
      setTimeout(() => {
        setStatus("input");
        setPlayerIndex(0);
      }, seq.length * 700)
    );
  }

  function start() {
    clearTimeouts();
    const first = [randomColorId()];
    setSequence(first);
    playSequence(first);
  }

  useEffect(() => clearTimeouts, []);

  function handlePress(colorId: number) {
    if (status !== "input") return;
    if (colorId === sequence[playerIndex]) {
      if (playerIndex + 1 === sequence.length) {
        setBest((b) => Math.max(b, sequence.length));
        const next = [...sequence, randomColorId()];
        setSequence(next);
        setTimeout(() => playSequence(next), 500);
        setStatus("showing");
      } else {
        setPlayerIndex((i) => i + 1);
      }
    } else {
      setStatus("over");
    }
  }

  return (
    <div className="space-y-4">
      <div className="tool-panel px-4 py-2 text-center">
        <div className="text-xs text-slate-500">ベストスコア</div>
        <div className="text-xl font-bold text-indigo-600">{best}</div>
      </div>

      <div className="mx-auto grid w-64 grid-cols-2 gap-2">
        {COLORS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => handlePress(c.id)}
            disabled={status !== "input"}
            className={`aspect-square rounded-xl transition ${litIndex === c.id ? c.active : c.base}`}
          />
        ))}
      </div>

      <div className="text-center">
        {status === "ready" && (
          <button type="button" className="btn" onClick={start}>
            スタート
          </button>
        )}
        {status === "over" && (
          <div className="space-y-2">
            <p className="text-xl font-bold text-red-600">ゲームオーバー(スコア: {sequence.length - 1})</p>
            <button type="button" className="btn" onClick={start}>
              もう一度
            </button>
          </div>
        )}
        {(status === "showing" || status === "input") && (
          <p className="text-sm text-slate-500">{status === "showing" ? "よく見て覚えよう..." : "同じ順番でクリックしよう"}</p>
        )}
      </div>
    </div>
  );
}
