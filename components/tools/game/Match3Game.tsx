"use client";

import { useEffect, useState } from "react";
import {
  createBoard,
  findMatches,
  isAdjacent,
  resolveBoard,
  swapCells,
  type Match3Board,
} from "@/lib/game/match3";

const SIZE = 6;

const GEM_STYLES = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
];

export default function Match3Game() {
  const [board, setBoard] = useState<Match3Board | null>(null);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  function newGame() {
    setBoard(createBoard(SIZE));
    setSelected(null);
    setScore(0);
    setMessage(null);
  }

  useEffect(() => {
    // Board generation uses randomness, so it runs client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    newGame();
  }, []);

  function handleClick(r: number, c: number) {
    if (!board) return;
    if (!selected) {
      setSelected([r, c]);
      return;
    }
    if (selected[0] === r && selected[1] === c) {
      setSelected(null);
      return;
    }
    if (!isAdjacent(selected, [r, c])) {
      setSelected([r, c]);
      return;
    }

    const swapped = swapCells(board, selected, [r, c]);
    const matched = findMatches(swapped);
    if (matched.size === 0) {
      setMessage("そこは揃いません");
      setSelected(null);
      setTimeout(() => setMessage(null), 800);
      return;
    }

    const { board: resolved, cleared } = resolveBoard(swapped);
    setBoard(resolved);
    setScore((s) => s + cleared * 10);
    setSelected(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">スコア</div>
          <div className="text-xl font-bold text-indigo-600">{score}</div>
        </div>
        <button type="button" className="btn-secondary" onClick={newGame}>
          シャッフル
        </button>
      </div>

      <div
        className="mx-auto grid w-fit gap-1 rounded-xl bg-slate-200 p-2"
        style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}
      >
        {board?.map((row, r) =>
          row.map((color, c) => {
            const isSelected = selected?.[0] === r && selected?.[1] === c;
            return (
              <button
                key={`${r}-${c}`}
                type="button"
                onClick={() => handleClick(r, c)}
                className={`h-10 w-10 rounded-full transition ${GEM_STYLES[color]} ${
                  isSelected ? "ring-4 ring-indigo-500 scale-90" : "hover:scale-105"
                }`}
              />
            );
          })
        )}
      </div>

      {message && <p className="text-center text-sm text-rose-500">{message}</p>}
      <p className="text-center text-sm text-slate-500">
        隣り合う宝石をクリックしてスワップし、3つ以上同じ色を並べて消しましょう
      </p>
    </div>
  );
}
