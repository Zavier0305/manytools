"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { stripHtmlTags } from "@/lib/text/moreText";

export default function HtmlTagStripper() {
  return <TextTransformTool transform={(input) => stripHtmlTags(input)} />;
}
