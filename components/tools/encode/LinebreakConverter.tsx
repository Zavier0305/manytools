"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { convertLineBreak } from "@/lib/text/encode";

export default function LinebreakConverter() {
  return (
    <TextTransformTool
      modes={[
        { id: "lf", label: "LF (\\n)" },
        { id: "crlf", label: "CRLF (\\r\\n)" },
        { id: "cr", label: "CR (\\r)" },
      ]}
      transform={(input, mode) => convertLineBreak(input, mode)}
    />
  );
}
