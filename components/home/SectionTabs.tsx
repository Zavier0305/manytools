"use client";

import { useEffect, useState } from "react";
import ToolExplorer from "@/components/home/ToolExplorer";
import type { CategoryDefinition, Section, ToolDefinition } from "@/lib/tools/types";

const SECTIONS: { id: Section; label: string }[] = [
  { id: "tools", label: "ツール" },
  { id: "games", label: "ゲーム" },
];

export default function SectionTabs({
  tools,
  categories,
}: {
  tools: ToolDefinition[];
  categories: CategoryDefinition[];
}) {
  const [section, setSection] = useState<Section>("tools");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const category = categories.find((c) => c.id === hash);
    if (!category) return;
    // The initial tab depends on the URL hash, which is only known client-side.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSection(category.section);
    // Wait for the matching section's content to render before scrolling.
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countBySection = (id: Section) => {
    const ids = new Set(categories.filter((c) => c.section === id).map((c) => c.id));
    return tools.filter((t) => ids.has(t.category)).length;
  };

  const categoriesBySection = categories.filter((c) => c.section === section);
  const categoryIds = new Set(categoriesBySection.map((c) => c.id));
  const toolsBySection = tools.filter((t) => categoryIds.has(t.category));

  return (
    <div>
      <div className="mb-8 inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSection(s.id)}
            className={
              section === s.id
                ? "rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white"
                : "rounded-lg px-5 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700"
            }
          >
            {s.label}
            <span className="ml-1.5 text-xs font-normal opacity-80">({countBySection(s.id)})</span>
          </button>
        ))}
      </div>
      <ToolExplorer tools={toolsBySection} categories={categoriesBySection} />
    </div>
  );
}
