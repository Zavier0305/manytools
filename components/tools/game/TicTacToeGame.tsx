"use client";

import { useEffect, useState } from "react";
import { checkWinner, chooseTTTMove, isDraw, type TTTBoard } from "@/lib/game/tictactoe";

export default function TicTacToeGame({ config }: { config?: Record<string, unknown> }) {
  const difficulty = (config?.difficulty as "easy" | "hard") ?? "hard";
  const [board, setBoard] = useState<TTTBoard>(Array(9).fill(0));
  const [turn, setTurn] = useState<1 | 2>(1);
  const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });

  const winner = checkWinner(board);
  const draw = isDraw(board);
  const over = winner !== null || draw;

  useEffect(() => {
    if (turn !== 2 || over) return;
    const timeout = setTimeout(() => {
      const move = chooseTTTMove(board, difficulty);
      const next = [...board];
      next[move] = 2;
      setBoard(next);
      setTurn(1);
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, board, over]);

  useEffect(() => {
    // Tallying the round result is a reaction to the game ending, not render-time state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (winner === 1) setScore((s) => ({ ...s, win: s.win + 1 }));
    else if (winner === 2) setScore((s) => ({ ...s, lose: s.lose + 1 }));
    else if (draw) setScore((s) => ({ ...s, draw: s.draw + 1 }));
  }, [winner, draw]);

  function handleClick(i: number) {
    if (board[i] !== 0 || turn !== 1 || over) return;
    const next = [...board];
    next[i] = 1;
    setBoard(next);
    setTurn(2);
  }

  function reset() {
    setBoard(Array(9).fill(0));
    setTurn(1);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-sm text-slate-500">
          <span>勝ち: {score.win}</span>
          <span>負け: {score.lose}</span>
          <span>引き分け: {score.draw}</span>
        </div>
        <button type="button" className="btn-secondary" onClick={reset}>
          リセット
        </button>
      </div>
      <div className="mx-auto grid w-64 grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(i)}
            disabled={cell !== 0 || over || turn !== 1}
            className="flex aspect-square items-center justify-center rounded-lg bg-slate-100 text-4xl font-bold hover:bg-slate-200"
          >
            {cell === 1 ? <span className="text-indigo-600">✕</span> : cell === 2 ? <span className="text-rose-500">◯</span> : ""}
          </button>
        ))}
      </div>
      <div className="text-center text-sm text-slate-500">
        {winner === 1 ? "あなたの勝ちです!🎉" : winner === 2 ? "CPUの勝ちです" : draw ? "引き分けです" : turn === 1 ? "あなたの番です(✕)" : "CPU思考中..."}
      </div>
    </div>
  );
}
