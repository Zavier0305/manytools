"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";

function formatEnv(input: string): string {
  const rows = input
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((line) => line.trim() && !line.trim().startsWith("#"))
    .map((line) => {
      const idx = line.indexOf("=");
      if (idx === -1) return null;
      return { key: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() };
    })
    .filter((r): r is { key: string; value: string } => r !== null)
    .sort((a, b) => a.key.localeCompare(b.key));

  const maxKeyLength = Math.max(...rows.map((r) => r.key.length), 0);
  return rows.map((r) => `${r.key.padEnd(maxKeyLength)} = ${r.value}`).join("\n");
}

export default function EnvFileFormatter() {
  return <TextTransformTool transform={(input) => formatEnv(input)} inputPlaceholder="KEY=value" />;
}
