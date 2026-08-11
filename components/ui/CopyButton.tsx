"use client";

import { useState } from "react";

export default function CopyButton({
  getText,
  className = "btn-secondary",
  label = "コピー",
}: {
  getText: () => string;
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = getText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable; ignore
    }
  }

  return (
    <button type="button" onClick={handleCopy} className={className}>
      {copied ? "コピーしました" : label}
    </button>
  );
}
