"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";
import { GITIGNORE_TEMPLATES } from "@/lib/dev/gitignoreTemplates";

const NAMES = Object.keys(GITIGNORE_TEMPLATES);

export default function GitignoreGenerator() {
  const [selected, setSelected] = useState<string[]>(["Node", "macOS", "VSCode"]);

  const output = useMemo(
    () =>
      selected
        .map((name) => `# ${name}\n${GITIGNORE_TEMPLATES[name]}`)
        .join("\n"),
    [selected]
  );

  function toggle(name: string) {
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {NAMES.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => toggle(name)}
            className={
              selected.includes(name)
                ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white"
                : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"
            }
          >
            {name}
          </button>
        ))}
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="tool-label mb-0">.gitignore</label>
          <CopyButton getText={() => output} />
        </div>
        <textarea className="tool-textarea min-h-[16rem]" value={output} readOnly />
      </div>
    </div>
  );
}
