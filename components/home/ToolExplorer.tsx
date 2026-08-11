"use client";

import { useMemo, useState } from "react";
import ToolCard from "@/components/ui/ToolCard";
import type { CategoryDefinition, ToolDefinition } from "@/lib/tools/types";

export default function ToolExplorer({
  tools,
  categories,
}: {
  tools: ToolDefinition[];
  categories: CategoryDefinition[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter((tool) => {
      const haystack = [tool.name, tool.description, ...(tool.keywords ?? [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [tools, query]);

  const grouped = useMemo(() => {
    return categories.map((category) => ({
      category,
      tools: filtered.filter((tool) => tool.category === category.id),
    }));
  }, [categories, filtered]);

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ツールを検索(例: 文字数、Base64、単位変換...)"
          className="tool-input w-full max-w-xl px-4 py-3 text-base"
        />
        <p className="mt-2 text-sm text-slate-500">
          {filtered.length} / {tools.length} 件のツールを表示中
        </p>
      </div>

      {grouped.every((g) => g.tools.length === 0) && (
        <p className="text-slate-500">該当するツールが見つかりませんでした。</p>
      )}

      <div className="space-y-10">
        {grouped.map(
          ({ category, tools: categoryTools }) =>
            categoryTools.length > 0 && (
              <section key={category.id} id={category.id} className="scroll-mt-20">
                <div className="mb-3 flex items-baseline gap-2">
                  <h2 className="text-xl font-bold text-slate-900">{category.name}</h2>
                  <span className="text-sm text-slate-400">{categoryTools.length}個</span>
                </div>
                <p className="mb-4 text-sm text-slate-500">{category.description}</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryTools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </section>
            )
        )}
      </div>
    </div>
  );
}
