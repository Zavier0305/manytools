"use client";

import { useEffect, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";
import { computeHash, type HashAlgo } from "@/lib/text/hash";

export default function HashGenerator({ config }: { config?: Record<string, unknown> }) {
  const algo = (config?.algo as HashAlgo) ?? "SHA-256";
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");

  useEffect(() => {
    if (!input) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHash("");
      return;
    }
    let cancelled = false;
    computeHash(input, algo).then((result) => {
      if (!cancelled) setHash(result);
    });
    return () => {
      cancelled = true;
    };
  }, [input, algo]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">入力テキスト</label>
        <textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="tool-label mb-0">{algo}ハッシュ値</label>
          <CopyButton getText={() => hash} />
        </div>
        <input type="text" className="tool-input font-mono" value={hash} readOnly />
      </div>
    </div>
  );
}
