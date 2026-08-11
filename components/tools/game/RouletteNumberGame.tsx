"use client";

import { useState } from "react";

const RED_NUMBERS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

function colorOf(n: number): "red" | "black" | "green" {
  if (n === 0) return "green";
  return RED_NUMBERS.has(n) ? "red" : "black";
}

export default function RouletteNumberGame() {
  const [betNumber, setBetNumber] = useState(7);
  const [betType, setBetType] = useState<"number" | "red" | "black">("number");
  const [result, setResult] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [coins, setCoins] = useState(100);
  const [message, setMessage] = useState<string | null>(null);

  function spin() {
    if (spinning || coins < 10) return;
    setSpinning(true);
    setMessage(null);
    setCoins((c) => c - 10);
    let ticks = 0;
    const id = setInterval(() => {
      setResult(Math.floor(Math.random() * 37));
      ticks++;
      if (ticks > 20) {
        clearInterval(id);
        const final = Math.floor(Math.random() * 37);
        setResult(final);
        setSpinning(false);
        const color = colorOf(final);
        if (betType === "number" && final === betNumber) {
          setCoins((c) => c + 360);
          setMessage(`🎉 大当たり!${final}(${color === "red" ? "赤" : color === "black" ? "黒" : "緑"}) +360コイン`);
        } else if (betType !== "number" && color === betType) {
          setCoins((c) => c + 20);
          setMessage(`当たり!${final}は${betType === "red" ? "赤" : "黒"} +20コイン`);
        } else {
          setMessage(`はずれ: ${final}(${color === "red" ? "赤" : color === "black" ? "黒" : "緑"})`);
        }
      }
    }, 60);
  }

  return (
    <div className="space-y-4">
      <div className="tool-panel px-4 py-2 text-center">
        <div className="text-xs text-slate-500">コイン(仮想)</div>
        <div className="text-xl font-bold text-indigo-600">{coins}</div>
      </div>
      <div
        className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold text-white ${
          result === null
            ? "bg-slate-400"
            : colorOf(result) === "red"
              ? "bg-red-600"
              : colorOf(result) === "black"
                ? "bg-slate-900"
                : "bg-green-600"
        }`}
      >
        {result ?? "?"}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex gap-2">
          {(["number", "red", "black"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setBetType(t)}
              className={betType === t ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white" : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"}
            >
              {t === "number" ? "数字" : t === "red" ? "赤" : "黒"}
            </button>
          ))}
        </div>
        {betType === "number" && (
          <input
            type="number"
            min={0}
            max={36}
            className="tool-input w-20"
            value={betNumber}
            onChange={(e) => setBetNumber(Math.min(36, Math.max(0, Number(e.target.value) || 0)))}
          />
        )}
      </div>
      <div className="text-center">
        <button type="button" className="btn" onClick={spin} disabled={spinning || coins < 10}>
          {spinning ? "回転中..." : "スピン(-10コイン)"}
        </button>
      </div>
      {message && <p className="text-center font-bold text-indigo-600">{message}</p>}
      <p className="text-center text-xs text-slate-400">※ 仮想コインのみを使用する、実際の金銭を伴わないゲームです。</p>
    </div>
  );
}
