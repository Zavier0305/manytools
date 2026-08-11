"use client";

import { useMemo, useState } from "react";
import { HTTP_STATUS_CODES } from "@/lib/dev/httpStatus";
import { MIME_TYPES } from "@/lib/dev/mimeTypes";

export default function LookupTable({ config }: { config?: Record<string, unknown> }) {
  const dataset = (config?.dataset as string) === "mime" ? MIME_TYPES : HTTP_STATUS_CODES;
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dataset;
    return dataset.filter(
      (row) =>
        row.code.toLowerCase().includes(q) ||
        row.name.toLowerCase().includes(q) ||
        row.description.toLowerCase().includes(q)
    );
  }, [dataset, query]);

  return (
    <div className="space-y-4">
      <input
        type="text"
        className="tool-input"
        placeholder="検索..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="tool-panel max-h-[28rem] overflow-y-auto p-0">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-2">コード</th>
              <th className="px-4 py-2">名前</th>
              <th className="px-4 py-2">説明</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.code} className="border-t border-slate-100">
                <td className="whitespace-nowrap px-4 py-1.5 font-mono">{row.code}</td>
                <td className="whitespace-nowrap px-4 py-1.5 font-mono text-indigo-600">{row.name}</td>
                <td className="px-4 py-1.5 text-slate-600">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
