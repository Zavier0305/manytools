"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { natoPhonetic } from "@/lib/text/moreText";

export default function NatoPhoneticTool() {
  return (
    <TextTransformTool
      modes={[
        { id: "encode", label: "エンコード" },
        { id: "decode", label: "デコード" },
      ]}
      transform={(input, mode) => natoPhonetic(input, mode)}
    />
  );
}
