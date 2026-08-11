"use client";

import { useMemo, useState } from "react";

export default function GpaCalculator() {
  const [input, setInput] = useState("4.0,3\n3.0,2\n3.7,4\n2.3,1");

  const result = useMemo(() => {
    const rows = input
      .split("\n")
      .map((line) => line.split(",").map((v) => parseFloat(v.trim())))
      .filter(([grade, credits]) => Number.isFinite(grade) && Number.isFinite(credits) && credits > 0);
    if (rows.length === 0) return null;
    const totalCredits = rows.reduce((sum, [, credits]) => sum + credits, 0);
    const totalPoints = rows.reduce((sum, [grade, credits]) => sum + grade * credits, 0);
    return { gpa: totalPoints / totalCredits, totalCredits };
  }, [input]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">1行に「評価(GPA値), 単位数」を入力(例: 4.0,3)</label>
        <textarea className="tool-textarea font-mono" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {result && (
        <div className="tool-panel space-y-2 text-center">
          <div className="text-3xl font-bold text-indigo-600">{result.gpa.toFixed(3)}</div>
          <div className="text-sm text-slate-500">合計{result.totalCredits}単位</div>
        </div>
      )}
    </div>
  );
}
