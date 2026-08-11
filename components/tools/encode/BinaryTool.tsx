"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { binaryTool } from "@/lib/text/encode";

export default function BinaryTool() {
  return (
    <TextTransformTool
      modes={[
        { id: "encode", label: "エンコード" },
        { id: "decode", label: "デコード" },
      ]}
      transform={(input, mode) => binaryTool(input, mode)}
    />
  );
}
