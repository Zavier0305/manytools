"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { toFullWidth, toHalfWidth } from "@/lib/text/width";

export default function WidthConverter() {
  return (
    <TextTransformTool
      modes={[
        { id: "to-half", label: "全角 → 半角" },
        { id: "to-full", label: "半角 → 全角" },
      ]}
      transform={(input, mode) => (mode === "to-full" ? toFullWidth(input) : toHalfWidth(input))}
    />
  );
}
