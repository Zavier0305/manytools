"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { htmlEntityTool } from "@/lib/text/encode";

export default function HtmlEntityTool() {
  return (
    <TextTransformTool
      modes={[
        { id: "encode", label: "エンコード" },
        { id: "decode", label: "デコード" },
      ]}
      transform={(input, mode) => htmlEntityTool(input, mode)}
    />
  );
}
