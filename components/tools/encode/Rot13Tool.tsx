"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { rot13 } from "@/lib/text/encode";

export default function Rot13Tool() {
  return <TextTransformTool transform={(input) => rot13(input)} />;
}
