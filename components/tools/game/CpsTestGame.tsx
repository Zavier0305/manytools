"use client";

import { useEffect, useState } from "react";

const DURATION_SECONDS = 5;

export default function CpsTestGame() {
  const [status, setStatus] = useState<"ready" | "playing" | "over">("ready");
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION_SECONDS);
  const [best, setBest] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBest(Number(localStorage.getItem("cps-test-best") ?? 0));
  }, []);

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

  useEffect(() => {
    if (status !== "over") return;
    const cps = clicks / DURATION_SECONDS;
    // Persisting the best score is a reaction to the round ending, not render-time state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBest((b) => {
      const nb = Math.max(b, cps);
      localStorage.setItem("cps-test-best", String(nb));
      return nb;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function handleClick() {
    if (status === "ready") {
      setStatus("playing");
      setClicks(1);
      setTimeLeft(DURATION_SECONDS);
      return;
    }
    if (status === "playing") setClicks((c) => c + 1);
  }

  function reset() {
    setStatus("ready");
    setClicks(0);
    setTimeLeft(DURATION_SECONDS);
  }

  const cps = status === "over" ? (clicks / DURATION_SECONDS).toFixed(2) : null;

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-3">
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">残り時間</div>
          <div className="text-xl font-bold text-indigo-600">{timeLeft}秒</div>
        </div>
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">クリック数</div>
          <div className="text-xl font-bold text-indigo-600">{clicks}</div>
        </div>
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">ベストCPS</div>
          <div className="text-xl font-bold text-indigo-600">{best.toFixed(2)}</div>
        </div>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="mx-auto flex h-48 w-full max-w-md select-none items-center justify-center rounded-xl bg-indigo-500 text-2xl font-bold text-white active:bg-indigo-600"
      >
        {status === "ready" && "クリックしてスタート"}
        {status === "playing" && "クリック連打!"}
        {status === "over" && `結果: ${cps} CPS`}
      </button>
      {status === "over" && (
        <div className="text-center">
          <button type="button" className="btn" onClick={reset}>
            もう一度
          </button>
        </div>
      )}
      <p className="text-center text-sm text-slate-500">{DURATION_SECONDS}秒間でクリック速度(CPS)を測定します</p>
    </div>
  );
}
