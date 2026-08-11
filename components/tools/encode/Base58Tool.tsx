"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { base58Tool } from "@/lib/text/baseEncodings";

export default function Base58Tool() {
  return (
    <TextTransformTool
      modes={[
        { id: "encode", label: "エンコード" },
        { id: "decode", label: "デコード" },
      ]}
      transform={(input, mode) => base58Tool(input, mode)}
    />
  );
}
