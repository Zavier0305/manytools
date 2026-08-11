"use client";

import { useEffect, useRef, useState } from "react";

const BAR_WIDTH = 100;

export default function TimingBarGame() {
  const [position, setPosition] = useState(0);
  const [running, setRunning] = useState(true);
  const [round, setRound] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [target, setTarget] = useState({ start: 40, width: 20 });
  const directionRef = useRef(1);

  function newTarget() {
    const width = Math.max(8, 20 - round);
    const start = Math.random() * (BAR_WIDTH - width);
    setTarget({ start, width });
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    newTarget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setPosition((p) => {
        let next = p + directionRef.current * 2.5;
        if (next >= BAR_WIDTH) {
          next = BAR_WIDTH;
          directionRef.current = -1;
        } else if (next <= 0) {
          next = 0;
          directionRef.current = 1;
        }
        return next;
      });
    }, 16);
    return () => clearInterval(id);
  }, [running]);

  function stopBar() {
    if (!running) return;
    setRunning(false);
    const hit = position >= target.start && position <= target.start + target.width;
    const center = target.start + target.width / 2;
    const distance = Math.abs(position - center);
    const points = hit ? Math.max(10, Math.round(50 - distance)) : 0;
    setTotalScore((s) => s + points);
    setLastResult(hit ? `成功!+${points}点` : "失敗...0点");
  }

  function next() {
    setRound((r) => r + 1);
    setPosition(0);
    directionRef.current = 1;
    newTarget();
    setRunning(true);
    setLastResult(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-3">
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">ラウンド</div>
          <div className="text-xl font-bold text-indigo-600">{round}</div>
        </div>
        <div className="tool-panel px-4 py-2 text-center">
          <div className="text-xs text-slate-500">合計スコア</div>
          <div className="text-xl font-bold text-indigo-600">{totalScore}</div>
        </div>
      </div>

      <div className="relative mx-auto h-8 max-w-md rounded-full bg-slate-200">
        <div
          className="absolute top-0 h-full rounded-full bg-green-300"
          style={{ left: `${target.start}%`, width: `${target.width}%` }}
        />
        <div className="absolute top-0 h-full w-1 bg-indigo-600" style={{ left: `${position}%` }} />
      </div>

      <div className="text-center">
        {running ? (
          <button type="button" className="btn" onClick={stopBar}>
            ストップ!
          </button>
        ) : (
          <div className="space-y-2">
            {lastResult && <p className="text-lg font-bold text-indigo-600">{lastResult}</p>}
            <button type="button" className="btn" onClick={next}>
              次のラウンド
            </button>
          </div>
        )}
      </div>
      <p className="text-center text-sm text-slate-500">動くバーが緑のゾーンに来たタイミングでストップを押そう</p>
    </div>
  );
}
