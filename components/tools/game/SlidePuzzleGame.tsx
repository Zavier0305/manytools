"use client";

import { useEffect, useState } from "react";
import { canSlide, isSolved, shufflePuzzle } from "@/lib/game/slidePuzzle";

export default function SlidePuzzleGame({ config }: { config?: Record<string, unknown> }) {
  const size = (config?.size as number) ?? 4;
  const [tiles, setTiles] = useState<number[] | null>(null);
  const [moves, setMoves] = useState(0);

  function newGame() {
    setTiles(shufflePuzzle(size));
    setMoves(0);
  }

  useEffect(() => {
    // Shuffling requires randomness, so it runs client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    newGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const solved = tiles ? isSolved(tiles) : false;

  function handleClick(index: number) {
    if (!tiles || solved) return;
    const blankIndex = tiles.indexOf(0);
    if (!canSlide(index, blankIndex, size)) return;
    const next = [...tiles];
    [next[index], next[blankIndex]] = [next[blankIndex], next[index]];
    setTiles(next);
    setMoves((m) => m + 1);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">手数</div>
          <div className="text-xl font-bold text-indigo-600">{moves}</div>
        </div>
        <button type="button" className="btn-secondary" onClick={newGame}>
          リセット
        </button>
      </div>
      <div
        className="relative mx-auto grid max-w-sm gap-1 rounded-xl bg-slate-300 p-1"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {tiles?.map((tile, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(i)}
            className={`flex aspect-square items-center justify-center rounded-lg text-xl font-bold ${
              tile === 0 ? "bg-transparent" : "bg-white text-slate-800 hover:bg-indigo-50"
            }`}
          >
            {tile !== 0 ? tile : ""}
          </button>
        ))}
      </div>
      {solved && (
        <div className="tool-panel text-center">
          <p className="text-xl font-bold text-indigo-600">クリア!🎉({moves}手)</p>
        </div>
      )}
    </div>
  );
}
