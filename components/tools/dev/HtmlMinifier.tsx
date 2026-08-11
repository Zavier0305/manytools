"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { minifyHtml } from "@/lib/dev/minify";

export default function HtmlMinifier() {
  return <TextTransformTool transform={(input) => minifyHtml(input)} />;
}
