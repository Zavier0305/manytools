"use client";

import { useMemo, useState } from "react";
import { explainCron } from "@/lib/dev/cron";

const EXAMPLES = ["* * * * *", "0 9 * * *", "*/15 * * * *", "0 0 1 * *", "0 9 * * 1-5"];

export default function CronExplainer() {
  const [expr, setExpr] = useState("0 9 * * 1-5");

  const { explanation, error } = useMemo(() => {
    if (!expr.trim()) return { explanation: "", error: null as string | null };
    try {
      return { explanation: explainCron(expr), error: null as string | null };
    } catch (e) {
      return { explanation: "", error: e instanceof Error ? e.message : "解析できません" };
    }
  }, [expr]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">Cron式(分 時 日 月 曜日)</label>
        <input type="text" className="tool-input font-mono text-lg" value={expr} onChange={(e) => setExpr(e.target.value)} />
      </div>
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button key={ex} type="button" className="btn-secondary font-mono text-xs" onClick={() => setExpr(ex)}>
            {ex}
          </button>
        ))}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {explanation && <div className="tool-panel text-lg font-medium text-indigo-700">{explanation}</div>}
    </div>
  );
}
