"use client";

import { useState } from "react";
import CopyButton from "@/components/ui/CopyButton";
import { generateJapaneseLorem, generateLoremIpsum } from "@/lib/text/lorem";

export default function LoremGenerator() {
  const [lang, setLang] = useState<"ja" | "en">("ja");
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState(() => generateJapaneseLorem(3));

  function regenerate(nextLang = lang, nextParagraphs = paragraphs) {
    setOutput(
      nextLang === "ja" ? generateJapaneseLorem(nextParagraphs) : generateLoremIpsum(nextParagraphs)
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="tool-label">言語</label>
          <div className="flex gap-2">
            {(["ja", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  setLang(l);
                  regenerate(l, paragraphs);
                }}
                className={
                  lang === l
                    ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white"
                    : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                }
              >
                {l === "ja" ? "日本語" : "Lorem Ipsum"}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="tool-label">段落数</label>
          <input
            type="number"
            min={1}
            max={20}
            className="tool-input w-24"
            value={paragraphs}
            onChange={(e) => {
              const v = Number(e.target.value) || 1;
              setParagraphs(v);
              regenerate(lang, v);
            }}
          />
        </div>
        <button type="button" className="btn" onClick={() => regenerate()}>
          再生成
        </button>
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="tool-label mb-0">生成結果</label>
          <CopyButton getText={() => output} />
        </div>
        <textarea className="tool-textarea min-h-[16rem] font-sans" value={output} readOnly />
      </div>
    </div>
  );
}
