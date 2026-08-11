"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { convertCase, type CaseMode } from "@/lib/text/caseConvert";

export default function CaseConverter({ config }: { config?: Record<string, unknown> }) {
  const mode = (config?.mode as CaseMode) ?? "upper";
  return (
    <TextTransformTool
      transform={(input) => convertCase(input, mode)}
      inputLabel="変換前のテキスト"
      outputLabel="変換後のテキスト"
    />
  );
}
