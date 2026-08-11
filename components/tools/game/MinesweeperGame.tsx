"use client";

import { useEffect, useState } from "react";
import { createBoard, isWon, revealCell, type MineBoard } from "@/lib/game/minesweeper";

const DIFFICULTY_PRESETS = [
  { rows: 9, cols: 9, mines: 10, label: "初級" },
  { rows: 16, cols: 16, mines: 40, label: "中級" },
  { rows: 16, cols: 30, mines: 99, label: "上級" },
];

export default function MinesweeperGame({ config }: { config?: Record<string, unknown> }) {
  const defaultRows = (config?.rows as number) ?? 9;
  const defaultDifficultyIndex = Math.max(
    0,
    DIFFICULTY_PRESETS.findIndex((p) => p.rows === defaultRows)
  );
  const [difficultyIndex, setDifficultyIndex] = useState(
    defaultDifficultyIndex === -1 ? 0 : defaultDifficultyIndex
  );
  const { cols, mines } = DIFFICULTY_PRESETS[difficultyIndex];

  const [board, setBoard] = useState<MineBoard | null>(null);
  const [gameOver, setGameOver] = useState(false);

  function newGame(nextDifficultyIndex = difficultyIndex) {
    const next = DIFFICULTY_PRESETS[nextDifficultyIndex];
    setDifficultyIndex(nextDifficultyIndex);
    setBoard(createBoard(next.rows, next.cols, next.mines));
    setGameOver(false);
  }

  useEffect(() => {
    // Mine placement uses randomness, so it runs client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    newGame(difficultyIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const won = board ? isWon(board) : false;

  function handleReveal(r: number, c: number) {
    if (!board || gameOver || won) return;
    if (board[r][c].mine) {
      const revealedAll = board.map((row) => row.map((cell) => ({ ...cell, revealed: cell.mine || cell.revealed })));
      setBoard(revealedAll);
      setGameOver(true);
      return;
    }
    setBoard(revealCell(board, r, c));
  }

  function handleFlag(e: React.MouseEvent, r: number, c: number) {
    e.preventDefault();
    if (!board || gameOver || won) return;
    const next = board.map((row) => row.map((cell) => ({ ...cell })));
    if (!next[r][c].revealed) next[r][c].flagged = !next[r][c].flagged;
    setBoard(next);
  }

  const NUMBER_COLORS = ["", "text-blue-600", "text-green-600", "text-red-600", "text-purple-600", "text-amber-600", "text-cyan-600", "text-slate-900", "text-slate-500"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">💣 {mines}個</p>
        <div className="flex items-center gap-2">
          <select
            value={difficultyIndex}
            onChange={(e) => newGame(Number(e.target.value))}
            className="rounded-lg border border-slate-300 px-2 py-2 text-sm"
          >
            {DIFFICULTY_PRESETS.map((p, i) => (
              <option key={p.label} value={i}>
                {p.label}
              </option>
            ))}
          </select>
          <button type="button" className="btn-secondary" onClick={() => newGame()}>
            リセット
          </button>
        </div>
      </div>
      <div
        className="mx-auto grid w-fit gap-0.5 rounded-lg bg-slate-300 p-1"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {board?.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              type="button"
              onClick={() => handleReveal(r, c)}
              onContextMenu={(e) => handleFlag(e, r, c)}
              className={`flex h-7 w-7 items-center justify-center text-xs font-bold ${
                cell.revealed
                  ? cell.mine
                    ? "bg-red-400"
                    : "bg-slate-100"
                  : "bg-slate-400 hover:bg-slate-350"
              } ${cell.adjacent ? NUMBER_COLORS[cell.adjacent] : ""}`}
            >
              {cell.revealed ? (cell.mine ? "💣" : cell.adjacent || "") : cell.flagged ? "🚩" : ""}
            </button>
          ))
        )}
      </div>
      {(gameOver || won) && (
        <div className="tool-panel text-center">
          <p className={`text-xl font-bold ${won ? "text-green-600" : "text-red-600"}`}>
            {won ? "クリア!🎉" : "ゲームオーバー"}
          </p>
        </div>
      )}
      <p className="text-center text-sm text-slate-500">左クリックで開く、右クリックで旗を立てる</p>
    </div>
  );
}
