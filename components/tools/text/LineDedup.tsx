"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { dedupLines } from "@/lib/text/lineTools";

export default function LineDedup() {
  return <TextTransformTool transform={(input) => dedupLines(input)} />;
}
