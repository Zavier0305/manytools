"use client";

import { useEffect, useState } from "react";
import { createBoard, isWon, revealCell, type MineBoard } from "@/lib/game/minesweeper";

export default function MinesweeperGame({ config }: { config?: Record<string, unknown> }) {
  const rows = (config?.rows as number) ?? 9;
  const cols = (config?.cols as number) ?? 9;
  const mines = (config?.mines as number) ?? 10;

  const [board, setBoard] = useState<MineBoard | null>(null);
  const [gameOver, setGameOver] = useState(false);

  function newGame() {
    setBoard(createBoard(rows, cols, mines));
    setGameOver(false);
  }

  useEffect(() => {
    // Mine placement uses randomness, so it runs client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    newGame();
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
        <button type="button" className="btn-secondary" onClick={newGame}>
          リセット
        </button>
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
