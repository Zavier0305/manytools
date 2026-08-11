"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "waiting" | "ready" | "clicked" | "toosoon";

export default function ReactionTimeTest({ config }: { config?: Record<string, unknown> }) {
  const strictMode = (config?.strictMode as boolean) ?? false;
  const [phase, setPhase] = useState<Phase>("idle");
  const [results, setResults] = useState<number[]>([]);
  const startTimeRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function start() {
    setPhase("waiting");
    const delay = 1000 + Math.random() * 3000;
    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = performance.now();
      setPhase("ready");
    }, delay);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleClick() {
    if (phase === "idle" || phase === "clicked" || phase === "toosoon") {
      start();
      return;
    }
    if (phase === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase("toosoon");
      if (strictMode) setResults([]);
      return;
    }
    if (phase === "ready") {
      const reactionMs = performance.now() - startTimeRef.current;
      setResults((prev) => [...prev, Math.round(reactionMs)]);
      setPhase("clicked");
    }
  }

  const average = results.length > 0 ? Math.round(results.reduce((a, b) => a + b, 0) / results.length) : null;

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={handleClick}
        className={`mx-auto flex h-64 w-full max-w-md items-center justify-center rounded-xl text-2xl font-bold text-white transition ${
          phase === "ready"
            ? "bg-green-500"
            : phase === "waiting"
              ? "bg-red-500"
              : phase === "toosoon"
                ? "bg-orange-500"
                : "bg-indigo-500"
        }`}
      >
        {phase === "idle" && "クリックしてスタート"}
        {phase === "waiting" && "緑になったらクリック!"}
        {phase === "ready" && "今だ!クリック!"}
        {phase === "clicked" && `${results[results.length - 1]}ms でした。もう一度クリック`}
        {phase === "toosoon" && (strictMode ? "早すぎ!記録リセット。もう一度クリック" : "早すぎました。もう一度クリック")}
      </button>
      {results.length > 0 && (
        <div className="tool-panel text-center">
          <p className="text-sm text-slate-500">平均反応速度({results.length}回)</p>
          <p className="text-3xl font-bold text-indigo-600">{average}ms</p>
        </div>
      )}
    </div>
  );
}
