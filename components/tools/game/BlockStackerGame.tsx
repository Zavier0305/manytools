"use client";

import { useEffect, useState } from "react";
import {
  COLS,
  ROWS,
  canPlace,
  clearLines,
  createEmptyBoard,
  createPiece,
  mergePiece,
  randomPieceId,
  type Piece,
  type StackerBoard,
} from "@/lib/game/blockStacker";

const DROP_INTERVAL_MS = 650;

const CELL_COLORS: Record<number, string> = {
  0: "bg-slate-800",
  1: "bg-cyan-400",
  2: "bg-yellow-400",
  3: "bg-purple-400",
  4: "bg-green-400",
  5: "bg-red-400",
  6: "bg-blue-500",
  7: "bg-orange-400",
};

interface GameState {
  board: StackerBoard;
  piece: Piece;
  nextId: string;
  score: number;
  lines: number;
  over: boolean;
}

function lockAndSpawn(prev: GameState): GameState {
  const merged = mergePiece(prev.board, prev.piece);
  const { board: clearedBoard, cleared } = clearLines(merged);
  const scoreGain = [0, 100, 300, 500, 800][cleared] ?? cleared * 200;
  const newPiece = createPiece(prev.nextId);
  const over = !canPlace(clearedBoard, newPiece);
  return {
    board: clearedBoard,
    piece: newPiece,
    nextId: randomPieceId(),
    score: prev.score + scoreGain,
    lines: prev.lines + cleared,
    over,
  };
}

export default function BlockStackerGame() {
  const [state, setState] = useState<GameState | null>(null);

  function start() {
    const firstId = randomPieceId();
    setState({
      board: createEmptyBoard(),
      piece: createPiece(firstId),
      nextId: randomPieceId(),
      score: 0,
      lines: 0,
      over: false,
    });
  }

  function step(soft: boolean) {
    setState((prev) => {
      if (!prev || prev.over) return prev;
      if (canPlace(prev.board, prev.piece, 1, 0)) {
        return { ...prev, piece: { ...prev.piece, row: prev.piece.row + 1 }, score: prev.score + (soft ? 1 : 0) };
      }
      return lockAndSpawn(prev);
    });
  }

  function move(dCol: number) {
    setState((prev) => {
      if (!prev || prev.over) return prev;
      if (!canPlace(prev.board, prev.piece, 0, dCol)) return prev;
      return { ...prev, piece: { ...prev.piece, col: prev.piece.col + dCol } };
    });
  }

  function rotatePiece() {
    setState((prev) => {
      if (!prev || prev.over) return prev;
      const nextRotation = prev.piece.rotation + 1;
      if (!canPlace(prev.board, prev.piece, 0, 0, nextRotation)) return prev;
      return { ...prev, piece: { ...prev.piece, rotation: nextRotation } };
    });
  }

  function hardDrop() {
    setState((prev) => {
      if (!prev || prev.over) return prev;
      let dropped = prev.piece;
      let distance = 0;
      while (canPlace(prev.board, dropped, 1, 0)) {
        dropped = { ...dropped, row: dropped.row + 1 };
        distance++;
      }
      return lockAndSpawn({ ...prev, piece: dropped, score: prev.score + distance * 2 });
    });
  }

  const playing = !!state && !state.over;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => step(false), DROP_INTERVAL_MS);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        move(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        move(1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        step(true);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        rotatePiece();
      } else if (e.key === " ") {
        e.preventDefault();
        hardDrop();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playing]);

  const displayBoard = state ? mergePiece(state.board, state.piece) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">スコア</div>
            <div className="text-xl font-bold text-indigo-600">{state?.score ?? 0}</div>
          </div>
          <div className="tool-panel px-4 py-2 text-center">
            <div className="text-xs text-slate-500">ライン</div>
            <div className="text-xl font-bold text-indigo-600">{state?.lines ?? 0}</div>
          </div>
        </div>
        <button type="button" className="btn-secondary" onClick={start}>
          {state ? "リセット" : "スタート"}
        </button>
      </div>

      <div className="relative mx-auto w-fit rounded-xl bg-slate-900 p-2">
        <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
          {(displayBoard ?? Array.from({ length: ROWS }, () => Array(COLS).fill(0))).map((row, r) =>
            row.map((cell, c) => <div key={`${r}-${c}`} className={`h-5 w-5 rounded-sm ${CELL_COLORS[cell]}`} />)
          )}
        </div>
        {!playing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-black/70 text-center text-white">
            <p className="text-xl font-bold">
              {!state ? "落ちものブロックパズル" : `ゲームオーバー(スコア ${state.score})`}
            </p>
            <button type="button" className="btn" onClick={start}>
              {!state ? "スタート" : "もう一度"}
            </button>
          </div>
        )}
      </div>

      <div className="mx-auto grid max-w-xs grid-cols-3 gap-2 sm:hidden">
        <button type="button" className="btn-secondary" onClick={() => move(-1)}>
          ←
        </button>
        <button type="button" className="btn-secondary" onClick={rotatePiece}>
          回転
        </button>
        <button type="button" className="btn-secondary" onClick={() => move(1)}>
          →
        </button>
        <button type="button" className="btn-secondary col-span-1" onClick={() => step(true)}>
          ↓
        </button>
        <button type="button" className="btn-secondary col-span-2" onClick={hardDrop}>
          ハードドロップ
        </button>
      </div>

      <p className="text-center text-sm text-slate-500">
        矢印キーで移動・回転、スペースキーでハードドロップ(スマホは下のボタンを使用)
      </p>
    </div>
  );
}
