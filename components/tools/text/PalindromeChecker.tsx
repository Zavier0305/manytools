"use client";

import { useMemo, useState } from "react";
import { isPalindrome } from "@/lib/text/moreText";

export default function PalindromeChecker() {
  const [text, setText] = useState("");
  const result = useMemo(() => (text.trim() ? isPalindrome(text) : null), [text]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">テキスト</label>
        <input type="text" className="tool-input" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      {result !== null && (
        <div className="tool-panel text-center">
          <p className={`text-2xl font-bold ${result ? "text-green-600" : "text-slate-500"}`}>
            {result ? "回文です!🎉" : "回文ではありません"}
          </p>
        </div>
      )}
    </div>
  );
}
