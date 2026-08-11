"use client";

import { dump, load } from "js-yaml";
import TextTransformTool from "@/components/tools/shared/TextTransformTool";

export default function JsonYamlConverter() {
  return (
    <TextTransformTool
      modes={[
        { id: "json-to-yaml", label: "JSON → YAML" },
        { id: "yaml-to-json", label: "YAML → JSON" },
      ]}
      transform={(input, mode) => {
        try {
          if (mode === "json-to-yaml") {
            return dump(JSON.parse(input));
          }
          return JSON.stringify(load(input), null, 2);
        } catch {
          throw new Error(mode === "json-to-yaml" ? "有効なJSONではありません" : "有効なYAMLではありません");
        }
      }}
    />
  );
}
