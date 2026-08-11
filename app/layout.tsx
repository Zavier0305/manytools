import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: {
    default: "ツール箱100 | 100個の無料オンラインツール",
    template: "%s | ツール箱100",
  },
  description:
    "文字数カウント・単位変換・Base64エンコードなど、普段使いできる無料ツールを100個集めたサイトです。すべてブラウザ内で完結し、入力データはサーバーに送信されません。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
