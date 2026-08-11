"use client";

import { useEffect, useState } from "react";
import { generateSequencePuzzle, type SequencePuzzle } from "@/lib/game/numberSequence";

export default function NumberSequenceGame() {
  const [puzzle, setPuzzle] = useState<SequencePuzzle | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  function next() {
    setPuzzle(generateSequencePuzzle());
    setFeedback(null);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    next();
  }, []);

  function handleChoice(choice: number) {
    if (!puzzle || feedback) return;
    if (choice === puzzle.answer) {
      setScore((s) => s + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }
  }

  function handleNextRound() {
    setRound((r) => r + 1);
    next();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-3">
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">ラウンド</div>
          <div className="text-xl font-bold text-indigo-600">{round}</div>
        </div>
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">スコア</div>
          <div className="text-xl font-bold text-indigo-600">{score}</div>
        </div>
      </div>

      {puzzle && (
        <div className="tool-panel text-center">
          <p className="text-sm text-slate-500">次に来る数字は?</p>
          <p className="mt-2 text-3xl font-bold text-slate-800">{puzzle.sequence.join(", ")}, ?</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {puzzle?.choices.map((choice) => (
          <button
            key={choice}
            type="button"
            onClick={() => handleChoice(choice)}
            disabled={feedback !== null}
            className={`rounded-lg border px-4 py-3 text-xl font-bold ${
              feedback && choice === puzzle.answer
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-slate-300 bg-white hover:bg-slate-50"
            }`}
          >
            {choice}
          </button>
        ))}
      </div>

      {feedback && (
        <div className="text-center">
          <p className={`text-lg font-bold ${feedback === "correct" ? "text-green-600" : "text-red-600"}`}>
            {feedback === "correct" ? "正解!🎉" : `不正解...正解は ${puzzle?.answer} でした`}
          </p>
          <button type="button" className="btn mt-2" onClick={handleNextRound}>
            次の問題
          </button>
        </div>
      )}
    </div>
  );
}
