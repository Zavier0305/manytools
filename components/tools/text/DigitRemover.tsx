"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { removeDigits } from "@/lib/text/moreText";

export default function DigitRemover() {
  return <TextTransformTool transform={(input) => removeDigits(input)} />;
}
