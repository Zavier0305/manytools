"use client";

import { useState } from "react";
import { WORD_CATEGORIES } from "@/lib/game/wordCategories";

const KEYBOARD_ROWS = [
  Array.from("あいうえお"),
  Array.from("かきくけこ"),
  Array.from("さしすせそ"),
  Array.from("たちつてと"),
  Array.from("なにぬねの"),
  Array.from("はひふへほ"),
  Array.from("まみむめも"),
  Array.from("やゆよ"),
  Array.from("らりるれろ"),
  Array.from("わをん"),
  Array.from("がぎぐげご"),
  Array.from("ざじずぜぞ"),
  Array.from("だぢづでど"),
  Array.from("ばびぶべぼ"),
  Array.from("ぱぴぷぺぽ"),
  Array.from("ゃゅょっぁぃぅぇぉ"),
];

const MAX_MISSES = 6;

export default function HangmanGame({ config }: { config?: Record<string, unknown> }) {
  const categoryId = (config?.category as string) ?? Object.keys(WORD_CATEGORIES)[0];
  const category = WORD_CATEGORIES[categoryId];

  const [word, setWord] = useState(category.words[0]);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [misses, setMisses] = useState(0);

  const wordChars = Array.from(word);
  const won = wordChars.every((ch) => guessed.has(ch));
  const lost = misses >= MAX_MISSES;
  const over = won || lost;

  function guess(ch: string) {
    if (over || guessed.has(ch)) return;
    const next = new Set(guessed);
    next.add(ch);
    setGuessed(next);
    if (!wordChars.includes(ch)) setMisses((m) => m + 1);
  }

  function newGame() {
    setWord(category.words[Math.floor(Math.random() * category.words.length)]);
    setGuessed(new Set());
    setMisses(0);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{category.name}のことば</p>
        <div className="tool-panel px-3 py-1 text-sm">
          ミス: {misses} / {MAX_MISSES}
        </div>
      </div>

      <div className="tool-panel text-center">
        <div className="flex justify-center gap-2 text-3xl font-bold tracking-widest text-slate-800">
          {wordChars.map((ch, i) => (
            <span key={i} className="w-8 border-b-2 border-slate-400">
              {guessed.has(ch) || over ? ch : "　"}
            </span>
          ))}
        </div>
      </div>

      {over && (
        <div className="tool-panel text-center">
          <p className={`text-xl font-bold ${won ? "text-green-600" : "text-red-600"}`}>
            {won ? "正解!🎉" : `残念、正解は「${word}」でした`}
          </p>
          <button type="button" className="btn mt-3" onClick={newGame}>
            もう一度
          </button>
        </div>
      )}

      {!over && (
        <div className="space-y-1">
          {KEYBOARD_ROWS.map((row, i) => (
            <div key={i} className="flex justify-center gap-1">
              {row.map((ch) => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => guess(ch)}
                  disabled={guessed.has(ch)}
                  className={`h-8 w-8 rounded text-sm font-medium ${
                    guessed.has(ch)
                      ? wordChars.includes(ch)
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                      : "bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
