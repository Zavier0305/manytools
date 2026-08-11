import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white text-sm">
            100
          </span>
          <span className="text-lg">ツール箱100</span>
        </Link>
        <nav className="text-sm text-slate-500">
          <span className="hidden sm:inline">すべてブラウザ内で動作・データ送信なし</span>
        </nav>
      </div>
    </header>
  );
}
