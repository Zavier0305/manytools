"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { base85Tool } from "@/lib/text/baseEncodings";

export default function Base85Tool() {
  return (
    <TextTransformTool
      modes={[
        { id: "encode", label: "エンコード" },
        { id: "decode", label: "デコード" },
      ]}
      transform={(input, mode) => base85Tool(input, mode)}
    />
  );
}
