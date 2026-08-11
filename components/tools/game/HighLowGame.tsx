"use client";

import { useEffect, useState } from "react";
import { cardLabel, createDeck, shuffleDeck, type PlayingCard } from "@/lib/game/cards";

export default function HighLowGame() {
  const [deck, setDeck] = useState<PlayingCard[]>([]);
  const [current, setCurrent] = useState<PlayingCard | null>(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  function start() {
    const fresh = shuffleDeck(createDeck());
    setCurrent(fresh[0]);
    setDeck(fresh.slice(1));
    setStreak(0);
    setMessage(null);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    start();
  }, []);

  function guess(direction: "high" | "low") {
    if (!current || deck.length === 0) return;
    const next = deck[0];
    const correct =
      (direction === "high" && next.rank >= current.rank) || (direction === "low" && next.rank <= current.rank);
    setCurrent(next);
    setDeck(deck.slice(1));
    if (correct) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setBest((b) => Math.max(b, nextStreak));
      setMessage("正解!");
    } else {
      setStreak(0);
      setMessage("はずれ...連続記録リセット");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-3">
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">連続正解</div>
          <div className="text-xl font-bold text-indigo-600">{streak}</div>
        </div>
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">ベスト</div>
          <div className="text-xl font-bold text-indigo-600">{best}</div>
        </div>
      </div>

      <div className="tool-panel flex flex-col items-center gap-3">
        <div className="flex h-32 w-24 items-center justify-center rounded-xl border-2 border-slate-300 text-3xl font-bold">
          {current ? cardLabel(current) : "-"}
        </div>
        {message && <p className="text-sm text-slate-500">{message}</p>}
      </div>

      {deck.length > 0 ? (
        <div className="flex justify-center gap-3">
          <button type="button" className="btn" onClick={() => guess("high")}>
            次はハイ(高い)
          </button>
          <button type="button" className="btn" onClick={() => guess("low")}>
            次はロー(低い)
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-2 text-slate-600">デッキを使い切りました</p>
          <button type="button" className="btn" onClick={start}>
            もう一度
          </button>
        </div>
      )}
      <div className="text-center">
        <button type="button" className="btn-secondary" onClick={start}>
          リセット
        </button>
      </div>
    </div>
  );
}
