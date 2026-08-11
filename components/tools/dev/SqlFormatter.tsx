"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { formatSql } from "@/lib/dev/sqlFormat";

export default function SqlFormatter() {
  return <TextTransformTool transform={(input) => formatSql(input)} />;
}
