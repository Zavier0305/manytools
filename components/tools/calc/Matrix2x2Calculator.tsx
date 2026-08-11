"use client";

import { useMemo, useState } from "react";

export default function Matrix2x2Calculator() {
  const [values, setValues] = useState(["1", "2", "3", "4"]);

  const result = useMemo(() => {
    const [a, b, c, d] = values.map(Number);
    if (![a, b, c, d].every(Number.isFinite)) return null;
    const det = a * d - b * c;
    const trace = a + d;
    const inverse =
      det !== 0
        ? [
            [d / det, -b / det],
            [-c / det, a / det],
          ]
        : null;
    return { det, trace, inverse };
  }, [values]);

  function setCell(i: number, value: string) {
    setValues((prev) => prev.map((v, idx) => (idx === i ? value : v)));
  }

  return (
    <div className="space-y-4">
      <label className="tool-label">2×2行列</label>
      <div className="mx-auto grid w-40 grid-cols-2 gap-2">
        {values.map((v, i) => (
          <input
            key={i}
            type="number"
            className="tool-input text-center"
            value={v}
            onChange={(e) => setCell(i, e.target.value)}
          />
        ))}
      </div>
      {result && (
        <div className="tool-panel space-y-2 text-center">
          <div>
            <span className="text-sm text-slate-500">行列式(det)</span>
            <div className="text-2xl font-bold text-indigo-600">{result.det}</div>
          </div>
          <div>
            <span className="text-sm text-slate-500">トレース(trace)</span>
            <div className="text-lg font-semibold">{result.trace}</div>
          </div>
          {result.inverse ? (
            <div>
              <span className="text-sm text-slate-500">逆行列</span>
              <div className="mx-auto mt-1 grid w-32 grid-cols-2 gap-1 font-mono text-sm">
                {result.inverse.flat().map((v, i) => (
                  <div key={i} className="rounded bg-slate-100 py-1">
                    {v.toFixed(3)}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-red-600">行列式が0のため逆行列は存在しません</p>
          )}
        </div>
      )}
    </div>
  );
}
