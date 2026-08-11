"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { csvEscapeTool } from "@/lib/text/csvEscape";

export default function CsvEscapeTool() {
  return (
    <TextTransformTool
      modes={[
        { id: "encode", label: "エスケープ" },
        { id: "decode", label: "アンエスケープ" },
      ]}
      transform={(input, mode) => csvEscapeTool(input, mode)}
    />
  );
}
