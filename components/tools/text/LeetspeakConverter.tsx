"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { toLeetspeak } from "@/lib/text/moreText";

export default function LeetspeakConverter() {
  return <TextTransformTool transform={(input) => toLeetspeak(input)} />;
}
