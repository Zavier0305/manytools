"use client";

import { useMemo, useState } from "react";
import { QUIZ_TOPICS } from "@/lib/game/quizData";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizGame({ config }: { config?: Record<string, unknown> }) {
  const topicId = (config?.topicId as string) ?? Object.keys(QUIZ_TOPICS)[0];
  const topic = QUIZ_TOPICS[topicId];

  const [order, setOrder] = useState<number[] | null>(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const questions = topic.questions;

  function start() {
    setOrder(shuffle(questions.map((_, i) => i)));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  const currentQuestion = useMemo(() => {
    if (!order) return null;
    return questions[order[index]];
  }, [order, index, questions]);

  function handleSelect(choiceIndex: number) {
    if (selected !== null || !currentQuestion) return;
    setSelected(choiceIndex);
    if (choiceIndex === currentQuestion.answer) setScore((s) => s + 1);
  }

  function next() {
    if (!order) return;
    if (index + 1 >= order.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  if (!order) {
    return (
      <div className="tool-panel space-y-3 text-center">
        <p className="text-slate-600">{topic.name}(全{questions.length}問)</p>
        <button type="button" className="btn" onClick={start}>
          スタート
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="tool-panel space-y-3 text-center">
        <p className="text-2xl font-bold text-indigo-600">
          {score} / {questions.length} 問正解!
        </p>
        <button type="button" className="btn" onClick={start}>
          もう一度
        </button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>
          第{index + 1}問 / {questions.length}問
        </span>
        <span>正解数: {score}</span>
      </div>
      <div className="tool-panel">
        <p className="text-lg font-semibold text-slate-800">{currentQuestion.q}</p>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {currentQuestion.choices.map((choice, i) => {
          const isCorrect = i === currentQuestion.answer;
          const isSelected = i === selected;
          let style = "border border-slate-300 bg-white hover:bg-slate-50";
          if (selected !== null) {
            if (isCorrect) style = "border border-green-500 bg-green-50 text-green-700";
            else if (isSelected) style = "border border-red-500 bg-red-50 text-red-700";
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`rounded-lg px-4 py-3 text-left text-sm font-medium ${style}`}
            >
              {choice}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <button type="button" className="btn" onClick={next}>
          {index + 1 >= questions.length ? "結果を見る" : "次の問題"}
        </button>
      )}
    </div>
  );
}
