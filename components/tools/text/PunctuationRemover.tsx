"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { removePunctuation } from "@/lib/text/moreText";

export default function PunctuationRemover() {
  return <TextTransformTool transform={(input) => removePunctuation(input)} />;
}
