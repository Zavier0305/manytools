"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { base32Tool } from "@/lib/text/baseEncodings";

export default function Base32Tool() {
  return (
    <TextTransformTool
      modes={[
        { id: "encode", label: "エンコード" },
        { id: "decode", label: "デコード" },
      ]}
      transform={(input, mode) => base32Tool(input, mode)}
    />
  );
}
