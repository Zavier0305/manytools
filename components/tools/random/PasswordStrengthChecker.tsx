"use client";

import { useMemo, useState } from "react";
import { estimatePasswordStrength } from "@/lib/text/password";

const BAR_COLORS = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-green-500"];

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const { score, label } = useMemo(() => estimatePasswordStrength(password), [password]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">パスワード</label>
        <input
          type="text"
          className="tool-input font-mono"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="判定したいパスワードを入力"
        />
      </div>
      {password && (
        <div className="space-y-2">
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className={`h-2 flex-1 rounded ${i <= score ? BAR_COLORS[score] : "bg-slate-200"}`} />
            ))}
          </div>
          <p className="text-sm text-slate-600">{label}</p>
        </div>
      )}
      <p className="text-xs text-slate-400">
        ※ 判定はこのブラウザ内だけで行われ、入力したパスワードはどこにも送信・保存されません。
      </p>
    </div>
  );
}
