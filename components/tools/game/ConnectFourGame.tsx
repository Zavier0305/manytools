"use client";

import { useEffect, useState } from "react";
import {
  C4_COLS,
  checkC4Winner,
  chooseC4Move,
  createC4Board,
  dropDisc,
  isC4Full,
  type C4Board,
} from "@/lib/game/connectFour";

export default function ConnectFourGame() {
  const [board, setBoard] = useState<C4Board>(createC4Board());
  const [turn, setTurn] = useState<1 | 2>(1);

  const winner = checkC4Winner(board);
  const full = isC4Full(board);
  const over = winner !== null || full;

  useEffect(() => {
    if (turn !== 2 || over) return;
    const timeout = setTimeout(() => {
      const col = chooseC4Move(board);
      const next = dropDisc(board, col, 2);
      if (next) setBoard(next);
      setTurn(1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [turn, board, over]);

  function handleDrop(col: number) {
    if (turn !== 1 || over) return;
    const next = dropDisc(board, col, 1);
    if (!next) return;
    setBoard(next);
    setTurn(2);
  }

  function reset() {
    setBoard(createC4Board());
    setTurn(1);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button type="button" className="btn-secondary" onClick={reset}>
          リセット
        </button>
      </div>
      <div className="mx-auto grid w-full max-w-md grid-cols-7 gap-1 rounded-xl bg-blue-700 p-2">
        {Array.from({ length: C4_COLS }, (_, c) => (
          <button
            key={c}
            type="button"
            onClick={() => handleDrop(c)}
            disabled={over}
            className="text-xs text-blue-200 hover:text-white"
          >
            ▼
          </button>
        ))}
        {board.flat().map((cell, i) => (
          <div key={i} className="flex aspect-square items-center justify-center rounded-full bg-blue-800 p-1">
            <div
              className={`h-full w-full rounded-full ${
                cell === 1 ? "bg-yellow-400" : cell === 2 ? "bg-red-500" : "bg-blue-900"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-slate-500">
        {winner === 1 ? "あなたの勝ちです!🎉" : winner === 2 ? "CPUの勝ちです" : full ? "引き分けです" : turn === 1 ? "あなたの番です(黄色)" : "CPU思考中..."}
      </div>
    </div>
  );
}
