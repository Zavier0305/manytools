"use client";

import { useEffect, useRef, useState } from "react";

export default function NumberMemoryTest() {
  const [status, setStatus] = useState<"ready" | "showing" | "input" | "result">("ready");
  const [level, setLevel] = useState(3);
  const [sequence, setSequence] = useState("");
  const [input, setInput] = useState("");
  const [best, setBest] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function start(startLevel = 3) {
    setLevel(startLevel);
    showSequence(startLevel);
  }

  function showSequence(digits: number) {
    const seq = Array.from({ length: digits }, () => Math.floor(Math.random() * 10)).join("");
    setSequence(seq);
    setInput("");
    setStatus("showing");
    setTimeout(
      () => {
        setStatus("input");
        requestAnimationFrame(() => inputRef.current?.focus());
      },
      1000 + digits * 500
    );
  }

  function submit() {
    if (input === sequence) {
      setBest((b) => Math.max(b, level));
      const nextLevel = level + 1;
      setLevel(nextLevel);
      showSequence(nextLevel);
    } else {
      setStatus("result");
    }
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Enter" && status === "input") submit();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, input, sequence, level]);

  return (
    <div className="space-y-4">
      <div className="tool-panel px-4 py-2 text-center">
        <div className="text-xs text-slate-500">ベスト桁数</div>
        <div className="text-xl font-bold text-indigo-600">{best}</div>
      </div>

      {status === "ready" && (
        <div className="text-center">
          <button type="button" className="btn" onClick={() => start()}>
            スタート
          </button>
        </div>
      )}

      {status === "showing" && (
        <div className="tool-panel text-center text-5xl font-bold tracking-widest text-slate-800">{sequence}</div>
      )}

      {status === "input" && (
        <div className="tool-panel space-y-3 text-center">
          <p className="text-sm text-slate-500">{level}桁の数字を入力してください</p>
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            className="tool-input mx-auto max-w-xs text-center text-2xl"
            value={input}
            onChange={(e) => setInput(e.target.value.replace(/\D/g, ""))}
          />
          <button type="button" className="btn" onClick={submit}>
            決定
          </button>
        </div>
      )}

      {status === "result" && (
        <div className="tool-panel space-y-3 text-center">
          <p className="text-xl font-bold text-red-600">不正解!</p>
          <p className="text-sm text-slate-500">
            正しい数字: {sequence} / あなたの答え: {input}
          </p>
          <button type="button" className="btn" onClick={() => start()}>
            もう一度
          </button>
        </div>
      )}
    </div>
  );
}
