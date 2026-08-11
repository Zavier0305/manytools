"use client";

import { useMemo, useState } from "react";

export default function UrlParser() {
  const [input, setInput] = useState("https://example.com:8080/path/to/page?foo=bar&baz=qux#section");

  const { parsed, error } = useMemo(() => {
    if (!input.trim()) return { parsed: null, error: null as string | null };
    try {
      const url = new URL(input);
      const params = Array.from(url.searchParams.entries());
      return {
        parsed: {
          protocol: url.protocol,
          host: url.host,
          hostname: url.hostname,
          port: url.port || "(デフォルト)",
          pathname: url.pathname,
          search: url.search || "(なし)",
          hash: url.hash || "(なし)",
          params,
        },
        error: null as string | null,
      };
    } catch {
      return { parsed: null, error: "有効なURLではありません" };
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">URL</label>
        <input type="text" className="tool-input font-mono" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {parsed && (
        <div className="tool-panel space-y-2 text-sm">
          {[
            ["プロトコル", parsed.protocol],
            ["ホスト", parsed.host],
            ["ホスト名", parsed.hostname],
            ["ポート", parsed.port],
            ["パス", parsed.pathname],
            ["クエリ文字列", parsed.search],
            ["ハッシュ", parsed.hash],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <span className="text-slate-500">{label}</span>
              <span className="font-mono">{value}</span>
            </div>
          ))}
          {parsed.params.length > 0 && (
            <div className="border-t border-slate-100 pt-2">
              <p className="mb-1 text-slate-500">クエリパラメータ</p>
              {parsed.params.map(([k, v], i) => (
                <div key={i} className="flex justify-between font-mono">
                  <span>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
