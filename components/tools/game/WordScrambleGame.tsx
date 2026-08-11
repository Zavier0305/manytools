"use client";

import { useEffect, useRef, useState } from "react";
import { WORD_CATEGORIES } from "@/lib/game/wordCategories";

function shuffleWord(word: string): string {
  const chars = Array.from(word);
  let shuffled = chars.join("");
  let attempts = 0;
  do {
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    shuffled = chars.join("");
    attempts++;
  } while (shuffled === word && chars.length > 1 && attempts < 10);
  return shuffled;
}

export default function WordScrambleGame({ config }: { config?: Record<string, unknown> }) {
  const categoryId = (config?.category as string) ?? Object.keys(WORD_CATEGORIES)[0];
  const category = WORD_CATEGORIES[categoryId];

  const [status, setStatus] = useState<"ready" | "playing" | "over">("ready");
  const [currentWord, setCurrentWord] = useState("");
  const [scrambled, setScrambled] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const usedRef = useRef<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  function pickWord() {
    const available = category.words.filter((w) => !usedRef.current.has(w));
    const pool = available.length > 0 ? available : category.words;
    const word = pool[Math.floor(Math.random() * pool.length)];
    usedRef.current.add(word);
    setCurrentWord(word);
    setScrambled(shuffleWord(word));
    setInput("");
  }

  function start() {
    usedRef.current = new Set();
    setScore(0);
    setTimeLeft(60);
    pickWord();
    setStatus("playing");
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setStatus("over");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [status]);

  function handleChange(value: string) {
    setInput(value);
    if (value === currentWord) {
      setScore((s) => s + 1);
      pickWord();
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">残り時間</div>
          <div className="text-xl font-bold text-indigo-600">{timeLeft}秒</div>
        </div>
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">正解数</div>
          <div className="text-xl font-bold text-indigo-600">{score}</div>
        </div>
      </div>

      {status === "playing" && (
        <div className="tool-panel space-y-4 text-center">
          <p className="text-sm text-slate-500">{category.name}のことば</p>
          <div className="text-4xl font-bold tracking-widest text-slate-800">{scrambled}</div>
          <input
            ref={inputRef}
            type="text"
            className="tool-input mx-auto max-w-xs text-center text-lg"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            autoComplete="off"
          />
        </div>
      )}

      {status !== "playing" && (
        <div className="tool-panel space-y-3 text-center">
          {status === "over" && <p className="text-2xl font-bold text-indigo-600">正解数: {score}語</p>}
          <button type="button" className="btn" onClick={start}>
            {status === "ready" ? "スタート" : "もう一度"}
          </button>
        </div>
      )}
      <p className="text-center text-sm text-slate-500">並び替えられた文字を正しい単語に直して入力しよう(60秒)</p>
    </div>
  );
}
