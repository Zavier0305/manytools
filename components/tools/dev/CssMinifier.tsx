"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { minifyCss } from "@/lib/dev/minify";

export default function CssMinifier() {
  return <TextTransformTool transform={(input) => minifyCss(input)} />;
}
