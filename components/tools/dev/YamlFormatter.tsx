"use client";

import { dump, load } from "js-yaml";
import TextTransformTool from "@/components/tools/shared/TextTransformTool";

export default function YamlFormatter() {
  return (
    <TextTransformTool
      transform={(input) => {
        try {
          return dump(load(input));
        } catch {
          throw new Error("有効なYAMLではありません");
        }
      }}
    />
  );
}
