"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { reverseText } from "@/lib/text/lineTools";

export default function TextReverser() {
  return (
    <TextTransformTool
      modes={[
        { id: "chars", label: "文字単位" },
        { id: "words", label: "単語単位" },
      ]}
      transform={(input, mode) => reverseText(input, mode)}
    />
  );
}
