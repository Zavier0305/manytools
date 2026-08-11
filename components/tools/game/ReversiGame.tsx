"use client";

import { useEffect, useMemo, useState } from "react";
import {
  applyMove,
  chooseCpuMove,
  countStones,
  createInitialBoard,
  getLegalMoves,
  type Cell,
  type ReversiBoard,
} from "@/lib/game/reversi";

export default function ReversiGame() {
  const [board, setBoard] = useState<ReversiBoard>(() => createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Cell>(1);
  const [gameOver, setGameOver] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [passMessage, setPassMessage] = useState<string | null>(null);

  const legalMoves = useMemo(
    () => (gameOver ? [] : getLegalMoves(board, currentPlayer)),
    [board, currentPlayer, gameOver]
  );
  const legalCells = useMemo(
    () => new Set(legalMoves.map((m) => `${m.row}-${m.col}`)),
    [legalMoves]
  );

  useEffect(() => {
    if (gameOver) return;
    if (legalMoves.length === 0) {
      const opponent: Cell = currentPlayer === 1 ? 2 : 1;
      const opponentMoves = getLegalMoves(board, opponent);
      if (opponentMoves.length === 0) {
        // Turn resolution (pass/game-over/CPU-move) is inherently reactive to board state.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setGameOver(true);
        return;
      }
      setPassMessage(currentPlayer === 1 ? "あなたは打てる場所がないためパスします" : "CPUはパスしました");
      setCurrentPlayer(opponent);
      return;
    }
    setPassMessage(null);

    if (currentPlayer === 2) {
      setThinking(true);
      const timeout = setTimeout(() => {
        const move = chooseCpuMove(getLegalMoves(board, 2));
        setBoard(applyMove(board, move, 2));
        setCurrentPlayer(1);
        setThinking(false);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [board, currentPlayer, gameOver, legalMoves.length]);

  function handleClick(row: number, col: number) {
    if (currentPlayer !== 1 || thinking || gameOver) return;
    const move = legalMoves.find((m) => m.row === row && m.col === col);
    if (!move) return;
    setBoard(applyMove(board, move, 1));
    setCurrentPlayer(2);
  }

  function resetGame() {
    setBoard(createInitialBoard());
    setCurrentPlayer(1);
    setGameOver(false);
    setThinking(false);
    setPassMessage(null);
  }

  const { black, white } = countStones(board);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">あなた(黒)</div>
            <div className="text-xl font-bold text-slate-800">{black}</div>
          </div>
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">CPU(白)</div>
            <div className="text-xl font-bold text-slate-800">{white}</div>
          </div>
        </div>
        <button type="button" className="btn-secondary" onClick={resetGame}>
          新しいゲーム
        </button>
      </div>

      <div className="mx-auto grid w-full max-w-md grid-cols-8 gap-0.5 rounded-lg bg-green-800 p-1">
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              type="button"
              onClick={() => handleClick(r, c)}
              disabled={cell !== 0}
              className="relative flex aspect-square items-center justify-center bg-green-700 hover:bg-green-600 disabled:hover:bg-green-700"
            >
              {legalCells.has(`${r}-${c}`) && currentPlayer === 1 && !thinking && (
                <span className="absolute h-2 w-2 rounded-full bg-green-300/70" />
              )}
              {cell !== 0 && (
                <span
                  className={`h-[80%] w-[80%] rounded-full ${cell === 1 ? "bg-slate-900" : "bg-white"}`}
                />
              )}
            </button>
          ))
        )}
      </div>

      <div className="text-center text-sm text-slate-500">
        {gameOver
          ? black === white
            ? "引き分けです"
            : black > white
              ? "あなたの勝ちです!🎉"
              : "CPUの勝ちです"
          : thinking
            ? "CPU思考中..."
            : passMessage ?? (currentPlayer === 1 ? "あなたの番です(黒)" : "CPUの番です(白)")}
      </div>
    </div>
  );
}
