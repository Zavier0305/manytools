"use client";

import { useEffect, useState } from "react";
import { SUDOKU_SIZE, generatePuzzle, isBoardComplete, type SudokuBoard } from "@/lib/game/miniSudoku";

export default function MiniSudokuGame() {
  const [board, setBoard] = useState<SudokuBoard | null>(null);
  const [givens, setGivens] = useState<boolean[][] | null>(null);
  const [selected, setSelected] = useState<[number, number] | null>(null);

  function newPuzzle() {
    const { puzzle, givens: g } = generatePuzzle(20);
    setBoard(puzzle);
    setGivens(g);
    setSelected(null);
  }

  useEffect(() => {
    // Puzzle generation uses randomness, so it runs client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    newPuzzle();
  }, []);

  const complete = board ? isBoardComplete(board) : false;

  function placeNumber(n: number) {
    if (!board || !givens || !selected || complete) return;
    const [r, c] = selected;
    if (givens[r][c]) return;
    const next = board.map((row) => [...row]);
    next[r][c] = n;
    setBoard(next);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">セルを選んで下の数字をタップして入力します</p>
        <button type="button" className="btn-secondary" onClick={newPuzzle}>
          新しい問題
        </button>
      </div>

      <div
        className="mx-auto grid w-fit gap-0.5 rounded-lg bg-slate-700 p-1"
        style={{ gridTemplateColumns: `repeat(${SUDOKU_SIZE}, minmax(0, 1fr))` }}
      >
        {board?.map((row, r) =>
          row.map((val, c) => {
            const isGiven = givens?.[r][c] ?? false;
            const isSelected = selected?.[0] === r && selected?.[1] === c;
            const thickRight = c === 2;
            const thickBottom = r === 1 || r === 3;
            return (
              <button
                key={`${r}-${c}`}
                type="button"
                onClick={() => !isGiven && setSelected([r, c])}
                disabled={isGiven}
                className={`flex h-10 w-10 items-center justify-center text-lg font-bold ${
                  isGiven ? "bg-slate-200 text-slate-800" : isSelected ? "bg-indigo-200 text-indigo-800" : "bg-white text-indigo-600 hover:bg-indigo-50"
                } ${thickRight ? "border-r-2 border-slate-700" : ""} ${thickBottom ? "border-b-2 border-slate-700" : ""}`}
              >
                {val !== 0 ? val : ""}
              </button>
            );
          })
        )}
      </div>

      <div className="mx-auto flex max-w-xs justify-center gap-2">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => placeNumber(n)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 text-lg font-bold text-white hover:bg-indigo-400"
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          onClick={() => placeNumber(0)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-300 text-sm font-bold text-slate-700 hover:bg-slate-200"
        >
          消
        </button>
      </div>

      {complete && (
        <div className="tool-panel text-center">
          <p className="text-xl font-bold text-indigo-600">クリア!🎉</p>
        </div>
      )}
      <p className="text-center text-sm text-slate-500">
        縦・横・2×3ブロックのいずれにも1〜6が重複しないように埋めましょう
      </p>
    </div>
  );
}
