"use client";

import { useState } from "react";
import CopyButton from "@/components/ui/CopyButton";
import { generatePassword } from "@/lib/text/password";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState(() =>
    generatePassword({ length: 16, lower: true, upper: true, numbers: true, symbols: true, excludeAmbiguous: false })
  );

  function regenerate() {
    setPassword(generatePassword({ length, lower, upper, numbers, symbols, excludeAmbiguous }));
  }

  const checkboxes: [string, boolean, (v: boolean) => void][] = [
    ["小文字 (a-z)", lower, setLower],
    ["大文字 (A-Z)", upper, setUpper],
    ["数字 (0-9)", numbers, setNumbers],
    ["記号 (!@#...)", symbols, setSymbols],
    ["紛らわしい文字を除外 (il1Lo0O)", excludeAmbiguous, setExcludeAmbiguous],
  ];

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="tool-label mb-0">生成されたパスワード</label>
          <CopyButton getText={() => password} />
        </div>
        <input type="text" className="tool-input font-mono text-lg" value={password} readOnly />
      </div>
      <div>
        <label className="tool-label">
          文字数: {length}
        </label>
        <input
          type="range"
          min={6}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="space-y-2 text-sm text-slate-700">
        {checkboxes.map(([label, checked, setter]) => (
          <label key={label} className="flex items-center gap-2">
            <input type="checkbox" checked={checked} onChange={(e) => setter(e.target.checked)} />
            {label}
          </label>
        ))}
      </div>
      <button type="button" className="btn" onClick={regenerate}>
        再生成
      </button>
    </div>
  );
}
