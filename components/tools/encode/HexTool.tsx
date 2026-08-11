"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { hexTool } from "@/lib/text/encode";

export default function HexTool() {
  return (
    <TextTransformTool
      modes={[
        { id: "encode", label: "エンコード" },
        { id: "decode", label: "デコード" },
      ]}
      transform={(input, mode) => hexTool(input, mode)}
    />
  );
}
