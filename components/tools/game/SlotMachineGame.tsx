"use client";

import { useState } from "react";

const SYMBOLS = ["🍒", "🍋", "🍇", "🔔", "⭐", "7️⃣"];

export default function SlotMachineGame() {
  const [reels, setReels] = useState(["🍒", "🍋", "🍇"]);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [coins, setCoins] = useState(100);

  function spin() {
    if (spinning || coins < 10) return;
    setSpinning(true);
    setMessage(null);
    setCoins((c) => c - 10);

    let ticks = 0;
    const id = setInterval(() => {
      setReels([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ]);
      ticks++;
      if (ticks > 15) {
        clearInterval(id);
        const final = [
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ];
        setReels(final);
        setSpinning(false);
        if (final[0] === final[1] && final[1] === final[2]) {
          const win = final[0] === "7️⃣" ? 200 : 50;
          setCoins((c) => c + win);
          setMessage(`🎉 大当たり!+${win}コイン`);
        } else if (final[0] === final[1] || final[1] === final[2] || final[0] === final[2]) {
          setCoins((c) => c + 15);
          setMessage("2つ揃い!+15コイン");
        } else {
          setMessage("残念、はずれ");
        }
      }
    }, 80);
  }

  return (
    <div className="space-y-4">
      <div className="tool-panel px-4 py-2 text-center">
        <div className="text-xs text-slate-500">コイン(仮想)</div>
        <div className="text-xl font-bold text-indigo-600">{coins}</div>
      </div>
      <div className="mx-auto flex w-fit gap-2 rounded-xl bg-slate-800 p-4">
        {reels.map((s, i) => (
          <div key={i} className="flex h-20 w-20 items-center justify-center rounded-lg bg-white text-4xl">
            {s}
          </div>
        ))}
      </div>
      <div className="text-center">
        <button type="button" className="btn" onClick={spin} disabled={spinning || coins < 10}>
          {spinning ? "回転中..." : "スピン(-10コイン)"}
        </button>
      </div>
      {message && <p className="text-center text-lg font-bold text-indigo-600">{message}</p>}
      {coins < 10 && !spinning && (
        <div className="text-center">
          <button type="button" className="btn-secondary" onClick={() => setCoins(100)}>
            コインをリセット
          </button>
        </div>
      )}
      <p className="text-center text-xs text-slate-400">※ 仮想コインのみを使用する、実際の金銭を伴わないゲームです。</p>
    </div>
  );
}
