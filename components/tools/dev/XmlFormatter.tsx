"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { formatXml } from "@/lib/dev/xmlFormat";

export default function XmlFormatter() {
  return <TextTransformTool transform={(input) => formatXml(input)} />;
}
