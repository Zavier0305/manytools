"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";

export default function JsonFormatter() {
  return (
    <TextTransformTool
      modes={[
        { id: "pretty", label: "整形(インデント)" },
        { id: "minify", label: "圧縮" },
      ]}
      transform={(input, mode) => {
        try {
          const data = JSON.parse(input);
          return mode === "pretty" ? JSON.stringify(data, null, 2) : JSON.stringify(data);
        } catch (e) {
          throw new Error(e instanceof Error ? `JSONエラー: ${e.message}` : "有効なJSONではありません");
        }
      }}
    />
  );
}
