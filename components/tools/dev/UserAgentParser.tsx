"use client";

import { useEffect, useMemo, useState } from "react";
import { parseUserAgent } from "@/lib/dev/userAgent";

export default function UserAgentParser() {
  const [ua, setUa] = useState("");

  useEffect(() => {
    // navigator is only available client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUa(navigator.userAgent);
  }, []);

  const result = useMemo(() => (ua ? parseUserAgent(ua) : null), [ua]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">User-Agent文字列</label>
        <textarea className="tool-textarea min-h-[6rem]" value={ua} onChange={(e) => setUa(e.target.value)} />
      </div>
      {result && (
        <div className="tool-panel space-y-2">
          {[
            ["ブラウザ", `${result.browser} ${result.browserVersion}`],
            ["OS", result.os],
            ["レンダリングエンジン", result.engine],
            ["デバイスタイプ", result.deviceType],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-slate-500">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
