"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { numberLines } from "@/lib/text/lineTools";

export default function LineNumberer() {
  return <TextTransformTool transform={(input) => numberLines(input)} />;
}
