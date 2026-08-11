"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { sortLines } from "@/lib/text/lineTools";

export default function LineSorter() {
  return (
    <TextTransformTool
      modes={[
        { id: "asc", label: "昇順" },
        { id: "desc", label: "降順" },
        { id: "length", label: "文字数順" },
        { id: "random", label: "ランダム" },
      ]}
      transform={(input, mode) => sortLines(input, mode)}
    />
  );
}
