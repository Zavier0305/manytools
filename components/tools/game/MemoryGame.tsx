"use client";

import { useEffect, useRef, useState } from "react";
import { MEMORY_THEMES, createShuffledCards, type MemoryCard } from "@/lib/game/memory";

const THEME_IDS = Object.keys(MEMORY_THEMES);

export default function MemoryGame({ config }: { config?: Record<string, unknown> }) {
  const defaultTheme = (config?.theme as string) ?? "fruits";
  const [theme, setTheme] = useState(defaultTheme);
  const [cards, setCards] = useState<MemoryCard[] | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const lockRef = useRef(false);

  function newGame(themeId: string) {
    setCards(createShuffledCards(themeId));
    setSelected([]);
    setMoves(0);
    setSeconds(0);
    lockRef.current = false;
  }

  function backToThemeSelect() {
    setCards(null);
  }

  const won = cards?.every((c) => c.matched) ?? false;

  useEffect(() => {
    if (!cards || won) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [cards, won]);

  function handleFlip(id: number) {
    if (lockRef.current || !cards) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const nextSelected = [...selected, id];
    setCards((prev) => prev!.map((c) => (c.id === id ? { ...c, flipped: true } : c)));

    if (nextSelected.length < 2) {
      setSelected(nextSelected);
      return;
    }

    lockRef.current = true;
    setMoves((m) => m + 1);
    const [firstId, secondId] = nextSelected;
    const first = cards.find((c) => c.id === firstId)!;

    if (first.emoji === card.emoji) {
      setTimeout(() => {
        setCards((prev) =>
          prev!.map((c) => (c.id === firstId || c.id === secondId ? { ...c, matched: true } : c))
        );
        setSelected([]);
        lockRef.current = false;
      }, 300);
    } else {
      setTimeout(() => {
        setCards((prev) =>
          prev!.map((c) => (c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c))
        );
        setSelected([]);
        lockRef.current = false;
      }, 800);
    }
  }

  if (!cards) {
    return (
      <div className="tool-panel space-y-4 text-center">
        <div className="text-left">
          <label className="mb-1 block text-sm text-slate-500">テーマを選択</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {THEME_IDS.map((id) => (
              <option key={id} value={id}>
                {MEMORY_THEMES[id].name}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="btn" onClick={() => newGame(theme)}>
          スタート
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">手数</div>
            <div className="text-xl font-bold text-indigo-600">{moves}</div>
          </div>
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">経過時間</div>
            <div className="text-xl font-bold text-indigo-600">{seconds}秒</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn-secondary" onClick={() => newGame(theme)}>
            リセット
          </button>
          <button type="button" className="btn-secondary" onClick={backToThemeSelect}>
            テーマを変える
          </button>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-md grid-cols-4 gap-2">
        {cards?.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => handleFlip(card.id)}
            disabled={card.flipped || card.matched}
            className={`flex aspect-square items-center justify-center rounded-lg text-3xl transition ${
              card.matched
                ? "bg-green-100"
                : card.flipped
                  ? "bg-white border-2 border-indigo-400"
                  : "bg-indigo-500 hover:bg-indigo-400"
            }`}
          >
            {card.flipped || card.matched ? card.emoji : ""}
          </button>
        ))}
      </div>

      {won && (
        <div className="tool-panel text-center">
          <p className="text-xl font-bold text-indigo-600">クリア!🎉</p>
          <p className="mt-1 text-sm text-slate-500">
            {moves}手・{seconds}秒でそろえました
          </p>
        </div>
      )}
    </div>
  );
}
