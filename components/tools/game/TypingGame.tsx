"use client";

import { useEffect, useRef, useState } from "react";
import { TYPING_WORD_SET_IDS, pickNextWord, type TypingWord } from "@/lib/game/typingWords";

const DURATION_SECONDS = 60;

const WORD_SET_LABELS: Record<string, string> = {
  hiragana: "ひらがな",
  katakana: "カタカナ語",
  english: "英単語",
  proverbs: "ことわざ",
  "it-terms": "IT用語",
  prefectures: "都道府県",
  countries: "国名",
  animals: "動物",
  food: "食べ物",
  idioms: "四字熟語",
};

export default function TypingGame({ config }: { config?: Record<string, unknown> }) {
  const defaultWordSetId = (config?.wordSetId as string) ?? "hiragana";
  const [wordSetId, setWordSetId] = useState(defaultWordSetId);
  const [status, setStatus] = useState<"ready" | "playing" | "over">("ready");
  const [current, setCurrent] = useState<TypingWord | null>(null);
  const [input, setInput] = useState("");
  const [correctChars, setCorrectChars] = useState(0);
  const [wordsCleared, setWordsCleared] = useState(0);
  const [keystrokes, setKeystrokes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION_SECONDS);
  const inputRef = useRef<HTMLInputElement>(null);

  function start() {
    const word = pickNextWord(null, wordSetId);
    setCurrent(word);
    setInput("");
    setCorrectChars(0);
    setWordsCleared(0);
    setKeystrokes(0);
    setTimeLeft(DURATION_SECONDS);
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
    if (status !== "playing" || !current) return;
    setKeystrokes((k) => k + 1);
    setInput(value);
    if (value === current.romaji) {
      setCorrectChars((c) => c + current.romaji.length);
      setWordsCleared((w) => w + 1);
      setCurrent(pickNextWord(current, wordSetId));
      setInput("");
    }
  }

  const elapsedMinutes = (DURATION_SECONDS - timeLeft) / 60;
  const wpm = elapsedMinutes > 0 ? Math.round(correctChars / 5 / elapsedMinutes) : 0;
  const accuracy = keystrokes > 0 ? Math.min(100, Math.round((correctChars / keystrokes) * 100)) : 100;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">残り時間</div>
          <div className="text-xl font-bold text-indigo-600">{timeLeft}秒</div>
        </div>
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">正解数</div>
          <div className="text-xl font-bold text-indigo-600">{wordsCleared}</div>
        </div>
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">WPM</div>
          <div className="text-xl font-bold text-indigo-600">{wpm}</div>
        </div>
      </div>

      {status === "playing" && current && (
        <div className="tool-panel space-y-4 text-center">
          <div className="text-4xl font-bold text-slate-800">{current.kana}</div>
          <div className="text-lg text-slate-400">{current.romaji}</div>
          <input
            ref={inputRef}
            type="text"
            className="tool-input mx-auto max-w-xs text-center font-mono text-lg"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>
      )}

      {status !== "playing" && (
        <div className="tool-panel space-y-3 text-center">
          {status === "over" && (
            <div>
              <p className="text-2xl font-bold text-indigo-600">結果発表</p>
              <p className="mt-2 text-slate-600">
                正解数 {wordsCleared} 語・WPM {wpm}・正確率 {accuracy}%
              </p>
            </div>
          )}
          <div className="mx-auto max-w-xs text-left">
            <label className="mb-1 block text-sm text-slate-500">単語セットを選択</label>
            <select
              value={wordSetId}
              onChange={(e) => setWordSetId(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              {TYPING_WORD_SET_IDS.map((id) => (
                <option key={id} value={id}>
                  {WORD_SET_LABELS[id] ?? id}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="btn" onClick={start}>
            {status === "ready" ? "スタート" : "もう一度"}
          </button>
        </div>
      )}
      <p className="text-center text-sm text-slate-500">
        表示された単語を正確に入力してください({DURATION_SECONDS}秒間)
      </p>
    </div>
  );
}
