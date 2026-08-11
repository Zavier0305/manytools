"use client";

import { useEffect, useState } from "react";
import { SOKOBAN_LEVELS, isSolved, move, parseLevel, type SokobanPuzzle, type SokobanState } from "@/lib/game/sokoban";

const FIRST_LEVEL = parseLevel(SOKOBAN_LEVELS[0]);

export default function SokobanGame() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [puzzle, setPuzzle] = useState<SokobanPuzzle>(FIRST_LEVEL.puzzle);
  const [state, setState] = useState<SokobanState>(FIRST_LEVEL.initial);
  const [moves, setMoves] = useState(0);

  function loadLevel(index: number) {
    const { puzzle: p, initial } = parseLevel(SOKOBAN_LEVELS[index]);
    setLevelIndex(index);
    setPuzzle(p);
    setState(initial);
    setMoves(0);
  }

  const solved = isSolved(puzzle, state);

  useEffect(() => {
    if (solved) return;
    function handleKey(e: KeyboardEvent) {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
      e.preventDefault();
      setState((prev) => {
        const next = move(puzzle, prev, e.key);
        if (next !== prev) setMoves((m) => m + 1);
        return next;
      });
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [puzzle, solved]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-3">
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">レベル</div>
            <div className="text-xl font-bold text-indigo-600">{levelIndex + 1}</div>
          </div>
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">手数</div>
            <div className="text-xl font-bold text-indigo-600">{moves}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={levelIndex}
            onChange={(e) => loadLevel(Number(e.target.value))}
            className="rounded-lg border border-slate-300 px-2 py-2 text-sm"
          >
            {SOKOBAN_LEVELS.map((_, i) => (
              <option key={i} value={i}>
                レベル{i + 1}
              </option>
            ))}
          </select>
          <button type="button" className="btn-secondary" onClick={() => loadLevel(levelIndex)}>
            やり直す
          </button>
        </div>
      </div>

      {puzzle && state && (
        <div
          className="relative mx-auto grid w-fit gap-0.5 rounded-lg bg-slate-700 p-1"
          style={{ gridTemplateColumns: `repeat(${puzzle.cols}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: puzzle.rows }, (_, r) =>
            Array.from({ length: puzzle.cols }, (_, c) => {
              const k = `${r}-${c}`;
              const isWall = puzzle.walls.has(k);
              const isTarget = puzzle.targets.has(k);
              const isBox = state.boxes.has(k);
              const isPlayer = state.player[0] === r && state.player[1] === c;
              const boxDone = isBox && isTarget;
              return (
                <div
                  key={k}
                  className={`flex h-9 w-9 items-center justify-center text-lg ${
                    isWall ? "bg-slate-900" : isTarget ? "bg-amber-100" : "bg-slate-100"
                  }`}
                >
                  {isPlayer ? "🧑" : isBox ? (boxDone ? "✅" : "📦") : isTarget ? "🎯" : ""}
                </div>
              );
            })
          )}
        </div>
      )}

      {solved && (
        <div className="tool-panel text-center">
          <p className="text-xl font-bold text-indigo-600">クリア!🎉({moves}手)</p>
          {levelIndex < SOKOBAN_LEVELS.length - 1 && (
            <button type="button" className="btn mt-2" onClick={() => loadLevel(levelIndex + 1)}>
              次のレベルへ
            </button>
          )}
        </div>
      )}
      <p className="text-center text-sm text-slate-500">矢印キーで移動し、📦を🎯まで押して運びましょう</p>
    </div>
  );
}
