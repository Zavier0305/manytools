import ToolExplorer from "@/components/home/ToolExplorer";
import { ALL_TOOLS, CATEGORIES } from "@/lib/tools/registry";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          ツール箱100
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600 sm:text-lg">
          文字数カウント・単位変換・Base64エンコードなど、日常や仕事でよく使うツールを100個集めました。
          すべてブラウザ内で完結するのでインストール不要、入力データがサーバーへ送信されることもありません。
        </p>
      </div>
      <ToolExplorer tools={ALL_TOOLS} categories={CATEGORIES} />
    </div>
  );
}
