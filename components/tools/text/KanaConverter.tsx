"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { toHiragana, toKatakana } from "@/lib/text/kana";

export default function KanaConverter() {
  return (
    <TextTransformTool
      modes={[
        { id: "to-katakana", label: "ひらがな → カタカナ" },
        { id: "to-hiragana", label: "カタカナ → ひらがな" },
      ]}
      transform={(input, mode) => (mode === "to-hiragana" ? toHiragana(input) : toKatakana(input))}
    />
  );
}
