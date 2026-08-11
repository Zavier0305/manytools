"use client";

import { useEffect, useRef, useState } from "react";
import {
  addRandomTile,
  createInitialBoard,
  hasWon,
  isGameOver,
  move,
  type Board,
  type Direction,
} from "@/lib/game/game2048";

const TILE_COLORS: Record<number, string> = {
  2: "bg-slate-100 text-slate-700",
  4: "bg-slate-200 text-slate-700",
  8: "bg-orange-200 text-orange-900",
  16: "bg-orange-300 text-orange-900",
  32: "bg-orange-400 text-white",
  64: "bg-orange-500 text-white",
  128: "bg-amber-400 text-white",
  256: "bg-amber-500 text-white",
  512: "bg-amber-600 text-white",
  1024: "bg-yellow-500 text-white",
  2048: "bg-yellow-600 text-white",
};

interface GameState {
  board: Board | null;
  score: number;
  best: number;
  gameOver: boolean;
  won: boolean;
  keepPlaying: boolean;
}

const INITIAL_STATE: GameState = {
  board: null,
  score: 0,
  best: 0,
  gameOver: false,
  won: false,
  keepPlaying: false,
};

const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

export default function Game2048({ config }: { config?: Record<string, unknown> }) {
  const size = (config?.size as number) ?? 4;
  const target = (config?.target as number) ?? 2048;
  const storageKey = `game2048-best-${(config?.variantId as string) ?? "default"}`;

  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  });

  useEffect(() => {
    const savedBest = Number(localStorage.getItem(storageKey) ?? 0);
    // Initial board/best score require the browser (randomness + localStorage), so this
    // client-only setup happens once after mount rather than during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState((s) => ({ ...s, board: createInitialBoard(size), best: savedBest }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const direction = KEY_TO_DIRECTION[e.key];
      if (!direction) return;
      const current = stateRef.current;
      if (!current.board || (current.gameOver && !current.keepPlaying)) return;
      e.preventDefault();

      const result = move(current.board, direction);
      if (!result.moved) return;
      const nextBoard = addRandomTile(result.board);
      const nextScore = current.score + result.scoreGained;
      const nextBest = Math.max(current.best, nextScore);
      const won = current.won || hasWon(nextBoard, target);
      const over = isGameOver(nextBoard);

      localStorage.setItem(storageKey, String(nextBest));
      setState({
        board: nextBoard,
        score: nextScore,
        best: nextBest,
        gameOver: over,
        won,
        keepPlaying: current.keepPlaying,
      });
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function newGame() {
    const best = state.best;
    setState({ ...INITIAL_STATE, best, board: createInitialBoard(size) });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">スコア</div>
            <div className="text-xl font-bold text-indigo-600">{state.score}</div>
          </div>
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">ベスト</div>
            <div className="text-xl font-bold text-indigo-600">{state.best}</div>
          </div>
        </div>
        <button type="button" className="btn-secondary" onClick={newGame}>
          新しいゲーム
        </button>
      </div>

      <div className="relative mx-auto w-full max-w-sm rounded-xl bg-slate-300 p-2">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
          {state.board
            ? state.board.flat().map((value, i) => (
                <div
                  key={i}
                  className={`flex aspect-square items-center justify-center rounded-lg text-xl font-bold ${
                    value ? TILE_COLORS[value] ?? "bg-yellow-700 text-white" : "bg-slate-200/60"
                  }`}
                >
                  {value || ""}
                </div>
              ))
            : Array.from({ length: size * size }, (_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-slate-200/60" />
              ))}
        </div>

        {(state.gameOver || (state.won && !state.keepPlaying)) && state.board && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-white/85 text-center">
            <p className="text-2xl font-bold text-slate-800">
              {state.won && !state.gameOver ? `${target}達成!🎉` : "ゲームオーバー"}
            </p>
            <div className="flex gap-2">
              {state.won && !state.gameOver && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setState((s) => ({ ...s, keepPlaying: true }))}
                >
                  続ける
                </button>
              )}
              <button type="button" className="btn" onClick={newGame}>
                もう一度
              </button>
            </div>
          </div>
        )}
      </div>
      <p className="text-center text-sm text-slate-500">矢印キーでタイルを操作します</p>
    </div>
  );
}
