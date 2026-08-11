"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { punycodeTool } from "@/lib/text/punycode";

export default function PunycodeTool() {
  return (
    <TextTransformTool
      modes={[
        { id: "encode", label: "エンコード" },
        { id: "decode", label: "デコード" },
      ]}
      transform={(input, mode) => punycodeTool(input, mode)}
      inputPlaceholder="例: 日本語.jp"
    />
  );
}
