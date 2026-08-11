"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { visualizeWhitespace } from "@/lib/text/moreText";

export default function WhitespaceVisualizer() {
  return <TextTransformTool transform={(input) => visualizeWhitespace(input)} />;
}
