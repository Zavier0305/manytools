"use client";

import { useEffect, useState } from "react";
import { isCleared, scrambleBoard, toggleCell, type LightsOutBoard } from "@/lib/game/lightsOut";

const SIZE = 5;
const SCRAMBLE_CLICKS = 15;

export default function LightsOutGame() {
  const [board, setBoard] = useState<LightsOutBoard | null>(null);
  const [moves, setMoves] = useState(0);

  function newPuzzle() {
    setBoard(scrambleBoard(SIZE, SCRAMBLE_CLICKS));
    setMoves(0);
  }

  useEffect(() => {
    // Scrambling requires randomness, so the first puzzle is generated client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    newPuzzle();
  }, []);

  const cleared = board ? isCleared(board) : false;

  function handleClick(row: number, col: number) {
    if (!board || cleared) return;
    setBoard(toggleCell(board, row, col));
    setMoves((m) => m + 1);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">クリック数</div>
          <div className="text-xl font-bold text-indigo-600">{moves}</div>
        </div>
        <button type="button" className="btn-secondary" onClick={newPuzzle}>
          新しいパズル
        </button>
      </div>

      <div
        className="mx-auto grid w-fit gap-1 rounded-xl bg-slate-800 p-2"
        style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}
      >
        {board?.map((row, r) =>
          row.map((lit, c) => (
            <button
              key={`${r}-${c}`}
              type="button"
              onClick={() => handleClick(r, c)}
              className={`h-12 w-12 rounded-md transition ${
                lit ? "bg-amber-300 shadow-[0_0_12px_2px_rgba(252,211,77,0.7)]" : "bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))
        )}
      </div>

      {cleared && (
        <div className="tool-panel text-center">
          <p className="text-xl font-bold text-indigo-600">クリア!🎉({moves}手)</p>
        </div>
      )}
      <p className="text-center text-sm text-slate-500">
        クリックしたマスとその上下左右のライトが切り替わります。全て消灯させればクリアです。
      </p>
    </div>
  );
}
