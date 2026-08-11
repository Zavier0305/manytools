"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { minifyJs } from "@/lib/dev/minify";

export default function JsMinifier() {
  return (
    <div className="space-y-3">
      <TextTransformTool transform={(input) => minifyJs(input)} />
      <p className="text-xs text-slate-400">
        ※ 簡易的な圧縮です(コメント除去・空白削除)。変数名の短縮など高度な圧縮は行いません。
      </p>
    </div>
  );
}
