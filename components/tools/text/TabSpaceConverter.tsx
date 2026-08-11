"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { convertTabsSpaces } from "@/lib/text/moreText";

export default function TabSpaceConverter() {
  return (
    <TextTransformTool
      modes={[
        { id: "tabs-to-spaces", label: "タブ→スペース" },
        { id: "spaces-to-tabs", label: "スペース→タブ" },
      ]}
      transform={(input, mode) => convertTabsSpaces(input, mode)}
    />
  );
}
