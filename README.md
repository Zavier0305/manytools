# ツール箱100

文字数カウント・単位変換・Base64エンコードなど、日常や仕事でよく使うツールを100個集めたサイトです。すべての処理はブラウザ内で完結し、入力データがサーバーへ送信されることはありません。

## 技術構成

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS
- 完全な静的サイト(`output: "export"`)としてビルドされるため、Vercel・GitHub Pages・Netlifyなど任意のホスティングに配置できます
- 100個のツールは `lib/tools/registry.ts` のレジストリで一括管理し、`app/tools/[slug]/page.tsx` の動的ルートで静的生成しています

## 開発

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できます。

## ビルド

```bash
npm run build
```

`out/` ディレクトリに静的サイトが出力されます。

## ツールの追加方法

1. `lib/tools/registry.ts` の `ALL_TOOLS` に新しいツールのメタデータ(slug・名前・説明・カテゴリ・componentKey)を追加
2. `components/tools/` 配下に対応するツールコンポーネントを実装(似た機能があれば `components/tools/shared/TextTransformTool.tsx` などの共通コンポーネントを再利用)
3. `components/tools/toolComponentMap.tsx` に `componentKey` とコンポーネントの対応を追加
