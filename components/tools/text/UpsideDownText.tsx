"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { toUpsideDown } from "@/lib/text/moreText";

export default function UpsideDownText() {
  return <TextTransformTool transform={(input) => toUpsideDown(input)} />;
}
