"use client";

import { useMemo, useState } from "react";
import { decodeJwt } from "@/lib/text/jwt";

export default function JwtDecoder() {
  const [token, setToken] = useState("");

  const { header, payload, error } = useMemo(() => {
    if (!token.trim()) return { header: "", payload: "", error: null as string | null };
    try {
      const result = decodeJwt(token);
      return { ...result, error: null as string | null };
    } catch (e) {
      return { header: "", payload: "", error: e instanceof Error ? e.message : "デコードに失敗しました" };
    }
  }, [token]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">JWTトークン</label>
        <textarea
          className="tool-textarea min-h-[8rem]"
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}
      {!error && header && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="tool-label">ヘッダー</label>
            <pre className="tool-panel overflow-x-auto text-sm">{header}</pre>
          </div>
          <div>
            <label className="tool-label">ペイロード</label>
            <pre className="tool-panel overflow-x-auto text-sm">{payload}</pre>
          </div>
        </div>
      )}
      <p className="text-xs text-slate-400">
        ※ 署名の検証は行いません。デコード結果は入力欄に貼り付けたJWTの内容をそのまま表示しているだけです。
      </p>
    </div>
  );
}
