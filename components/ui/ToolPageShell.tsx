import Link from "next/link";
import type { ReactNode } from "react";
import type { ToolDefinition } from "@/lib/tools/types";
import { CATEGORIES } from "@/lib/tools/registry";

export default function ToolPageShell({
  tool,
  children,
}: {
  tool: ToolDefinition;
  children: ReactNode;
}) {
  const category = CATEGORIES.find((c) => c.id === tool.category);
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/" className="hover:text-indigo-600">
          ホーム
        </Link>
        <span className="mx-1.5">/</span>
        <Link href={`/#${tool.category}`} className="hover:text-indigo-600">
          {category?.name ?? tool.category}
        </Link>
      </nav>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{tool.name}</h1>
      <p className="mt-2 text-slate-600">{tool.description}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}
