"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { base64Tool } from "@/lib/text/encode";

export default function Base64Tool() {
  return (
    <TextTransformTool
      modes={[
        { id: "encode", label: "エンコード" },
        { id: "decode", label: "デコード" },
      ]}
      transform={(input, mode) => base64Tool(input, mode)}
    />
  );
}
