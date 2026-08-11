"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { urlEncodeTool } from "@/lib/text/encode";

export default function UrlEncodeTool() {
  return (
    <TextTransformTool
      modes={[
        { id: "encode", label: "エンコード" },
        { id: "decode", label: "デコード" },
      ]}
      transform={(input, mode) => urlEncodeTool(input, mode)}
    />
  );
}
