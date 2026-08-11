"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { removeEmoji } from "@/lib/text/moreText";

export default function EmojiRemover() {
  return <TextTransformTool transform={(input) => removeEmoji(input)} />;
}
