"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { slugify } from "@/lib/text/lineTools";

export default function SlugGenerator() {
  return (
    <TextTransformTool
      transform={(input) => input.split("\n").map(slugify).join("\n")}
      inputLabel="タイトルなど"
      outputLabel="スラッグ"
      inputPlaceholder="例: 100個のツールを集めたサイトを作る"
    />
  );
}
