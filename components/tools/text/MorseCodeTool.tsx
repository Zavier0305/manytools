"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { morseCode } from "@/lib/text/moreText";

export default function MorseCodeTool() {
  return (
    <TextTransformTool
      modes={[
        { id: "encode", label: "エンコード" },
        { id: "decode", label: "デコード" },
      ]}
      transform={(input, mode) => morseCode(input, mode)}
    />
  );
}
